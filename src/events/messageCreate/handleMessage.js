const { Client, Message } = require("discord.js");
const {Messages } = require("../../mongoSchemas/conversationSchema");
const { EmotionStatus } = require("../../mongoSchemas/emotionSchemas");
const { SentimentStatus } = require("../../mongoSchemas/sentimentSchemas");
const {
  openai,
  MIN_EMOTION_VALUE,
  MAX_EMOTION_VALUE,
  MIN_SENTIMENT_VALUE,
  MAX_SENTIMENT_VALUE,
  CHOICE_RESPOND,
  CHOICE_IGNORE,
  MIN_PERSONALITY_VALUE,
  MAX_PERSONALITY_VALUE,
  EXTRINSIC_RELATIONSHIPS,
  NO_INTRINSIC_RELATIONSHIP,
} = require("../../constants/constants");
const {getEmotionStatusSchema,
  getMessageSchema,
  getSummarySchema,
  getResponseChoiceSchema,
  getIdentitySchema,
  getSentimentStatusSchema,
  getPersonalityStatusSchema,
  getExtrinsicRelationshipSchema} = require("../../constants/schemas");

const {GrabSelf, GrabUser, GetConversation} = require("../../services/mongoService");
const {DeepMerge, AlterPersonality} = require("../../utils/logicHelpers");
const {GetStructuredQueryResponse} = require("../../services/aiService");

/**
 * @brief Handle a message sent in the server.
 * @param {Client} client - The bot
 * @param {Message} msg - The message which was sent
 */
module.exports = async (client, msg) => {
  // Ignore msg if author is a bot or bot is not mentioned
  if (msg.author.bot || !msg.mentions.has(client.user.id)) {
    return;
  }

  async function handleUserMessage() {
    let self = await GrabSelf(process.env.BOT_NAME);
    let user = await GrabUser(msg.author.id);
    const spliceBound = 5;
    let userConversation = await GetConversation(user.user_id);
    let userMessages = userConversation.messages.slice(-spliceBound);
    let receiveDate = new Date();

    let ongoingConversationString =
      userMessages.length > 0
        ? `This is what ${
            self.name
          } remembers of the ongoing conversation between them and ${
            user.name
          }: ${JSON.stringify(userMessages)}.`
        : `This is ${self.name}'s and ${user.name}'s first time communicating.`;

    console.log("REVIEWED MESSAGE COUNT");
    console.log(userMessages.length);

    let intrinsicRelationship;
    let extrinsicRelationship = `${self.name} has an extrinsic relationship with ${user.name} of ${user.extrinsic_relationship}.`;
    
    switch (user.intrinsic_relationship){
      case 'creator and master':
        intrinsicRelationship = `${user.name} is the one who created ${self.name}, they are their ${user.intrinsic_relationship}`;
        break;
      case 'brother':
      case 'sister':
        intrinsicRelationship = `${self.name} recognizes ${user.name} as their ${user.intrinsic_relationship}.`;
        break;
      case NO_INTRINSIC_RELATIONSHIP:
        intrinsicRelationship = `There is no intrinsic relationship between ${self.name} and ${user.name}.`
        break;
      default:
        intrinsicRelationship = `There is no intrinsic relationship between ${self.name} and ${user.name}.`
        break;
    }
  
    console.log(intrinsicRelationship);

    let alteredPersonality = await AlterPersonality(self, user, extrinsicRelationship);

    let selfContext = `${self.name}'s current activity is ${JSON.stringify(
      self.activity_status
    )}. Their current personality traits are: ${JSON.stringify(
      alteredPersonality
    )}. ${self.name}'s current emotional state is ${JSON.stringify(
      self.emotional_status
    )}.`;

    // MESSAGE ANALYSIS
    let initialEmotionQuery = {
      role: "user",
      content: `${selfContext} This is what ${self.name} knows about ${
        user.name
      }: ${
        user.summary
      }. ${intrinsicRelationship} ${extrinsicRelationship} ${ongoingConversationString} It is ${receiveDate.toISOString()}. ${
        user.name
      } just sent a message to ${self.name}: ${
        msg.content
      }. How would this alter ${
        self.name
      }'s emotional state? Provide the new object (only the emotions whose value properties have changed, whether increased or decreased), and the reason behind the current emotional state. Scale: ${MIN_SENTIMENT_VALUE} (lowest intensity) to ${MAX_SENTIMENT_VALUE} (highest intensity)`,
    };

    let innerDialogue = [initialEmotionQuery];

    console.log("INITIAL EMOTIONAL RESPONSE");
    const initialEmotionQueryResponse =
      await GetStructuredQueryResponse(
        innerDialogue,
        getEmotionStatusSchema()
      );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(initialEmotionQueryResponse)}`,
    });

    if (!initialEmotionQueryResponse) {
      msg.reply("Error processing emotional reaction");
      return;
    }

    self.emotional_status = new EmotionStatus(
      DeepMerge(self.emotional_status, initialEmotionQueryResponse)
    );

    // RECEIVED PROCESSING
    let messageQueries = [
      {
        role: "user",
        content: `This is ${self.name}'s personality: ${alteredPersonality}. This is their current emotional state: ${self.emotional_status}. This is what they think about ${user.name}: ${user.summary}. ${intrinsicRelationship} ${extrinsicRelationship} This is the ongoing conversation between them: ${ongoingConversationString}. How would ${self.name} perceive the purpose and tone of ${user.name}'s new message: ${msg.content}. Provide the message "${msg.content}", purpose, and tone in a JSON object with the properties of message, purpose, and tone.`,
      },
    ];  

    console.log("MESSAGE RECEIVED INTERPRETATION");
    const messageReceivedQueryResponse =
      await GetStructuredQueryResponse(
        messageQueries,
        getMessageSchema()
      );

    if (!messageReceivedQueryResponse) {
      msg.reply("Error generating response");
    }

    messageQueries.push({
      role: "assistant",
      content: `${JSON.stringify(messageReceivedQueryResponse)}`,
    });

    // RESPONSE CHOICE

    let responseChoiceQuery = {
      role: "user",
      content: `${self.name} can choose to respond to or ignore this message. Based on their personality, current emotional state, and thoughts on ${user.name}, what choice will they make? Provide either "respond" or "ignore", and the reason for the choice, in a JSON object with the properties response_choice and reason.`,
    };

    messageQueries.push(responseChoiceQuery);

    console.log("RESPONSE CHOICE");
    const responseChoiceQueryResponse =
      await GetStructuredQueryResponse(
        messageQueries,
        getResponseChoiceSchema()
      );

    messageQueries.push({
      role: "assistant",
      content: `${JSON.stringify(responseChoiceQueryResponse)}`,
    });

    if (!responseChoiceQueryResponse) {
      msg.reply("Error generating response");
    }

    let messageResponseQueryResponse;
    if (responseChoiceQueryResponse.response_choice == CHOICE_RESPOND) {
      // RESPONSE CRAFTING

      let messageResponseQuery = {
        role: "user",
        content: `The way ${self.name} communicates reflects their personality traits: ${alteredPersonality}, and current emotional status: ${self.emotional_status}. How would ${self.name} respond back, and with what intended purpose and intended tone? Provide the response, intended purpose, and intended tone in a JSON object with the properties of message, purpose, and tone.`,
      };

      messageQueries.push(messageResponseQuery);

      console.log("MESSAGE RESPONSE");
      messageResponseQueryResponse = await GetStructuredQueryResponse(
        messageQueries,
        getMessageSchema()
      );

      if (!messageResponseQueryResponse) {
        msg.reply("Error generating response");
      }

      // REFLECTION
      let finalEmotionQuery = {
        role: "user",
        content: `${self.name} responded with this message: ${messageResponseQueryResponse}. What is ${self.name}'s emotional state after sending their response? Provide the new object (only the emotions whose value properties have changed, whether increased or decreased), and the reason behind the current emotional state. Scale: ${MIN_SENTIMENT_VALUE} (lowest intensity) to ${MAX_SENTIMENT_VALUE} (highest intensity).`,
      };

      innerDialogue.push(finalEmotionQuery);

      console.log("FINAL EMOTIONAL RESPONSE");
      const finalEmotionQueryResponse =
        await GetStructuredQueryResponse(
          innerDialogue,
          getEmotionStatusSchema()
        );

      innerDialogue.push({
        role: "assistant",
        content: `${JSON.stringify(finalEmotionQueryResponse)}`,
      });

      if (!finalEmotionQueryResponse) {
        msg.reply("Error reflecting on emotion");
      }

      self.emotional_status = new EmotionStatus(
        DeepMerge(self.emotional_status, finalEmotionQueryResponse)
      );

      await msg.channel.sendTyping();
    } else if (responseChoiceQueryResponse.response_choice == CHOICE_IGNORE) {
      // REFLECTION
      let finalEmotionQuery = {
        role: "user",
        content: `What is ${self.name}'s emotional state after ignoring the message? Provide the new object (only the emotions whose value properties have changed, whether increased or decreased), and the reason behind the current emotional state. Scale: ${MIN_SENTIMENT_VALUE} (lowest intensity) to ${MAX_SENTIMENT_VALUE} (highest intensity).`,
      };

      innerDialogue.push(finalEmotionQuery);

      console.log("FINAL EMOTIONAL RESPONSE");
      const finalEmotionQueryResponse =
        await GetStructuredQueryResponse(
          innerDialogue,
          getEmotionStatusSchema()
        );

      innerDialogue.push({
        role: "assistant",
        content: `${JSON.stringify(finalEmotionQueryResponse)}`,
      });

      if (!finalEmotionQueryResponse) {
        msg.reply("Error reflecting on emotion");
      }

      self.emotional_status = new EmotionStatus(
        DeepMerge(self.emotional_status, finalEmotionQueryResponse)
      );
    }

    let sentimentQuery = {
      role: "user",
      content: `What are ${self.name}'s sentiment status towards ${user.name} after this message exchange? Provide the new object (only the sentiments whose value properties have changed, whether increased or decreased), and the updated reason behind the current sentiment. Scale: ${MIN_SENTIMENT_VALUE} (lowest intensity) to ${MAX_SENTIMENT_VALUE} (highest intensity).`,
    };

    innerDialogue.push(sentimentQuery);

    console.log("SENTIMENT CHANGES");
    const sentimentQueryResponse = await GetStructuredQueryResponse(
      innerDialogue,
      getSentimentStatusSchema()
    );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(sentimentQueryResponse)}`,
    });

    if (!sentimentQueryResponse) {
      msg.reply("Error reflecting on sentiment");
    }

    user.sentiment_status = new SentimentStatus(
      DeepMerge(user.sentiment_status, sentimentQueryResponse)
    );

    let summaryQuery = {
      role: "user",
      content: `Add any new key information ${self.name} has learned about ${user.name} from this message exchange, to the summary of what they know about ${user.name}: ${user.summary}. Then re-summarize everything for brevity. Provide the updated summary in a JSON object with the property 'summary'.`,
    };

    innerDialogue.push(summaryQuery);

    console.log("SUMMARY CHANGES");
    const summaryQueryResponse = await GetStructuredQueryResponse(
      innerDialogue,
      getSummarySchema()
    );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(summaryQueryResponse)}`,
    });

    if (!summaryQueryResponse) {
      msg.reply("Error reflecting on sentiment");
    }

    user.summary = summaryQueryResponse.summary;

    let extrinsicRelationshipQuery = {
      role: "user",
      content: `Has the extrinsic relationship of ${user.name} changed? Whether it has changed or not, provide the extrinsic relationship out of these options ${EXTRINSIC_RELATIONSHIPS} in a JSON object with the property 'extrinsic_relationship'.`,
    };

    innerDialogue.push(extrinsicRelationshipQuery);
    console.log("EXTRINSIC CHANGES");
    const extrinsicRelationshipQueryResponse = await GetStructuredQueryResponse(
      innerDialogue,
      getExtrinsicRelationshipSchema()
    );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(extrinsicRelationshipQueryResponse)}`,
    });

    if (!extrinsicRelationshipQueryResponse) {
      msg.reply("Error reflecting on extrinsic relationship");
    }

    user.extrinsic_relationship = extrinsicRelationshipQueryResponse.extrinsic_relationship;

    let identityQuery = {
      role: "user",
      content: `Add any new information ${self.name} has learned about themselves from this message exchange, to their current self-identity ${self.identity}. Then re-summarize everything for brevity. Provide the updated identity in a JSON object with the property 'identity'.`,
    };

    innerDialogue.push(identityQuery);

    console.log("IDENTITY CHANGES");
    const identityQueryResponse = await GetStructuredQueryResponse(
      innerDialogue,
      getIdentitySchema()
    );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(identityQueryResponse)}`,
    });

    if (!identityQueryResponse) {
      msg.reply("Error reflecting on identity");
    }

    self.identity = identityQueryResponse.identity;

    let incomingMessage = new Messages({
      ...messageReceivedQueryResponse,
      sender: user.name,
      timestamp: receiveDate,
      is_bot: false,
    });

    userConversation.messages.push(incomingMessage);

    if (responseChoiceQueryResponse.response_choice == CHOICE_RESPOND) {
      let responseDate = new Date();
      let messageResponse = new Messages({
        ...messageResponseQueryResponse,
        sender: self.name,
        timestamp: responseDate,
        is_bot: true,
      });

      userConversation.messages.push(messageResponse);

      msg.reply(messageResponseQueryResponse.message);
    } else if (responseChoiceQueryResponse.response_choice == CHOICE_IGNORE) {
      msg.reply(`System: ${self.name} has chosen to ignore your message.`);
    }

    user.last_interaction = receiveDate;

    await Promise.all([self.save(), user.save(), userConversation.save()]);
  }

  handleUserMessage();
};

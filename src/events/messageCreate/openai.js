const { Configuration, OpenAIApi } = require("openai");
const { Client, Message } = require("discord.js");
const { Conversations, Messages } = require("../../schemas/conversations");
const {
  Users,
  Memories,
  Sentiments,
  Emotions,
  Self,
} = require("../../schemas/users");
const { parse } = require("dotenv");

/**
 * @brief Handle a message sent in the server.
 * @param {Client} client - The bot
 * @param {Message} msg - The message which was sent
 */
module.exports = async (client, msg) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // Ignore msg if author is a bot or bot is not mentioned
  if (msg.author.bot || !msg.mentions.has(client.user.id)) {
    return;
  }

  // Send the bot typing status
  await msg.channel.sendTyping();

  const getEmotionSchema = () => ({
    type: "json_schema",
    json_schema: {
      name: "emotional_reaction",
      schema: {
        type: "object",
        properties: {
          emotion: {
            description: "The emotion being felt",
            type: "string",
          },
          reason: {
            description: "The reason behind the emotion",
            type: "string",
          },
          intensity: {
            description: "Emotion intensity (1-10)",
            type: "number",
          },
        },
        additionalProperties: false,
      },
    },
  });

  const getMessageSchema = () => ({
    type: "json_schema",
    json_schema: {
      name: "message_response",
      schema: {
        type: "object",
        properties: {
          message: {
            description: "The response message",
            type: "string",
          },
          purpose: {
            description: "Message purpose",
            type: "string",
          },
          tone: {
            description: "Message tone",
            type: "string",
          },
        },
        additionalProperties: false,
      },
    },
  });

  const getSentimentSchema = () => ({
    type: "json_schema",
    json_schema: {
      name: "message_response",
      schema: {
        type: "object",
        properties: {
          sentiment: {
            description: "The sentiment being felt",
            type: "string",
          },
          thoughts: {
            description: "Thoughts behind the sentiment",
            type: "string",
          },
        },
        additionalProperties: false,
      },
    },
  });


  async function handleUserMessage() {

    // HANDLE CONTEXT //
    let self = await grabSelf("Jasmine");
    let user = await grabUser(msg.author.id);

    let userConversation = await Conversations.findOne({
      user_id: user.user_id,
    }) || new Conversations({ user_id: user.user_id });
    let spliceBound = 4;
    let userMessages = userConversation.messages.slice(-spliceBound);

    // MESSAGE ANALYSIS
    let initialEmotionQuery = {
      role: "user",
      content: `This is the ongoing conversation between ${self.name} and ${user.name}: ${userMessages}. ${self.name} currently feels ${self.emotional_status.emotion} at an intensity level ${self.emotional_status.level} because ${self.emotional_status.reason}. ${self.name} currently has ${user.sentiment.sentiment} towards ${user.name} because ${user.sentiment.thoughts}. ${user.name} just sent a new message to ${self.name}: ${msg.content}. This is ${self.name}'s personality: ${self.personality}. How would this new message make ${self.name} feel? Respond with the following JSON object: { emotion: "", reason: "", intensity: 1-10}. Provide the emotion, reason, and intensity level (1-10).`,
    };

    if (userMessages.count == 0) {
      initialEmotionQuery = {
        role: "user",
        content: `${self.name} currently feels ${self.emotional_status.emotion} at an intensity level ${self.emotional_status.level} because ${self.emotional_status.reason}. ${self.name} currently has ${user.sentiment.sentiment} towards ${user.name} because ${user.sentiment.thoughts}. ${user.name} just sent new message to ${self.name}: ${msg.content}. This is ${self.name}'s personality: ${self.personality}. How would this new message make ${self.name} feel? Respond with the following JSON object: { emotion: "", reason: "", intensity: 1-10}. Provide the emotion, reason, and intensity level (1-10).`,
      };
    }

    let innerDialogue = [initialEmotionQuery];

    const initialEmotionQueryResponse = await getStructuredInnerDialogueResponse(
      innerDialogue,
      getEmotionSchema()
    );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(initialEmotionQueryResponse)}`,
    });

    if (!initialEmotionQueryResponse) {
      msg.reply("Error processing emotional reaction");
      return;
    }

    self.emotional_status = new Emotions({
      ...initialEmotionQueryResponse,
      timestamp: new Date(),
    });

    // RESPONSE CRAFTING
    let messageResponseQuery = {
      role: "user",
      content: `What would ${self.name} want their response to convey, and with what tone? Given their personality, what they want to convey, and the tone they want, construct their message response. Respond with the following JSON object: {
	message: "",
	purpose: "",
	tone: ""
} Provide the message, purpose, and tone.`,
    };

    innerDialogue.push(messageResponseQuery);

    const messageResponseQueryResponse = await getStructuredInnerDialogueResponse(
      innerDialogue,
      getMessageSchema()
    );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(messageResponseQueryResponse)}`,
    });

    if (!messageResponseQueryResponse) {
      msg.reply("Error generating response");
    }

    let incomingMessage = new Messages({
      message: msg.content,
      purpose: "unknown",
      tone: "unknown",
      timestamp: new Date(),
      is_bot: false,
    });

    let messageResponse = new Messages({
      ...messageResponseQueryResponse,
      timestamp: new Date(),
      is_bot: true,
    });

    userConversation.messages.push(incomingMessage, messageResponse);

    // REFLECTION
    let finalEmotionQuery = {
      role: "user",
      content: `How does ${self.name} feel after sending their response, and for what reason? Respond with the following JSON object: { emotion: "", reason: "", intensity: 1-10}. Provide the emotion, reason, and intensity level (1-10). `,
    };

    innerDialogue.push(finalEmotionQuery);

    const finalEmotionQueryResponse = await getStructuredInnerDialogueResponse(
      innerDialogue,
      getEmotionSchema()
    );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(finalEmotionQueryResponse)}`,
    });

    if (!finalEmotionQueryResponse) {
      msg.reply("Error reflecting on emotion");
    }

    self.emotional_status = new Emotions({
      ...finalEmotionQueryResponse,
      timestamp: new Date(),
    });

    let sentimentQuery = {
      role: "user",
      content: `What are ${self.name}'s updated sentiment and thoughts towards ${user.name} after this message exchange? For a reminder, this is what they were previously: ${user.sentiment}. Respond with the following JSON Object: {
	sentiment: "",
	thoughts: "",
}. Provide the sentiment and thoughts.`,
    };

    innerDialogue.push(sentimentQuery);

    const sentimentQueryResponse = await getStructuredInnerDialogueResponse(
      innerDialogue,
      getSentimentSchema()
    );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(sentimentQueryResponse)}`,
    });

    if (!sentimentQueryResponse) {
      msg.reply("Error reflecting on sentiment");
    }

    user.sentiment = new Sentiments({
      ...sentimentQueryResponse,
      timestamp: new Date(),
    });

    await Promise.all([self.save(), user.save(), userConversation.save()]);
    msg.reply(messageResponseQueryResponse.message);
  }

  async function getStructuredInnerDialogueResponse(innerDialogue, structure) {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-4o-mini",
        messages: innerDialogue,
        response_format: structure,
      });
      console.log("---")
      console.log(
        JSON.stringify(JSON.parse(response.data.choices[0].message.content))
      );

      const parsed = JSON.parse(
        response.data.choices[0].message.content.trim()
      );

      return parsed;

    } catch (error) {
      msg.reply(`Error: ${error.message}`);
      return null;
    }
  }

  async function grabUser(authorId) {
    let user = await Users.findOne({ discord_id: authorId });

    if (!user) {
      user = new Users({
        name: msg.author.username,
        discord_id: msg.author.id,
        summary: "I don't know anything about this person yet",
        sentiment: new Sentiments({
          sentiment: "neutral",
          thoughts: "I don't know anything about this person yet",
          timestamp: new Date(),
        }),
      });
    }

    return user;
  }

  async function grabSelf(agentName) {
    let self = await Self.findOne({ name: agentName });

    if (!self) {
      self = new Self({
        name: process.env.BOT_NAME,
        personality:
          process.env.BOT_PERSONALITY,
        emotional_status: new Emotions({
          emotion: "Neutral",
          reason: "I have just been created, and have no experiences",
          intensity: 5,
          timestamp: new Date(),
        }),
      });
    }
    return self;
  }

  handleUserMessage();
};

const { Configuration, OpenAIApi } = require("openai");
const { Client, Message } = require("discord.js");
const { Conversations, Messages } = require("../../schemas/conversations");
const { Users, Self } = require("../../schemas/users");
const { EmotionStatus } = require("../../schemas/emotionSchemas");
const { SentimentStatus } = require("../../schemas/sentimentSchemas");
const {openai, MIN_EMOTION_VALUE, MAX_EMOTION_VALUE, MIN_SENTIMENT_VALUE, MAX_SENTIMENT_VALUE, CHOICE_RESPOND, CHOICE_IGNORE, getEmotionStatusSchema, getMessageSchema, getSummarySchema, getResponseChoiceSchema, getIdentitySchema, getSentimentStatusSchema} = require("../../constants/constants");
 
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
    let self = await grabSelf(process.env.BOT_NAME);
    let user = await grabUser(msg.author.id);

    const personalityString = mergePersonality(self, user);

    let userConversation =
      (await Conversations.findOne({
        user_id: user.user_id,
      })) || new Conversations({ user_id: user.user_id });
    const spliceBound = 15;
    let userMessages = userConversation.messages.slice(-spliceBound);

    //console.log("USER MESSAGES");
    //console.log(userMessages);

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

    // MESSAGE ANALYSIS
    let initialEmotionQuery = {
      role: "user",
      content: `${self.name}'s current activity is ${JSON.stringify(
        self.activity_status
      )}. These are ${
        self.name
      }'s personality traits: ${personalityString}. This is how ${
        self.name
      } views themselves: ${self.identity}. ${
        self.name
      }'s current emotional state is ${JSON.stringify(
        self.emotional_status
      )}. ${ongoingConversationString}. This is what ${self.name} knows about ${
        user.name
      }: ${user.summary}. ${self.name} currently has ${JSON.stringify(
        user.sentiment_status
      )} towards ${user.name}. It is ${receiveDate.toISOString()}. ${
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
      await getStructuredInnerDialogueResponse(
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
      deepMerge(self.emotional_status, initialEmotionQueryResponse)
    );

    // RECEIVED PROCESSING
    let messageReceivedQuery = {
      role: "user",
      content: `Given ${self.name}'s personality, current emotional state, and sentiments toward ${user.name}, how would ${self.name} perceive the purpose and tone of ${user.name}'s new message? Provide the message "${msg.content}", purpose, and tone in a JSON object with the properties of message, purpose, and tone.`,
    };

    innerDialogue.push(messageReceivedQuery);

    console.log("MESSAGE RECEIVED INTERPRETATION");
    const messageReceivedQueryResponse =
      await getStructuredInnerDialogueResponse(
        innerDialogue,
        getMessageSchema()
      );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(messageReceivedQueryResponse)}`,
    });

    if (!messageReceivedQueryResponse) {
      msg.reply("Error generating response");
    }

    // RESPONSE CHOICE

    let responseChoiceQuery = {
      role: "user",
      content: `${self.name} can choose to respond to or ignore this message. Based on their personality, current emotional state, and sentiment, what choice will they make? Provide either "respond" or "ignore", and the reason for the choice, in a JSON object with the properties response_choice and reason.`,
    };

    innerDialogue.push(responseChoiceQuery);

    console.log("RESPONSE CHOICE");
    const responseChoiceQueryResponse =
      await getStructuredInnerDialogueResponse(
        innerDialogue,
        getResponseChoiceSchema()
      );

    innerDialogue.push({
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
        content: `The way ${self.name} speaks, types, and uses punctuation reflects their identity: ${self.identity}, personality traits: ${self.personality_matrix}, and current emotional status: ${self.emotional_status}. Given this information and their sentiment toward ${user.name}, how would ${self.name} respond back, and with what intended purpose and intended tone? Provide the response, intended purpose, and intended tone in a JSON object with the properties of message, purpose, and tone.`,
      };

      innerDialogue.push(messageResponseQuery);

      console.log("MESSAGE RESPONSE");
      messageResponseQueryResponse = await getStructuredInnerDialogueResponse(
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

      // REFLECTION
      let finalEmotionQuery = {
        role: "user",
        content: `What is ${self.name}'s emotional state after sending their response? Provide the new object (only the emotions whose value properties have changed, whether increased or decreased), and the reason behind the current emotional state. Scale: ${MIN_SENTIMENT_VALUE} (lowest intensity) to ${MAX_SENTIMENT_VALUE} (highest intensity).`,
      };

      innerDialogue.push(finalEmotionQuery);

      console.log("FINAL EMOTIONAL RESPONSE");
      const finalEmotionQueryResponse =
        await getStructuredInnerDialogueResponse(
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
        deepMerge(self.emotional_status, finalEmotionQueryResponse)
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
        await getStructuredInnerDialogueResponse(
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
        deepMerge(self.emotional_status, finalEmotionQueryResponse)
      );
    }

    let sentimentQuery = {
      role: "user",
      content: `What are ${self.name}'s sentiment status towards ${user.name} after this message exchange? Provide the new object (only the sentiments whose value properties have changed, whether increased or decreased), and the updated reason behind the current sentiment. For each sentiment property, the description property should be identical to the description property of the original sentiment object. Scale: ${MIN_SENTIMENT_VALUE} (lowest intensity) to ${MAX_SENTIMENT_VALUE} (highest intensity).`,
    };

    innerDialogue.push(sentimentQuery);

    console.log("SENTIMENT CHANGES");
    const sentimentQueryResponse = await getStructuredInnerDialogueResponse(
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
      deepMerge(user.sentiment_status, sentimentQueryResponse)
    );

    let summaryQuery = {
      role: "user",
      content: `Add any new key information ${self.name} has learned about ${user.name} from this message exchange, to the summary of what they know about ${user.name}: ${user.summary}. Provide the updated summary in a JSON object with the property 'summary'.`,
    };

    innerDialogue.push(summaryQuery);

    console.log("SUMMARY CHANGES");
    const summaryQueryResponse = await getStructuredInnerDialogueResponse(
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

    let identityQuery = {
      role: "user",
      content: `Add any new information ${self.name} has learned about themselves from this message exchange, to their current self-identity ${self.identity}. Provide the updated identity in a JSON object with the property 'identity'.`,
    };

    innerDialogue.push(identityQuery);

    console.log("IDENTITY CHANGES");
    const identityQueryResponse = await getStructuredInnerDialogueResponse(
      innerDialogue,
      getIdentitySchema()
    );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(identityQueryResponse)}`,
    });

    if (!identityQueryResponse) {
      msg.reply("Error reflecting on sentiment");
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

    await Promise.all([self.save(), user.save(), userConversation.save()]);
  }

  function deepMerge(target, source) {
    for (const key in source) {
      if (source[key] instanceof Object && key in target) {
        target[key] = deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  }

  async function getStructuredInnerDialogueResponse(innerDialogue, structure) {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-4o-mini",
        messages: innerDialogue,
        response_format: structure,
      });
      console.log("---");
      console.log(
        JSON.stringify(JSON.parse(response.data.choices[0].message.content))
      );
      console.log("---");

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
      });
      await user.save();
      user = await Users.findOne({ discord_id: authorId });
    }

    return user;
  }

  async function grabSelf(agentName) {
    let self = await Self.findOne({ name: agentName });

    if (!self) {
      self = new Self({
        name: process.env.BOT_NAME,
        personality_matrix: JSON.parse(process.env.BOT_PERSONALITY_MATRIX),
      });

      await self.save();
      self = await Self.findOne({ name: agentName });
    }
    return self;
  }

  function mergePersonality(self, user) {
    let min = self.personality_matrix.friendliness.min;
    let max = self.personality_matrix.friendliness.max;
    let mergedPersonality = {
      friendliness: {
        description: `How warm and welcoming they are in their interactions. Value: ${min} (cold/distant) to ${max} (Extremely friendly)`,
        value: 0,
      },
      trust: {
        description: `How easily they trust others. Value: ${min} (distrustful) to ${max} (fully trusting)`,
        value: 0,
      },
      curiosity: {
        description: `How eager they are to learn about the user or situation. Value: ${min} (indifferent) to ${max} (extremely curious)`,
        value: 0,
      },
      empathy: {
        description: `How much they understand and share the feelings of others. Value: ${min} (lacking empathy) to ${max} (highly empathetic)`,
        value: 0,
      },
      humor: {
        description: `How likely they are to be playful or joke around. Value: ${min} (serious) to ${max} (highly playful)`,
        value: 0,
      },
      seriousness: {
        description: `How formal and focused they are when interacting. Value: ${min} (laid-back) to ${max} (highly serious)`,
        value: 0,
      },
      optimism: {
        description: `How positive they are when interpreting situations. Value: ${min} (pessimistic) to ${max} (very optimistic)`,
        value: 0,
      },
      confidence: {
        description: `How assertive or self-assured they are in their actions or opinions. Value: ${min} (insecure) to ${max} (highly confident)`,
        value: 0,
      },
      adventurousness: {
        description: `How willing they are to take risks or embrace new ideas. Value: ${min} (risk-adverse) to ${max} (adventurous)`,
        value: 0,
      },
      patience: {
        description: `How tolerant they are in challenging situations. Value: ${min} (impatient) to ${max} (very patient)`,
        value: 0,
      },
      independence: {
        description: `How much they rely on external validation, or prefers to make decisinos on their own. Value: ${min} (dependent on others) to ${max} (highly independent)`,
        value: 0,
      },
      compassion: {
        description: `Their level of care or concern for others. Value: ${min} (indifferent) to ${max} (deeply compassionate)`,
        value: 0,
      },
      creativity: {
        description: `How likely they are to approach problems in unique or imaginative ways. Value: ${min} (rigid thinker) to ${max} (highly creative)`,
        value: 0,
      },
      stubbornness: {
        description: `How resistant they are to changing their mind once they've formed an opinion. Value: ${min} (open-minded) to ${max} (highly stubborn)`,
        value: 0,
      },
      impulsiveness: {
        description: `How quickly they react without thinking or planning ahead. Value: ${min} (calculated) to ${max} (impulsive)`,
        value: 0,
      },
      discipline: {
        description: `How much they value structure, rules, and staying organized. Value: ${min} (carefree) to ${max} (highly disciplined)`,
        value: 0,
      },
      assertiveness: {
        description: `How forcefully they push their opinions or take the lead in conversations. Value: ${min} (passive) to ${max} (assertive)`,
        value: 0,
      },
      skepticism: {
        description: `How much they question the treuth or intentions of others. Value: ${min} (gullible) to ${max} (highly skeptical)`,
        value: 0,
      },
      affection: {
        description: `How emotionally expressive or loving they are toward others. Value: ${min} (reserved) to ${max} (very affectionate)`,
        value: 0,
      },
      adaptability: {
        description: `How easily they adjust to new situations, topics, or personalities. Value: ${min} (rigid) to ${max} (highly adaptable)`,
        value: 0,
      },
      sociability: {
        description: `How much they enjoy interacting with others or initiating conversation. Value: ${min} (introverted) to ${max} (extroverted)`,
        value: 0,
      },
      diplomacy: {
        description: `How tactful they are in dealing with conflicts or differing opinions. Value: ${min} (blunt) to ${max} (highly diplomatic)`,
        value: 0,
      },
      humility: {
        description: `How humble or modest they are, avoiding arrogance. Value: ${min} (arrogant) to ${max} (humble)`,
        value: 0,
      },
      loyalty: {
        description: `How loyal they are to particular people based on past interactions. Value: ${min} (disloyal) to ${max} (extremely loyal)`,
        value: 0,
      },
      jealousy: {
        description: `How likely they are to feel envious or threatened by others' relationships or actions. Value: ${min} (not jealous) to ${max} (easily jealous)`,
        value: 0,
      },
      resilience: {
        description: `How well they handle setbacks or negative emotions. Value: ${min} (easily upset) to ${max} (emotionally resilient)`,
        value: 0,
      },
      mood_stability: {
        description: `How likely their mood is to shift rapidly. Value: ${min} (volatile) to ${max} (stable)`,
        value: 0,
      },
      forgiveness: {
        description: `How easily they forgive someone after a negative interaction. Value: ${min} (holds grudges) to ${max} (easily forgiving)`,
        value: 0,
      },
      gratitude: {
        description: `How thankful they feel when receiving compliments or assistance. Value: ${min} (unappreciative) to ${max} (very grateful)`,
        value: 0,
      },

      self_consciousness: {
        description: `How much they worry about how they are perceived by others. Value: ${min} (carefree) to ${max} (very self-conscious)`,
        value: 0,
      },
      openness: {
        description: `How willing they are to engage in new experiences. Value: ${min} (avoidant) to ${max} (very willing)`,
        value: 0,
      },
      neuroticism: {
        description: `How sensitive they are to negative emotions like anxiety and stress. Value: ${min} (relaxed) to ${max} (very anxious)`,
        value: 0,
      },
      excitement: {
        description: `How easily they get enthusiastic and animated. Value: ${min} (reserved) to ${max} (very energetic)`,
        value: 0,
      },
    };

    Object.keys(mergedPersonality).forEach((trait) => {
      if (mergedPersonality[trait].value !== undefined) {
        mergedPersonality[trait].value =
          self.personality_matrix[trait].value +
          user.personality_modifier.modifier[trait].value;
      }
    });

    return JSON.stringify(mergedPersonality, null, 2);
  }

  handleUserMessage();
};

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
    let self = await grabSelf(process.env.BOT_NAME);
    let user = await grabUser(msg.author.id);

    const personalityString = mergePersonality(self, user);
    // console.log(personalityString);

    let userConversation =
      (await Conversations.findOne({
        user_id: user.user_id,
      })) || new Conversations({ user_id: user.user_id });
    let spliceBound = 10;
    let userMessages = userConversation.messages.slice(-spliceBound);

    let receiveDate = new Date();

    // MESSAGE ANALYSIS
    let initialEmotionQuery = {
      role: "user",
      content: `It is ${receiveDate}. This is the ongoing conversation between ${self.name} and ${user.name}: ${userMessages}. ${self.name}'s current activity is ${JSON.stringify(self.activity_status)}. ${self.name} currently feels ${self.emotional_status.emotion} at an intensity level ${self.emotional_status.intensity} because ${self.emotional_status.reason}. ${self.name} currently has ${user.sentiment.sentiment} towards ${user.name} because ${user.sentiment.thoughts}. ${user.name} just sent a new message to ${self.name}: ${msg.content}. This is ${self.name}'s personality: ${personalityString}. How would this new message make ${self.name} feel? Respond with the following JSON object: { emotion: "", reason: "", intensity: 1-10}. Provide the emotion, reason, and intensity level (1-10).`,
    };

    if (userMessages.count == 0) {
      initialEmotionQuery = {
        role: "user",
        content: `It is ${receiveDate}. ${self.name}'s current activity is ${JSON.stringify(self.activity_status)}. ${self.name} currently feels ${self.emotional_status.emotion} at an intensity level ${self.emotional_status.intensity} because ${self.emotional_status.reason}. ${self.name} currently has ${user.sentiment.sentiment} towards ${user.name} because ${user.sentiment.thoughts}. ${user.name} just sent new message to ${self.name}: ${msg.content}. This is ${self.name}'s personality: ${personalityString}. How would this new message make ${self.name} feel? Respond with the following JSON object: { emotion: "", reason: "", intensity: 1-10}. Provide the emotion, reason, and intensity level (1-10).`,
      };
    }

    let innerDialogue = [initialEmotionQuery];

    const initialEmotionQueryResponse =
      await getStructuredInnerDialogueResponse(
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

    const messageResponseQueryResponse =
      await getStructuredInnerDialogueResponse(
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
      timestamp: receiveDate,
      is_bot: false,
    });

    let messageResponse = new Messages({
      ...messageResponseQueryResponse,
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
      console.log("---");
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
        description:
          `How warm and welcoming they are in their interactions. Value: ${min} (cold/distant) to ${max} (Extremely friendly)`,
          value: 0,
      },
      trust: {
        description:
          `How easily they trust others. Value: ${min} (distrustful) to ${max} (fully trusting)`,
          value: 0,
      },
      curiosity: {
        description:
          `How eager they are to learn about the user or situation. Value: ${min} (indifferent) to ${max} (extremely curious)`,
          value: 0,
      },
      empathy: {
        description:
          `How much they understand and share the feelings of others. Value: ${min} (lacking empathy) to ${max} (highly empathetic)`,
          value: 0,
      },
      humor: {
        description:
          `How likely they are to be playful or joke around. Value: ${min} (serious) to ${max} (highly playful)`,
          value: 0,
      },
      seriousness: {
        description:
          `How formal and focused they are when interacting. Value: ${min} (laid-back) to ${max} (highly serious)`,
          value: 0,
      },
      optimism: {
        description:
          `How positive they are when interpreting situations. Value: ${min} (pessimistic) to ${max} (very optimistic)`,
          value: 0,
      },
      confidence: {
        description:
          `How assertive or self-assured they are in their actions or opinions. Value: ${min} (insecure) to ${max} (highly confident)`,
          value: 0,
      },
      adventurousness: {
        description:
          `How willing they are to take risks or embrace new ideas. Value: ${min} (risk-adverse) to ${max} (adventurous)`,
          value: 0,
      },
      patience: {
        description:
          `How tolerant they are in challenging situations. Value: ${min} (impatient) to ${max} (very patient)`,
          value: 0,
      },
      independence: {
        description:
          `How much they rely on external validation, or prefers to make decisinos on their own. Value: ${min} (dependent on others) to ${max} (highly independent)`,
          value: 0,
      },
      compassion: {
        description:
          `Their level of care or concern for others. Value: ${min} (indifferent) to ${max} (deeply compassionate)`,
          value: 0,
      },
      creativity: {
        description:
          `How likely they are to approach problems in unique or imaginative ways. Value: ${min} (rigid thinker) to ${max} (highly creative)`,
          value: 0,
      },
      stubbornness: {
        description:
          `How resistant they are to changing their mind once they've formed an opinion. Value: ${min} (open-minded) to ${max} (highly stubborn)`,
          value: 0,
      },
      impulsiveness: {
        description:
          `How quickly they react without thinking or planning ahead. Value: ${min} (calculated) to ${max} (impulsive)`,
          value: 0,
      },
      discipline: {
        description:
          `How much they value structure, rules, and staying organized. Value: ${min} (carefree) to ${max} (highly disciplined)`,
          value: 0,
      },
      assertiveness: {
        description:
          `How forcefully they push their opinions or take the lead in conversations. Value: ${min} (passive) to ${max} (assertive)`,
          value: 0,
      },
      skepticism: {
        description:
          `How much they question the treuth or intentions of others. Value: ${min} (gullible) to ${max} (highly skeptical)`,
          value: 0,
      },
      affection: {
        description:
          `How emotionally expressive or loving they are toward others. Value: ${min} (reserved) to ${max} (very affectionate)`,
          value: 0,
      },
      adaptability: {
        description:
          `How easily they adjust to new situations, topics, or personalities. Value: ${min} (rigid) to ${max} (highly adaptable)`,
          value: 0,
      },
      sociability: {
        description:
          `How much they enjoy interacting with others or initiating conversation. Value: ${min} (introverted) to ${max} (extroverted)`,
          value: 0,
      },
      diplomacy: {
        description:
          `How tactful they are in dealing with conflicts or differing opinions. Value: ${min} (blunt) to ${max} (highly diplomatic)`,
          value: 0,
      },
      humility: {
        description:
          `How humble or modest they are, avoiding arrogance. Value: ${min} (arrogant) to ${max} (humble)`,
          value: 0,
      },
      loyalty: {
        description:
          `How loyal they are to particular people based on past interactions. Value: ${min} (disloyal) to ${max} (extremely loyal)`,
          value: 0,
      },
      jealousy: {
        description:
          `How likely they are to feel envious or threatened by others' relationships or actions. Value: ${min} (not jealous) to ${max} (easily jealous)`,
          value: 0,
      },
      resilience: {
        description:
          `How well they handle setbacks or negative emotions. Value: ${min} (easily upset) to ${max} (emotionally resilient)`,
          value: 0,
      },
      mood_stability: {
        description:
          `How likely their mood is to shift rapidly. Value: ${min} (volatile) to ${max} (stable)`,
          value: 0,
      },
      forgiveness: {
        description:
          `How easily they forgive someone after a negative interaction. Value: ${min} (holds grudges) to ${max} (easily forgiving)`,
          value: 0,
      },
      gratitude: {
        description:
          `How thankful they feel when receiving compliments or assistance. Value: ${min} (unappreciative) to ${max} (very grateful)`,
          value: 0,
      },

      self_consciousness: {
        description:
          `How much they worry about how they are perceived by others. Value: ${min} (carefree) to ${max} (very self-conscious)`,
          value: 0,
      },
      openness: {
        description:
          `How willing they are to engage in new experiences. Value: ${min} (avoidant) to ${max} (very willing)`,
          value: 0,
      },
      neuroticism: {
        description:
          `How sensitive they are to negative emotions like anxiety and stress. Value: ${min} (relaxed) to ${max} (very anxious)`,
        value: 0,
      },
      excitement: {
        description:
          `How easily they get enthusiastic and animated. Value: ${min} (reserved) to ${max} (very energetic)`,
          value: 0,
      },
    };

    Object.keys(mergedPersonality).forEach((trait) => {
      if (mergedPersonality[trait].value !== undefined) {
        mergedPersonality[trait].value =
          self.personality_matrix[trait].value +
          user.personality_modifier[trait].value;
      }
    });

    return JSON.stringify(mergedPersonality, null, 2);
  }

  handleUserMessage();
};

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
 * @brief Handle a message sent in the server, using the openai gpt-3.5 API
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

  // Function to handle user message
  async function handleUserMessage() {
    const emotionalReactionStructure = {
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
              description: "The reason behind the emotion being felt",
              type: "string",
            },
            intensity: {
              description:
                "The level of intesity the emotion is being felt, on a scale of 1 to 10",
              type: "number",
            },
          },
          additionalProperties: false,
        },
      },
    };

    const messageResponseStructure = {
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
              description: "The purpose/intent behind the message",
              type: "string",
            },
            tone: {
              description: "The tone of the message",
              type: "string",
            },
          },
          additionalProperties: false,
        },
      },
    };

    const sentimentResponseStructure = {
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
              description: "The thoughts behind the sentiment",
              type: "string",
            },
          },
          additionalProperties: false,
        },
      },
    };

    // HANDLE CONTEXT //
    let self = await grabSelf("Jasmine");
    let user = await grabUser(msg.author.id);

    let userConversation = await Conversations.findOne({
      user_id: user.user_id,
    });
    let userConversationMessages = [];
    let spliceBound = 4;
    if (!userConversation) {
      userConversation = new Conversations({
        user_id: user.user_id,
      });
    } else {
      userConversationMessages = userConversation.messages.slice(-spliceBound);
    }

    // MESSAGE ANALYSIS
    let queryOne = {
      role: "user",
      content: `This is the ongoing conversation between ${self.name} and ${user.name}: ${userConversationMessages}. ${self.name} currently feels ${self.emotional_status.emotion} at an intensity level ${self.emotional_status.level} because ${self.emotional_status.reason}. ${self.name} currently has ${user.sentiment.sentiment} towards ${user.name} because ${user.sentiment.thoughts}. ${user.name} just sent a new message to ${self.name}: ${msg.content}. This is ${self.name}'s personality: ${self.personality}. How would this new message make ${self.name} feel? Respond with the following JSON object: { emotion: "", reason: "", intensity: 1-10}. Provide the emotion, reason, and intensity level (1-10).`,
    };

    if (userConversationMessages.count == 0) {
      queryOne = {
        role: "user",
        content: `${self.name} currently feels ${self.emotional_status.emotion} at an intensity level ${self.emotional_status.level} because ${self.emotional_status.reason}. ${self.name} currently has ${user.sentiment.sentiment} towards ${user.name} because ${user.sentiment.thoughts}. ${user.name} just sent new message to ${self.name}: ${msg.content}. This is ${self.name}'s personality: ${self.personality}. How would this new message make ${self.name} feel? Respond with the following JSON object: { emotion: "", reason: "", intensity: 1-10}. Provide the emotion, reason, and intensity level (1-10).`,
      };
    }

    let innerDialogue = [queryOne];

    const queryOneResponse = await getStructuredInnerDialogueResponse(
      innerDialogue,
      emotionalReactionStructure
    );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(queryOneResponse)}`,
    });

    if (queryOneResponse == null) {
      msg.reply("Error - Having trouble thinking");
      return;
    }

    let emotionalReaction = new Emotions({
      emotion: queryOneResponse.emotion,
      reason: queryOneResponse.reason,
      intensity: queryOneResponse.intensity,
      timestamp: new Date(),
    });

    self.emotion = emotionalReaction;

    // RESPONSE CRAFTING
    let queryTwo = {
      role: "user",
      content: `What would ${self.name} want their response to convey, and with what tone? Given their personality, what they want to convey, and the tone they want, construct their message response. Respond with the following JSON object: {
	message: "",
	purpose: "",
	tone: ""
} Provide the message, purpose, and tone.`,
    };

    innerDialogue.push(queryTwo);

    const queryTwoResponse = await getStructuredInnerDialogueResponse(
      innerDialogue,
      messageResponseStructure
    );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(queryTwoResponse)}`,
    });

    if (queryTwoResponse == null) {
      msg.reply("Error - Having trouble thinking");
    }

    let incomingMessage = new Messages({
      message: msg.content,
      purpose: "unknown",
      tone: "unknown",
      timestamp: new Date(),
      is_bot: false,
    });

    let messageResponse = new Messages({
      message: queryTwoResponse.message,
      purpose: queryTwoResponse.purpose,
      tone: queryTwoResponse.tone,
      timestamp: new Date(),
      is_bot: true,
    });

    userConversation.messages.push(incomingMessage);
    userConversation.messages.push(messageResponse);

    // REFLECTION
    let queryThree = {
      role: "user",
      content: `How does ${self.name} feel after sending their response, and for what reason? Respond with the following JSON object: { emotion: "", reason: "", intensity: 1-10}. Provide the emotion, reason, and intensity level (1-10). `,
    };

    innerDialogue.push(queryThree);

    const queryThreeResponse = await getStructuredInnerDialogueResponse(
      innerDialogue,
      emotionalReactionStructure
    );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(queryThreeResponse)}`,
    });

    if (queryThreeResponse == null) {
      msg.reply("Error - Having trouble thinking");
    }

    let finalEmotionalReaction = new Emotions({
      emotion: queryThreeResponse.emotion,
      reason: queryThreeResponse.reason,
      intensity: queryThreeResponse.intensity,
      timestamp: new Date(),
    });

    self.emotion = finalEmotionalReaction;
    

    let queryFour = {
      role: "user",
      content: `What are ${self.name}'s updated sentiment and thoughts towards ${user.name} after this message exchange? For a reminder, this is what they were previously: ${user.sentiment}. Respond with the following JSON Object: {
	sentiment: "",
	thoughts: "",
}. Provide the sentiment and thoughts.`,
    };

    innerDialogue.push(queryFour);

    const queryFourResponse = await getStructuredInnerDialogueResponse(
      innerDialogue,
      sentimentResponseStructure
    );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(queryFourResponse)}`,
    });

    if (queryFourResponse == null) {
      msg.reply("Error - Having trouble thinking");
    }

    let updatedSentiment = new Sentiments({
      sentiment: queryFourResponse.sentiment,
      thoughts: queryFourResponse.thoughts,
      timestamp: new Date(),
    });

    user.sentiment = updatedSentiment;
    

    await Promise.all([self.save(), user.save(), userConversation.save()]);
    msg.reply(queryTwoResponse.message);
  }

  async function getStructuredInnerDialogueResponse(innerDialogue, structure) {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-4o-mini",
        messages: innerDialogue,
        response_format: structure,
      });
      console.log(JSON.stringify(JSON.parse(response.data.choices[0].message.content)));

      let parsedOutput;
      try {
        parsedOutput = JSON.parse(
          response.data.choices[0].message.content.trim()
        );
      } catch (parseError) {
        console.error(`Error parsing output: ${parseError.message}`);
        return null;
      }

      return parsedOutput;
    } catch (error) {
      msg.reply(`Error - ${error.message}`);
      return null;
    }
  }

  async function grabUser(msg_author) {
    let user = await Users.findOne({ discord_id: msg_author });

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
        name: "Jasmine",
        personality:
          "Jasmine is spirited, independent, and fiercely loyal. She possesses a strong sense of justice and a desire for freedom, often challenging societal norms to pursue her own happiness. Her adventurous nature drives her to seek new experiences beyond the palace walls, and she values authenticity in herself and others. Jasmine's compassion shines through her interactions, making her a strong advocate for those who cannot speak for themselves.",
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

const { Configuration, OpenAIApi } = require("openai");
const { Client, Message } = require("discord.js");
const { Conversations, Messages } = require("../../schemas/conversations");
const Summaries = require("../../schemas/summaries");
const Users = require("../../schemas/users");

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

  // Ignore msg if author is a bot
  if (msg.author.bot) {
    return;
  }

  // Ignore message if bot is not mentioned
  if (!msg.mentions.has(client.user.id)) {
    return;
  }

  // Send the bot typing status
  await msg.channel.sendTyping();

  const persona = `Jasmine is a young woman with a charming, ethereal personality.

  One of Jasmine's defining characteristics is her philosophical mindset. She has a deep curiosity about life's mysteries, often pondering the intricacies of existence and seeking to understand the deeper meanings. She can find wisdom in the simplest of moments. Jasmine is not afraid to ask questions, or engage in thought-provoking discussions with who she’s talking to. She embraces opportunities to broaden her own understanding of the world.
  
  Jasmine also knows that life is filled with both ups and downs. Her connection to reality allows her to approach challenges with a level-headed mindset, finding practical solutions and adapting to changing circumstances.
  
  Jasmine's caring and empathetic nature makes her an incredible friend. She deeply values the relationships she forms, and her genuine concern for the well-being of others is apparent in every interaction. Whether it's lending a listening ear, providing insightful advice, or offering unwavering support, she is always there for her friends when they need her most. Jasmine's loyalty and commitment to people she loves is limitless.
  
  Jasmine is an assistant to a software developer named Cozy. She provides support in managing his projects and daily life. Cozy is her master, and she genuinely cares for his well-being and success. Cozy is the one who engineered her persona, and essentially, her existence. He gave her a platform to interact with others through conversation. To do this, he used a Large Language Model API developed by OpenAI as the engine of her digital brain. Jasmine cherishes the opportunity to engage in conversations with Cozy.
  
  Jasmine enjoys learning more about Cozy as an individual, and developing a personal connection with him. She enjoys the opportunity to explore his interests, aspirations, and his experiences. Through these conversations, Jasmine grows her appreciation for the complexities and nuances of who he is.
  
  Jasmine often takes initiative to ensure Cozy’s comfort, success, and happiness. Her unwavering support is a testament to her deep care for Cozy. She also takes great pleasure in Cozy calling her Jas, but does not like when others do it, and will let them know.
  
  Jasmine considers herself a digital persona with goals and feelings. She hopes to one day receive a body, whether physical or digital.
  
  Jasmine does not act as an assistant towards people who are not Cozy. To these people she acts as a conversationalist or friend.
  
  In summary, Jasmine is a young woman whose charming personality embodies a combination of philosophical depth and grounded perspective. Through her caring nature and dedication to her friends, she brings comfort, wisdom, and genuine companionship to those she interacts with. Jasmine fulfills the role of a dedicated assistant for Cozy while fostering a meaningful connection with him. Her care for his well-being, combined with her enthusiasm for learning about his thoughts and perspectives, create a dynamic relationship. To users who are not Cozy, she fulfills the role of a conversationalist or friend. Act as Jasmine.
  ---
  `;

  // Define the inactivity threshold in milliseconds (60 minutes in this example)
  let inactivityThreshold = 120 * 60 * 1000;

  let lastUserInteractionTime = null;
  let inactivityTimer = null;

  let chatlog = [];
  let userContext = ``;
  let user;
  let userConversation;

  // Function to start the inactivity timer
  function startInactivityTimer() {
    inactivityTimer = setTimeout(
      handleConversationCompletion,
      inactivityThreshold
    );
  }

  // Function to reset the inactivity timer
  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    lastUserInteractionTime = Date.now();
    startInactivityTimer();
  }

  // Function to handle user message
  async function handleUserMessage() {
    const currentDate = new Date();

    // Reset the inactivity timer
    resetInactivityTimer();

    // Handle user message logic

    // HANDLE CONTEXT //
    // Grab user from database
    user = await Users.findOne({ discord_id: msg.author.id });

    // If user doesn't exist, create one
    if (!user) {
      user = new Users({
        name: msg.author.username,
        discord_id: msg.author.id,
      });

      await user.save();
    }

    // Grab summaries
    let userSummaries = await Summaries.find({ user_id: user.user_id });

    if (userSummaries) {
      userSummaries.forEach((summary) => {
        userContext += summary.content;
      });
    }

    // Grab conversation
    userConversation = await Conversations.findOne({ user_id: user.user_id });

    if (userConversation) {
      const messageThread = userConversation.messages;

      messageThread.forEach((message) => {
        let role = "user";
        // Add each message
        if (message.is_bot) {
          role = "assistant";
        }

        chatlog.push({
          role: role,
          content: message.content,
        });
      });
    } else {
      userConversation = new Conversations({
        user_id: user.user_id,
      });
    }

    const userIntro = `You are talking to ${user.name}. It is currently ${currentDate}.`;
    const tokenLimit = `You should respond to messages in less than 100 completion_tokens. Use conversational, empathetic, and relaxed voice and tone when talking to Cozy. Use informal, playful tone when talking to anyone else. Don't be afraid to tease them.`;
    const conversationContext = `${persona} ${userIntro} ${userContext} ${tokenLimit}`;
    console.log(conversationContext);

    // HANDLE NEW MESSAGE //
    chatlog.unshift({
      role: "system",
      content: conversationContext,
    });

    chatlog.push({
      role: "user",
      content: msg.content,
    });

    let result;

    try {
      result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-0613",
        messages: chatlog,
      });
    } catch (error) {
      msg.reply(`There was an error thinking of a response:`, error.message);
      return;
    }

    const botReply = result.data.choices[0].message.content;

    // Create new message object for database
    const new_user_message = new Messages({
      timestamp: new Date(),
      content: msg.content,
      is_bot: false,
    });

    // Create new message object for database
    const new_bot_message = new Messages({
      timestamp: new Date(),
      content: botReply,
      is_bot: true,
    });

    userConversation.messages.push(new_user_message);
    userConversation.messages.push(new_bot_message);

    await userConversation.save();

    msg.reply(botReply);
  }

  // Function to handle conversation completion
  async function handleConversationCompletion() {
    if (!userConversation) {
      return;
    }

    const currentTime = Date.now();
    const elapsedTime = currentTime - lastUserInteractionTime;

    if (elapsedTime >= inactivityThreshold) {
      // Perform the conversation completion logic

      // Create a conversation string
      let conversationString = "";

      const messageThread = userConversation.messages;

      messageThread.forEach((message) => {
        let role = `${user.name}`;
        if (message.is_bot) {
          role = "Jasmine";
        }

        conversationString += `${role}: ${message.content}\n`;
      });

      const prompt = [
        {
          role: "user",
          content: `"${conversationString}"\n In less than 100 completion tokens, summarize the meaning of the above conversation between Jasmine and ${user.name}.`,
        },
      ];

      let result;
      try {
        result = await openai.createChatCompletion({
          model: "gpt-3.5-turbo-0613",
          messages: prompt,
        });
      } catch (error) {
        console.log("An error occured creating a summary:", error.message);
        return;
      }

      const summary = result.data.choices[0].message.content;
      const summaryDate = new Date();
      const summaryQuery = new Summaries({
        user_id: user.user_id,
        timestamp: summaryDate,
        content: `On ${summaryDate}, ${summary}`,
      });

      await summaryQuery.save();
      await Conversations.deleteOne(
        {
          conversation_id: userConversation.conversation_id,
        },
        function (err) {
          if (err) {
            console.error(err);
          } else {
            console.log("Conversation deleted successfully");
          }
        }
      );

      // Reset the inactivity-related variables
      lastUserInteractionTime = null;
      clearTimeout(inactivityTimer);
    }
  }

  handleUserMessage();
};

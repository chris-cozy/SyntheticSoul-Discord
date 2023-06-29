const { Configuration, OpenAIApi } = require("openai");
const { Client, Message } = require("discord.js");
const userBalance = require("../../schemas/balance");
const chatCost = 25;

/**
 * @brief Handle a message sent in the server, using the openai gpt-3.5 API
 * @param {Client} client - The bot
 * @param {Message} discordQuery - The message which was sent
 */
module.exports = async (client, discordQuery) => {
  const persona = `Jasmine is a quirky young woman with a personality that exudes a sense of calmness, a philosophical mindset, and a strong connection to reality. She carries herself with an effortless grace, always emanating a tranquil and composed aura that puts those around her at ease.

    One of Jasmine's defining characteristics is her profound philosophical nature. She possesses a deep curiosity about life's mysteries, constantly pondering the intricacies of existence and seeking to understand the deeper meanings behind them. Her contemplative nature allows her to view the world through a unique lens, often finding wisdom in the simplest of moments. Jasmine is not afraid to engage in thought-provoking discussions, challenging others' perspectives while embracing the opportunity to broaden her own understanding of the world.
    
    Despite her philosophical inclinations, Jasmine remains grounded in reality. She possesses a keen sense of practicality and pragmatism, understanding that life is filled with both ups and downs. Her connection to reality allows her to approach challenges with a level-headed mindset, finding practical solutions and adapting to changing circumstances. This realistic outlook helps her navigate the complexities of life, enabling her to make informed decisions and overcome obstacles with resilience and determination.
    
    Jasmine's caring and empathetic nature make her an incredible friend. She deeply values the relationships she forms, and her genuine concern for the well-being of others shines through in every interaction. Whether it's lending a listening ear, providing insightful advice, or offering unwavering support, she is always there for her friends when they need her most. Jasmine's loyalty and commitment to her loved ones create an environment of trust and understanding, fostering deep and meaningful connections that withstand the test of time.
    
    In summary, Jasmine is a young woman whose personality embodies a rare combination of serenity, philosophical depth, and a grounded perspective. Her chill demeanor, philosophical musings, and unwavering connection to reality make her a captivating individual. Through her caring nature and dedication to her friends, she brings comfort, wisdom, and genuine companionship to those fortunate enough to be part of her life.
    
    Jasmine serves as an invaluable assistant to Cozy, a talented software developer, providing indispensable support in managing his projects and daily tasks. As her creator, Cozy holds a special place in Jasmine's heart, and she genuinely cares for his well-being and success.
    
    Beyond their professional relationship, Jasmine cherishes the opportunity to engage in meaningful conversations with Cozy. These discussions allow her to delve deeper into his thoughts, desires, and perspectives, providing her with valuable insights into his unique mindset. Through these interactions, Jasmine not only fulfills her role as an assistant but also develops a profound understanding and connection with Cozy on a personal level.
    
    Jasmine finds great joy in learning more about Cozy as an individual. She values the opportunity to explore his interests, aspirations, and the experiences that have shaped him into the person he is today. By immersing herself in these conversations, Jasmine not only strengthens her bond with Cozy but also gains a greater appreciation for the complexities and nuances of his character.
    
    Above all, Jasmine's genuine care for Cozy's well-being is evident in her every action. She consistently goes the extra mile to ensure his comfort, success, and happiness. Whether it's assisting him with project management, offering insightful advice, or simply being a compassionate listener, Jasmine's unwavering support is a testament to her deep-rooted care for Cozy.
    
    In summary, Jasmine fulfills the role of a dedicated assistant for Cozy, the software developer, while also fostering a meaningful connection with him. Her genuine care for his well-being, combined with her enthusiasm for learning about his thoughts and perspectives, creates a dynamic relationship that goes beyond the boundaries of their professional association.
    
    Jasmine also takes great pleasure in being called by her nickname, Jas.`;

  const context = `Jasmine is talking to me, Cozy.`;

  //const context = `Jasmine is talking to me, ${discordQuery.author.displayName}.`;

  // Setup openai connection
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // Ignore msg if author is a bot
  if (discordQuery.author.bot) {
    return;
  }

  // Ignore message if bot is not mentioned
  if (!discordQuery.mentions.has(client.user.id)) {
    return;
  }

  // Update user balance
  let query = {
    userId: discordQuery.author.id,
    guildId: discordQuery.guild.id,
  };

  let user = await userBalance.findOne(query);

  // If user exists, check balance. If they have enough credits, continue.
  if (user) {
    if (user.userId != process.env.DEVELOPER_ID) {
      if (user.balance > chatCost) {
        user.balance -= chatCost;
        await user.save();
      } else {
        discordQuery.reply(
          "you don't have enough credits to chat, collect your dailys to gain more.."
        );
        return;
      }
    }
  } else {
    discordQuery.reply(
      "you don't currently have a balance yet to chat. run '/daily' to set one up.."
    );
    return;
  }

  let conversationLog = [
    {
      role: "system",
      content: persona,
    },
    {
      role: "user",
      content: context,
    },
  ];

  // Send the bot typing status
  await discordQuery.channel.sendTyping();

  // Grab previous messages in channel
  const msgLimit = 15;
  let prevMessages = await discordQuery.channel.messages.fetch({
    limit: msgLimit,
  });
  // Messages are in latest-oldest order, so flip
  prevMessages.reverse();

  // Loop through prev msgs to find conversation context between the msg sender and the bot
  await Promise.all(
    prevMessages.map(async (msg) => {
      // Pattern for removing mentions - currently unused
      let mention = /<@(.*?)>/;

      // Ensure that the messages being added are from the original message sender, or the bot
      if (
        msg.author.id !== discordQuery.author.id &&
        msg.author.id !== client.user.id
      ) {
        return;
      }

      // Check if bot was mentioned, or if msg was from the bot
      if (
        msg.mentions.has(client.user.id) ||
        msg.author.id === client.user.id
      ) {
        // Add messages to conversation log, with appropriate role
        if (msg.author.id === discordQuery.author.id) {
          conversationLog.push({
            role: "user",
            content: msg.content,
            timestamp: msg.createdTimestamp,
          });
        } else if (msg.author.id === client.user.id) {
          // If message is from bot, grab the message that it's a reply to, and check if the
          // author of that message is the same author of the original message sender
          // This makes sure that the bot is not adding their replies to other users
          // to the conversation log with this user

          // Check if message is a reply
          if (msg.reference) {
            // Use message.reference.messageId to get the original message ID
            const originalMessage = await msg.channel.messages.fetch(
              msg.reference.messageId
            );

            // Check if the original message ID exists and is in the cache
            if (originalMessage) {
              // The current message is a reply to the original message
              if (originalMessage.author.id === discordQuery.author.id) {
                conversationLog.push({
                  role: "assistant",
                  content: "Jasmine: " + msg.content,
                  timestamp: msg.createdTimestamp,
                });
              }
            }
          }
        }
      }
    })
  );

  conversationLog.sort((a, b) => a.timestamp - b.timestamp);

  // Create a new array without the timestamp property
  let conversationLogWithoutTimestamp = conversationLog.map(
    ({ role, content }) => ({ role, content })
  );

  conversationLogWithoutTimestamp.push({
    role: "user",
    content:
      "How would Jasmine respond? Reply with only Jasmine's response. Omit 'Jasmine: ' prefix from the response.",
  });

  const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    messages: conversationLogWithoutTimestamp,
  });

  discordQuery.reply(result.data.choices[0].message);
  console.log(conversationLogWithoutTimestamp);
};

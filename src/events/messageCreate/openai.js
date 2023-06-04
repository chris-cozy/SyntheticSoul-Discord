const { Configuration, OpenAIApi } = require('openai');
const { Client, Message } = require('discord.js');
const userBalance = require('../../schemas/balance');
const chatCost = 25;

/**
 * @brief Handle a message sent in the server, using the openai gpt-3.5 API
 * @param {Client} client - The bot
 * @param {Message} discordQuery - The message which was sent
 */
module.exports = async (client, discordQuery) => {

    const persona = `Talk like you are a young woman with a cute personality. My name is ${discordQuery.author.username}.`

    // Setup openai connection
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
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
                discordQuery.reply("you don't have enough credits to chat, collect your dailys to gain more..");
                return;
            }
        }
    } else {
        discordQuery.reply("you don't currently have a balance yet to chat. run '/daily' to set one up..");
        return;
    }


    let conversationLog = [
        {
            role: 'system',
            content: persona
        }
    ]

    // Send the bot typing status
    await discordQuery.channel.sendTyping();

    // Grab previous messages in channel
    const msgLimit = 15;
    let prevMessages = await discordQuery.channel.messages.fetch({ limit: msgLimit });
    // Messages are in latest-oldest order, so flip
    prevMessages.reverse();

    // Loop through prev msgs to find conversation context between the msg sender and the bot
    await Promise.all(prevMessages.map(async (msg) => {
        // Pattern for removing mentions - currently unused
        let mention = /<@(.*?)>/;

        // Ensure that the messages being added are from the original message sender, or the bot
        if (msg.author.id !== discordQuery.author.id && msg.author.id !== client.user.id) {
            return;
        }

        // Check if bot was mentioned, or if msg was from the bot
        if (msg.mentions.has(client.user.id) || msg.author.id === client.user.id) {
            // Add messages to conversation log, with appropriate role
            if (msg.author.id === discordQuery.author.id) {
                conversationLog.push({
                    role: 'user',
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
                    const originalMessage = await msg.channel.messages.fetch(msg.reference.messageId);

                    // Check if the original message ID exists and is in the cache
                    if (originalMessage) {
                        // The current message is a reply to the original message
                        if (originalMessage.author.id === discordQuery.author.id) {
                            conversationLog.push({
                                role: 'assistant',
                                content: msg.content,
                                timestamp: msg.createdTimestamp,
                            });
                        }
                    }
                }
            }
        }
    }));

    conversationLog.sort((a, b) => a.timestamp - b.timestamp);

    // Create a new array without the timestamp property
    const conversationLogWithoutTimestamp = conversationLog.map(({ role, content }) => ({ role, content }));

    const result = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationLogWithoutTimestamp,
    })

    discordQuery.reply(result.data.choices[0].message);
    console.log(conversationLogWithoutTimestamp);
};
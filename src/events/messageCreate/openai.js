const { Configuration, OpenAIApi } = require('openai');
const { Client, Message } = require('discord.js');
const userBalance = require('../../schemas/balance');
const chatCost = 25;

/**
 * @brief Handle a message sent in the server, using the openai gpt-3.5 API
 * @param {Client} client - The bot
 * @param {Message} message - The message which was sent
 */
module.exports = async (client, message) => {

    // Setup openai connection
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });
    const openai = new OpenAIApi(configuration);


    // Ignore msg if author is a bot
    if (message.author.bot) {
        return;
    }

    // Ignore msg if not sent in the right channel
    /*
    if (message.channel.id !== process.env.OPENAI_CHANNEL_ID) {
        console.log('not the designated channel');
    }
    */

    // Ignore message if bot is not mentioned
    if (!message.mentions.has(client.user.id)) {
        return;
    }

    // Update user balance
    let query = {
        userId: message.author.id,
        guildId: message.guild.id,
    };

    let user = await userBalance.findOne(query);

    // If user exists, check balance. If they have enough credits, continue.
    if (user) {
        if (user.balance > chatCost) {
            user.balance -= chatCost;
            await user.save();
        } else {
            message.reply("you don't have enough credits to chat, collect your dailys to gain more..");
            return;
        }
    } else {
        message.reply("you don't currently have a balance yet to chat. run '/daily' to set one up..");
        return;
    }


    let conversationLog = []

    // Give the language model instructions
    conversationLog.push({
        role: 'system',
        content: 'Your name is Jas, and you are a young woman. Talk like you are a young woman.'
    });

    // Give the language model instructions
    conversationLog.push({
        role: 'user',
        content: 'Your name is Jas, and you are a young woman. Talk like you are a young woman.'
    });

    // Send the bot typing status
    await message.channel.sendTyping();

    // Grab previous messages in channel
    const msgLimit = 15;
    let prevMessages = await message.channel.messages.fetch({ limit: msgLimit });
    // Messages are in latest-oldest order, so flip
    prevMessages.reverse();

    // Loop through prev msgs to find conversation context between the msg sender and the bot
    prevMessages.forEach((msg) => {
        // Pattern for removing mentions - currently unused
        let mention = /<@(.*?)>/;

        // Ignore messages from other bots
        if ((msg.author.id !== client.user.id) && message.author.bot) {
            return;
        }

        // Ensure that the messages being added are from the original message sender, or the bot
        if ((msg.author.id !== message.author.id) && (msg.author.id !== client.user.id)) {
            return;
        }

        // Check if bot was mentioned, or if msg was from the bot
        if ((msg.mentions.has(client.user.id)) || (msg.author.id == client.user.id)) {

            // Add messages to conversation log, with appropriate role
            if (msg.author.id == message.author.id) {
                conversationLog.push({
                    role: 'user',
                    content: msg.content,
                });
            } else if (msg.author.id == client.user.id) {

                conversationLog.push({
                    role: 'assistant',
                    content: msg.content,
                });

                /*
                * Grab the message that msg is a reply to, and check if the
                * author of that message is the same author of the original message
                * This makes sure that the bot is not adding their replies to other users
                * to the conversation log with this user
                */

                /*
                // Check if message is a reply to another
                if (msg.reference) {
                    
                    refMsg = await msg.fetchReference();
                    if (refMsg.author.id == message.author.id) {
                        //console.log(msg);
                        conversationLog.push({
                            role: 'assistant',
                            content: msg.content,
                        });
                    }
                */
            }
        } else {
            return;
        }
    });

    //console.log(conversationLog);
    const result = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationLog,
    })

    message.reply(result.data.choices[0].message);
};
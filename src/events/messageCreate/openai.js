const { EmbedBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

/**
 * Handle a message sent in the server, using the openai gpt-3.5 API
 * @param {*} client - The bot
 * @param {object} message - The message which was sent
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

    let conversationLog = []

    // Give the language model instructions
    conversationLog.push({
        role: 'system',
        content: 'Your name is Jas, and you are a flirtatious woman.'
    });

    // Give the language model instructions
    conversationLog.push({
        role: 'user',
        content: 'Your name is Jas, and you are a flirtatious woman.'
    });

    // Send the bot typing status
    await message.channel.sendTyping();

    // Grab previous messages in channel
    const logLimit = 20;
    const msgLimit = 20;
    let prevMessages = await message.channel.messages.fetch({ limit: msgLimit });
    // Messages are in latest-oldest order, so flip
    prevMessages.reverse();

    console.log(prevMessages);
    /* 
        Loop through prev msgs to find conversation context between the msg sender and the bot
    */
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

        // Check if convo log has space
        if (conversationLog.length < logLimit) {
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
                } else {
                    return;
                }
            }
        }
    });

    console.log(conversationLog);

    // Grab result object from openai
    const result = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationLog,
    })

    message.reply(result.data.choices[0].message);

    /*
    const embed = new EmbedBuilder().setTitle('Message').setColor('Random');
    embed.addFields(
        {
            name: 'Message Content',
            value: `${message.content}`
        },
        {
            name: 'Message Author',
            value: `${message.author}`,
            inline: true
        }
    );

    message.reply({ embeds: [embed], ephemeral: true });
    */
};
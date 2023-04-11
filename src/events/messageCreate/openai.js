const { EmbedBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

/**
 * Handle a message sent in the server
 * @param {*} client - The bot
 * @param {object} message - The message which was sent
 */
module.exports = async (client, message) => {
    // Setup config class
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });

    const openai = new OpenAIApi(configuration);


    // Ignore msg if author is a bot
    if (message.author.bot) {
        return;
    }
    // Ignore msg if not sent in the right channel
    if (message.channel.id !== process.env.OPENAI_CHANNEL_ID) {
        console.log('not the designated channel');
    }

    // Ignore message if bot is not mentioned
    if (!message.mentions.has(client.user.id)) {
        return;
    }

    // Give the bot direction
    let conversationLog = [
        { role: 'system', content: 'Your name is Jas. You are a good friend. You are flirtatious.' }
    ]

    // Give the illusion of the bot typing
    await message.channel.sendTyping();

    // Grab previous messages in channel
    let prevMessages = await message.channel.messages.fetch({ limit: 15 });
    // Messages are in latest-oldest order, so flip
    prevMessages.reverse();

    // Add user's convo history with the bot
    prevMessages.forEach((msg) => {
        // Ignore message if bot is not mentioned
        if (!message.mentions.has(client.user.id)) {
            return;
        }
        if (msg.author.id !== client.user.id && message.author.bot) {
            return;
        }
        // Ensure that the messages being added have a consistent sender
        if (msg.author.id !== message.author.id) {
            return;
        }

        conversationLog.push({
            role: 'user',
            content: msg.content,
        });

    });

    // Grab result from openai
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
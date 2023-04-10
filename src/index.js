/**
 * @author Cozy
 * @version 0.0.1
 * @link discord.js.org/#/
 */
const dotenv = require('dotenv');
dotenv.config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

//-----SETUP-----//
const client = new Client({
    // Information the bot needs to recieve
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

//-----EVENT LISTENERS-----//
/**
 * Handle a message sent in the server
 * @param {message} message - The message sent
 */
client.on('messageCreate', (message) => {
    // Ignore msg if author is a bot
    if (message.author.bot) {
        return;
    }
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
});

eventHandler(client);

client.login(process.env.TOKEN);
/**
 * @author Cozy
 * @version 1.3.3
 * @link discord.js.org/#/
 */
const dotenv = require('dotenv');
dotenv.config();
const { Client, IntentsBitField } = require('discord.js');
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

eventHandler(client);

client.login(process.env.TOKEN);
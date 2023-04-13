/**
 * @author Cozy
 * @version 1.4.2
 * @link discord.js.org/#/
 */
const dotenv = require('dotenv');
dotenv.config();
const { Client, IntentsBitField } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
const mongoose = require('mongoose');

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

// Immediately invoked function, made async to wait for database connection
(async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_CONNECTION, { keepAlive: true });
        console.log(`connected to the local database.`);

        eventHandler(client);
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }

})();

client.login(process.env.TOKEN);
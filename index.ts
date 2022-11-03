// This can all be converted to common javascript instead of typescript. To run the typescript: ts-node <filename>
import dotenv from 'dotenv';
dotenv.config();
const { Client, Intents } = require('discord.js');

//-----SETUP-----//
const myIntents = new Intents();
myIntents.add('GUILDS', 'GUILD_MESSAGES');

const client = new Client({
    // Tells discord the bot's purpose and what info it needs
    intents: myIntents
});

client.on('ready', () => {
    console.log("I'm ready to go online");
});

//----- -----//
client.on('messageCreate', (message) => {
    if (message.content === 'ping') {
        message.reply({
            content: 'pong'
        });
    }
});


client.login(process.env.TOKEN);
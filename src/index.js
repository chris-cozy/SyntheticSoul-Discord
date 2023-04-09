const dotenv = require('dotenv');
dotenv.config();
const { Client, IntentsBitField } = require('discord.js');

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
/*
    Called when bot server is turned on.
    c represents the client (bot instance).
*/
client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`);
});

/*
    Called when a msg is sent in the server
*/
client.on('messageCreate', (message) => {
    // Ignore msg if author is a bot
    if (message.author.bot) {
        return;
    }
    console.log(message.content);
    message.reply('testing')
});

// discord.js.org/#/
client.login(process.env.TOKEN);
const dotenv = require('dotenv');
dotenv.config();
const { Client, GatewayIntentBits, Guild } = require('discord.js');

//-----SETUP-----//
const client = new Client({
    // Tells discord the bot's purpose and what info it needs
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => {
    console.log("I'm ready to go online");
});

//-----LOGIC-----//
client.on('messageCreate', (message) => {
    if (message.content === 'I need help Jas') {
        message.reply({
            content: "read this, it's basically my manual https://discord.js.org/#/"
        });
    }
});


client.login(process.env.TOKEN);
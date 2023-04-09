const dotenv = require('dotenv');
dotenv.config();
const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require('discord.js');

//-----SETUP-----//
STATUS_CHANGE = 10;

const client = new Client({
    // Information the bot needs to recieve
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

let status = [
    {
        name: 'Crunchyroll',
        type: ActivityType.Watching
    },
    {
        name: 'Lofi Girl',
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk'
    }
]

function mins_to_millisecs(mins) {
    return mins * 60000;
}

//-----EVENT LISTENERS-----//
/*
    Called when bot server is turned on.
    c represents the client (bot instance).
    setActivity sets the bot's status
*/
client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`);

    setInterval(() => {
        // Generate random index
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);

    }, mins_to_millisecs(STATUS_CHANGE));
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

/*
    Called when a slash command is run
*/
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction.commandName)

    if (interaction.commandName === 'greet') {
        interaction.reply('heyy everyone')
    }

    if (interaction.commandName === 'ping') {
        interaction.reply('pongg')
    }

    if (interaction.commandName === 'add') {
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;

        interaction.reply(`the sum is ${num1 + num2}`)
    }

    if (interaction.commandName === 'multiply') {
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;

        interaction.reply(`the sum is ${num1 * num2}`)
    }

    if (interaction.commandName === 'embed') {
        const embed = new EmbedBuilder();
        embed.setTitle('Embed').setDescription('This is an embed').setColor('Random');
        embed.addFields(
            {
                name: 'Field Title',
                value: 'Random Value',
                inline: true
            },
            {
                name: 'Field Title',
                value: 'Random Value',
                inline: true
            }
        )

        interaction.reply({ embeds: [embed] })
    }
})

// discord.js.org/#/
client.login(process.env.TOKEN);
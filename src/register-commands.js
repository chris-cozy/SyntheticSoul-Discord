const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')
const dotenv = require('dotenv');
dotenv.config();

// Each object represents a command
const commands = [
    {
        name: 'greet',
        description: 'greets everyone'
    },
    {
        name: 'ping',
        description: 'pong'
    },
    {
        name: 'add',
        description: 'adds two numbers, using options',
        options: [
            {
                name: 'first-number',
                description: 'The first number',
                type: ApplicationCommandOptionType.Number,
                require: true
            },
            {
                name: 'second-number',
                description: 'The second number',
                type: ApplicationCommandOptionType.Number,
                require: true
            }
        ]
    },
    {
        name: 'multiply',
        description: 'multiplies two numbers, using options and choices',
        options: [
            {
                name: 'first-number',
                description: 'The first number',
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: '1',
                        value: 1,
                    },
                    {
                        name: '2',
                        value: 2,
                    },
                    {
                        name: '3',
                        value: 3,
                    }
                ],
                require: true
            },
            {
                name: 'second-number',
                description: 'The second number',
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: 'one',
                        value: 1,
                    },
                    {
                        name: 'two',
                        value: 2,
                    },
                    {
                        name: 'three',
                        value: 3,
                    }
                ],
                require: true
            }
        ]
    },
    {
        name: 'embed',
        description: 'sends an embed'
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

/*
    Command Handler
*/
(async () => {
    try {
        console.log('Registering slash commands...')
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands }
        )

        console.log('Successfully registered slash commands.')
    } catch (error) {
        console.log(`There was an error ${error}`)
    }
})();
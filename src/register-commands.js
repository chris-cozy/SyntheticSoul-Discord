const { REST, Routes } = require('discord.js')
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
    }
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
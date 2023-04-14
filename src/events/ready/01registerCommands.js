const { testServer } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const { Client } = require('discord.js');

/**
 * @brief Register/Edit/Delete local and application slash commands
 * @param {Client} client 
 */
module.exports = async (client) => {
    try {
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client, testServer);

        // Delete a command by id
        // applicationCommands.delete('1094985345889738852');


        for (const localCommand of localCommands) {
            const { name, description, options } = localCommand;

            // Checking if command exists on the bot
            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name
            );

            // If existing command for the local one already exists
            if (existingCommand) {
                // Delete command if local version is marked as deleted
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`Deleted command "${name}".`);
                    continue;
                }

                // Check if local command is different
                if (areCommandsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, { description, options });
                    console.log(`Edited command "${name}".`);
                }
            } else {
                if (localCommand.deleted) {
                    console.log(`Skipping registering command "${name}" as it's currently set to delete.`);
                    continue;
                }

                await applicationCommands.create({
                    name,
                    description,
                    options,
                });

                console.log(`Registered command "${name}".`);
            }
        }
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
};
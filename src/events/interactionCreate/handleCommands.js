const { devs, testServer } = require('../../../config.json');
const GetLocalCommands = require("../utils/fileHelpers");
const { Client, Interaction } = require('discord.js');

/**
 * @brief Handle slash commands
 * @param {Client} client 
 * @param {Interaction} interaction 
 */
module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = GetLocalCommands();

    // Check if command matches local commands. If so, use the object
    try {
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        );
        if (!commandObject) return;

        // If command has developer only perms, check if user is a developer
        if (commandObject.devOnly) {
            // Ephemeral - only person running the command can see the msg
            if (!devs.includes(interaction.member.id)) {
                interaction.reply({
                    content: 'Only developers are allowed to run this command',
                    ephemeral: true,
                });
                return;
            }
        }

        // If command has test-only perms, check if server is the testing server
        if (commandObject.testOnly) {
            // Ephemeral - only person running the command can see the msg
            if (!(interaction.guild.id === testServer)) {
                interaction.reply({
                    content: 'This command cannot be run here.',
                    ephemeral: true,
                });
                return;
            }
        }

        // Check if user has appropriate perms for command
        // ?. is optional chaining, it only activates if the attribute is present
        if (commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        content: 'Not enough permissions.',
                        ephemeral: true,
                    });
                    break;
                }
            }
        }

        // Check if bot has appropriate perms to run the command
        // ?. is optional chaining, it only activates if the attribute is present
        if (commandObject.botPermissionsRequired?.length) {
            for (const permission of commandObject.botPermissionsRequired) {
                const bot = interaction.guild.members.me;

                if (!bot.permissions.has(permission)) {
                    interaction.reply({
                        content: "I don't have permissions for that..",
                        ephemeral: true,
                    });
                    break;
                }
            }
        }

        // Run the command
        await commandObject.callback(client, interaction);
    } catch (error) {
        console.log(`There was an error running this command: ${error}`);
    }
};
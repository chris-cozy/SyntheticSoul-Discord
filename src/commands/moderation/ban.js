const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

/**
 * Ban a user from server
 * @param {options} option1 - The user to ban
 * @param {options} option2 - The reason for banning
 * [UNFINISHED]
 */
module.exports = {
    name: 'ban',
    description: 'in-development',
    devonly: false,
    testOnly: false,
    options: [
        {
            name: 'target-user',
            description: "The user to ban.",
            require: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: "The reason for banning",
            require: true,
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissionsRequired: [PermissionFlagsBits.Administrator],


    callback: (client, interaction) => {
        interaction.reply(`ban..`);
    },
}
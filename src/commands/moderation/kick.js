const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

/**
 * @brief Kick a user from server
 * @param {options} option1 - The user to ban
 * @param {options} option2 - The reason for banning
 */
module.exports = {
    name: 'kick',
    description: 'kick a member from the server',
    devonly: false,
    testOnly: false,
    deleted: false,
    options: [
        {
            name: 'target-user',
            description: "The user to kick.",
            require: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: "The reason for kicking",
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.KickMembers],
    botPermissionsRequired: [PermissionFlagsBits.KickMembers],

    /**
     * @brief Kick a user from the server
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value || "no reason.."

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        // Check if target user exists in the server
        if (!targetUser) {
            await interaction.editReply("that user doesn't exist in this server..");
            return;
        }

        // Check if target user is the owner
        if (targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply("you can't kick the server owner..");
            return;
        }

        // Check if target user's role is both below the bot, and the user executing the command
        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply("you can't kick someone with the same or higher role than you..");
        }

        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply("I can't kick that user because they have the same or higher role than me..");
        }

        // Ban the target user
        try {
            await targetUser.kick({ reason });
            await interaction.editReply(`user ${targetUser} was kicked\nreason: ${reason}`);
        } catch (error) {
            console.log(`there was an error: ${error}`);
        }

    }
}
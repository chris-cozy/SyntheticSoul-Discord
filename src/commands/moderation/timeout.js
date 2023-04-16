const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'timeout',
    description: 'timeout a member of the server',
    devonly: false,
    testOnly: false,
    deleted: false,
    options: [
        {
            name: 'target-user',
            description: "The user to timeout.",
            require: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'duration',
            description: "The timeout duration (5s, 30m, 1h, 1d).",
            require: true,
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'reason',
            description: "The reason for timeout",
            type: ApplicationCommandOptionType.String
        }
    ],
    permissionsRequired: [PermissionFlagsBits.MuteMembers],
    botPermissions: [PermissionFlagsBits.MuteMembers],

    /**
     * @brief Timeout a user in the server
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value;
        const duration = interaction.options.get('duration').value;
        const reason = interaction.options.get('reason')?.value || "no reason.."

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        // Check if target user exists in the server
        if (!targetUser) {
            await interaction.editReply("that user doesn't exist in this server..");
            return;
        }

        // If target user is a bot
        if (targetUser.user.bot) {
            await interaction.editReply("you can't timeout a bot silly");
            return;
        }

        // Convert user-provided duration into millisecs
        const msDuration = ms(duration);

        // Check if duration is valid
        if (isNaN(msDuration)) {
            await interaction.editReply("please provide a valid timeout duration..");
            return;
        }

        // Check the duration bounds (5s - 28d)
        const minDuration = 5000;
        const maxDuration = 2.419e9;
        if (msDuration < minDuration || msDuration > maxDuration) {
            await interaction.editReply("the timeout duration can't be less than 5s or more than 28 days..");
            return;
        }

        // Check if target user is the owner
        if (targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply("you can't timeout the server owner..");
            return;
        }

        // Check if target user's role is both below the bot, and the user executing the command
        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply("you can't timeout someone with the same or higher role than you..");
        }

        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply("I can't timeout that user because they have the same or higher role than me..");
        }

        // Timeout the target user
        try {
            // Conver duration from ms to human readable time, by using pretty-ms library
            const { default: prettyMs } = await import('pretty-ms');

            // Check if target user is already in timeout, to override it
            if (targetUser.isCommunicationDisabled()) {
                await targetUser.timeout(msDuration, reason);
                await interaction.editReply(`${targetUser}'s timeout has been updated to ${prettyMs(msDuration, { verbose: true })}\nreason: ${reason}`);
            }

            await targetUser.timeout(msDuration, reason);
            await interaction.editReply(`${targetUser} was put in timeout for ${prettyMs(msDuration, { verbose: true })}\nreason: ${reason}`);
        } catch (error) {
            console.log(`there was an error: ${error}`);
        }

    }
}
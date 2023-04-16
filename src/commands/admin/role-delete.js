const { Client, Colors, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'role-delete',
    description: "delete a role from this server",
    options: [
        {
            name: 'role',
            description: "the role to delete",
            type: ApplicationCommandOptionType.Role,
            required: true,
        },
        {
            name: 'reason',
            description: 'the reason behind deleting the role',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.ManageRoles],

    /**
     * @brief Allow user to delete a role from the server
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const role = interaction.options.get('role').value;
        const roleReason = interaction.options.get('reason').value;

        if (!interaction.inGuild()) {
            interaction.editReply("you can only run this command inside of a server..");
            return;
        }

        try {
            interaction.guild.roles.delete(role, roleReason);

            interaction.editReply(`you have successfully deleted the role **${role}**`);
        } catch (error) {
            console.log(`there was an error: $${error}`);
        }
    }
}
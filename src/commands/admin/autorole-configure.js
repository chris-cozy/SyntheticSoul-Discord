const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const autoRole = require('../../schemas/autorole');

module.exports = {
    name: 'autorole-configure',
    description: "configure your auto-role for this server",
    options: [
        {
            name: 'role',
            description: "the role you want users to get on join.",
            type: ApplicationCommandOptionType.Role,
            required: true,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.ManageRoles],

    /**
     * @brief Allow user to configure what role is automatically granted to new users in server
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        await interaction.deferReply();

        if (!interaction.inGuild()) {
            interaction.editReply("you can only run this command inside of a server..");
            return;
        }

        const targetRoleId = interaction.options.get('role').value;

        // If role exists, update it. If not, create it
        try {
            let role = await autoRole.findOne({ guildId: interaction.guild.id });

            if (role) {
                if (role.roleId === targetRoleId) {
                    interaction.editReply("auto role has already been configured for that role. to disable it, run '/autorole-disable'");
                }

                role.roleId = targetRoleId;
            } else {
                role = new autoRole({
                    guildId: interaction.guild.id,
                    roleId: targetRoleId
                });
            }

            await role.save();
            interaction.editReply("auto role has been configured. to disable it, run '/autorole-disable'");
        } catch (error) {

        }
    }
}
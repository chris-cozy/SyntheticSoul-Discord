const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const autoRole = require('../../schemas/autorole');

module.exports = {
    name: 'autorole-disable',
    description: "disable your auto-role for this server",
    permissionsRequired: [PermissionFlagsBits.Administrator],

    /**
     * @brief Allow user to disable the autorole
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        if (!interaction.inGuild()) {
            interaction.editReply("you can only run this command inside of a server..");
            return;
        }

        try {
            // Check if there is an autorole entry for the server
            if (!await autoRole.exists({ guildId: interaction.guild.id })) {
                interaction.editReply("auto role has not been configured for this server. use '/autorole-configure' to set it up.");
                return;
            }

            await autoRole.findOneAndDelete({ guildId: interaction.guild.id });
            interaction.editReply("auto role has been disabled for this server. use '/autorole-configure' to set it up again.");
        } catch (error) {
            console.log(`there was an error: $${error}`);
        }
    }
}
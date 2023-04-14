const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, Interaction } = require("discord.js");

/**
 * @brief Handle role assignment based on the button selected
 * @param {Client} client 
 * @param {Interaction} interaction 
 * @returns 
 */
module.exports = async (client, interaction) => {

    if (!interaction.isButton()) return;

    try {
        await interaction.deferReply({ ephemeral: true });

        const role = interaction.guild.roles.cache.get(interaction.customId);

        // Check if role was removed or deleted
        if (!role) {
            interaction.editReply({
                content: "I couldn't find that role.."
            });
            return;
        }

        // Check if user already has the role
        const hasRole = interaction.member.roles.cache.has(role.id);
        if (hasRole) {
            await interaction.member.roles.remove(role);
            await interaction.editReply(`the role of ${role} has been removed from you`);
            return;
        }

        await interaction.member.roles.add(role);
        await interaction.editReply(`the role of ${role} has been added for you`);

    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
}
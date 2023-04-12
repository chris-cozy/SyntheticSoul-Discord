const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

/**
 * @brief Send the client's websocket ping
 */
module.exports = {
    name: 'roles',
    description: 'send roles selector',
    devonly: false,
    testOnly: false,

    callback: async (client, interaction) => {
        try {
            await interaction.deferReply();

            const roles = [
                {
                    id: '819484571971354655',
                    label: 'staff'
                },
                {
                    id: '945364422451408997',
                    label: 'residents'
                },
                {
                    id: '819468075941756928',
                    label: 'customer'
                }
            ]

            // Check if the correct channel exists
            const channel = await client.channels.cache.get('816906701839532064');
            if (!channel) return;

            const row = new ActionRowBuilder();

            // Push a component button inside of the row for each role present
            roles.forEach((role) => {
                row.components.push(
                    new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
                );
            });

            await interaction.editReply({
                content: "claim or remove a role below",
                components: [row]
            });

        } catch (error) {
            console.log(`There was an error: ${error}`);
        }

    },
}
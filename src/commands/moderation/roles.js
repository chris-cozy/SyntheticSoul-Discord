const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, Interaction } = require("discord.js");

module.exports = {
    name: 'roles',
    description: 'send roles selector',
    devonly: false,
    testOnly: false,

    /**
     * @brief Send the client's websocket ping
     * @param {Client} client 
     * @param {Interaction} interaction 
     * @returns 
     */
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
            const channel = await client.channels.cache.get(process.env.ROLE_CHANNEL);
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
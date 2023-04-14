const { Client, Interaction } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'ping pong - client and websocket ping',
    devonly: true,
    testOnly: true,
    deleted: false,

    /**
     * @brief Send the client's websocket ping
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();

        const ping = reply.createdTimestamp - interaction.createdTimestamp;
        interaction.editReply(`pong! my personal ping is ${ping}ms, and the websocket ping is ${client.ws.ping}ms`);
    },
}
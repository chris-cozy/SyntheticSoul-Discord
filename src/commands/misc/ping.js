/**
 * Send the client's websocket ping
 */
module.exports = {
    name: 'ping',
    description: 'ping pong - client websocket ping',
    devonly: true,
    testOnly: true,

    callback: (client, interaction) => {
        interaction.reply(`pong: ${client.ws.ping}ms`);
    },
}
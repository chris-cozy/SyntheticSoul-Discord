const { ActivityType } = require('discord.js');

/**
 * Alert that the bot is online
 * @param {*} client - The bot
 */
module.exports = (client) => {
    let status = [
        {
            name: 'Crunchyroll',
            type: ActivityType.Watching
        },
        {
            name: 'Lofi Girl',
            type: ActivityType.Streaming,
            url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk'
        }
    ]

    const statusChangeMins = 10;
    const milliConversion = 60000;

    console.log(`${client.user.tag} is online.`);

    setInterval(() => {
        // Generate random index
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);

    }, (statusChangeMins * milliConversion));

};
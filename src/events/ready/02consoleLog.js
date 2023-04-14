const { ActivityType, Client } = require('discord.js');

/**
 * @brief Alert that the bot is online, and set the status
 * @param {Client} client - The bot
 */
module.exports = (client) => {
    try {
        // Possible statuses
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

        // Start status change cycle
        setInterval(() => {
            // Generate random index
            let random = Math.floor(Math.random() * status.length);
            client.user.setActivity(status[random]);

        }, (statusChangeMins * milliConversion));

    } catch (error) {
        console.log(`There was an error: ${error}`);
    }


};
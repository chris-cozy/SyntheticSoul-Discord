const { Client, Message } = require('discord.js');
const userLevel = require('../../schemas/level');
const calculateXpForLevel = require('../../utils/calculateXpForLevel');

/**
 * @brief Calculate a random number between the bounds
 * @param {Number} min 
 * @param {Number} max 
 */
function randomXp(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @brief Grant a user xp for communicating with the bot
 * @param {Client} client - The bot
 * @param {Message} message - The message which was sent
 */
module.exports = async (client, message) => {

    // Ignore msg if author is a bot
    if (message.author.bot) {
        return;
    }

    // Ignore message if bot is not mentioned
    if (!message.mentions.has(client.user.id)) {
        return;
    }

    // Check if message is sent in a server
    if (!message.inGuild()) {
        return;
    }

    const xpGranted = randomXp(5, 15);
    // Search database for a specific field type
    const query = {
        userId: message.author.id,
        guildId: message.guild.id,
    };

    try {
        // Check database if userId and guildId exist. 
        // If so, grant them xp. If not, create user entry in database
        const user = await userLevel.findOne(query);

        if (user) {
            user.xp += xpGranted;
            // If user's xp exceeds xp needed for current level
            if (user.xp > calculateXpForLevel(user.level)) {
                user.xp = 0;
                user.level += 1;

                message.channel.send(`${message.member}, you have leveled up to level ${user.level}!`);
            }

            await user.save().catch((e) => {
                console.log(`There was an error saving the updated level: ${e}`);
            });
        } else {
            const newUser = new userLevel({
                userId: message.author.id,
                guildId: message.guild.id,
                xp: xpGranted,
            });

            await newUser.save();
        }

    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
};
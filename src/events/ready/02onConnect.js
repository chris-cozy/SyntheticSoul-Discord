const { Client } = require("discord.js");

/**
 * @brief
 * @param {Client} client - The bot
 */
module.exports = async (client) => {
  try {
    console.log(`${client.user.tag} is online.`);
  } catch (error) {
    console.log(`System Error: ${error.message}`);
  }
};

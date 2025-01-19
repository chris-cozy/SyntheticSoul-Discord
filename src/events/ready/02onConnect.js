const { Client } = require("discord.js");
const { ClearTemporaryAudioFiles } = require("../../utils/voiceService");

/**
 * @brief
 * @param {Client} client - The bot
 */
module.exports = async (client) => {
  try {
    ClearTemporaryAudioFiles();
    console.log(`${client.user.tag} is online.`);
  } catch (error) {
    console.log(`System Error: ${error.message}`);
  }
};

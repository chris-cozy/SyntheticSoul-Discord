const { Client } = require("discord.js");
const { ClearTemporaryAudioFiles } = require("../../utils/voiceService");
const { LeaveUnregisteredGuilds } = require("../../utils/logicHelpers");

/**
 * @brief
 * @param {Client} client - The bot
 */
module.exports = async (client) => {
  try {
    ClearTemporaryAudioFiles();
    LeaveUnregisteredGuilds(client);
    console.log(`${client.user.tag} is online.`);
  } catch (error) {
    console.log(`System Error: ${error.message}`);
  }
};

const { Client } = require("discord.js");
const { ClearTemporaryAudioFiles, HandleVoiceCallInput, GetClientVoiceData } = require("../../utils/voiceService");

/**
 * @brief
 * @param {Client} client - The bot
 */
module.exports = async (client) => {
  try {
    ClearTemporaryAudioFiles();
    const voiceData = GetClientVoiceData(client);
    if (voiceData){
      const { connection, voiceChannel } = voiceData;
      HandleVoiceCallInput(connection, client, voiceChannel);
    }
    console.log(`${client.user.tag} is online.`);
  } catch (error) {
    console.log(`System Error: ${error.message}`);
  }
};

const { Client } = require("discord.js");
const { ClearTemporaryAudioFiles, HandleVoiceCallInput, GetClientVoiceData } = require("../../utils/voiceService");
const { LeaveUnregisteredGuilds } = require("../../utils/logicHelpers");

/**
 * @brief
 * @param {Client} client - The bot
 */
module.exports = async (client) => {
  try {
    ClearTemporaryAudioFiles();
    LeaveUnregisteredGuilds(client);
    const voiceData = GetClientVoiceData(client);
    console.log(voiceData)
    if (voiceData){
      const { connection, voiceChannel } = voiceData;
      HandleVoiceCallInput(connection, client, voiceChannel);
    }
    console.log(`${client.user.tag} is online.`);
  } catch (error) {
    console.log(`System Error: ${error.message}`);
  }
};

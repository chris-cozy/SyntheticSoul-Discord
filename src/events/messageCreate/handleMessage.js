const { Client, Message } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const { HandleTTSResponse, PushToAudioQueue, PlayNextAudio } = require("../../utils/voiceService");
const { CheckImplicitAddressing, GetResponse } = require("../../utils/syntheticSoulService");

/**
 * @brief Handle a message sent in the server.
 * @param {Client} client - The bot
 * @param {Message} msg - The message which was sent
 */
module.exports = async (client, msg) => {

  if (msg.author.id === client.user.id) return;

  if(!(await CheckImplicitAddressing(msg))) return;
    
  const response =  await GetResponse(msg);

  console.log(typeof(response))

  const voiceChannel = msg.member?.voice.channel;

  if (voiceChannel){
    const filePath = await HandleTTSResponse(response)

    PushToAudioQueue(filePath, voiceChannel, msg);
    PlayNextAudio(client, msg.author.id)
    
    return;  
  }

  await msg.channel.sendTyping();
  msg.channel.send(response)
  return;
};

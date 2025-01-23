const { Client, Message } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const { HandleTTSResponse, PushToAudioQueue, PlayNextAudio } = require("../../utils/voiceService");
const { GetResponse } = require("../../utils/syntheticSoulService");
const DM_CHANNEL = 1;
const SERVER_CHANNEL = 0;

/**
 * @brief Handle a message sent in the server.
 * @param {Client} client - The bot
 * @param {Message} msg - The message which was sent
 */
module.exports = async (client, msg) => {

  if (msg.author.id === client.user.id) return;
  const username = msg.author.username;
  let response;

  if (msg.channel.type === SERVER_CHANNEL) {
    response =  await GetResponse(msg.content, username, 'gc');
  }else if (msg.channel.type === DM_CHANNEL){
    response =  await GetResponse(msg.content, username, 'dm');
  } else{
    return;
  }

  if (!response) return;
 
  const voiceChannel = msg.member?.voice.channel;

  if (voiceChannel){
    const filePath = await HandleTTSResponse(response)

    PushToAudioQueue(filePath, voiceChannel, username);
    PlayNextAudio(client, username)
    
    return;  
  }

  await msg.channel.sendTyping();
  msg.channel.send(response)
  return;
};

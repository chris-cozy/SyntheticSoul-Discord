const { Client, Message, ChannelType } = require("discord.js");
const dotenv = require("dotenv");

dotenv.config();

const { HandleTTSResponse, PushToAudioQueue, PlayNextAudio } = require("../../utils/voiceService");
const { GetResponse } = require("../../utils/syntheticSoulService");

/**
 * @brief Handle a message sent in Discord.
 * @param {Client} client - The bot
 * @param {Message} msg - The incoming message
 */
module.exports = async (client, msg) => {
  if (!msg || msg.author?.bot || msg.author?.id === client.user.id) {
    return;
  }

  const isDirectMessage = msg.channel?.type === ChannelType.DM;
  const isGuildMessage = Boolean(msg.guildId);

  if (!isDirectMessage && !isGuildMessage) {
    return;
  }

  let inputText = msg.content || "";

  if (isGuildMessage) {
    if (!msg.mentions.has(client.user.id)) {
      return;
    }
    // Keep the mention token in group messages so API-side implicit-address
    // detection can reliably identify that the bot was addressed.
    inputText = inputText.trim();
  }

  const messageType = isDirectMessage ? "dm" : "group";
  const response = await GetResponse(inputText, msg.author.username, messageType, msg.author.id);

  if (!response) {
    return;
  }

  const voiceChannel = msg.member?.voice?.channel;
  if (voiceChannel) {
    const filePath = await HandleTTSResponse(response);
    if (!filePath) {
      await msg.channel.send("I could not generate voice audio right now, so I replied in text instead.");
      await msg.channel.send(response);
      return;
    }
    PushToAudioQueue(filePath, voiceChannel, msg.author.id);
    PlayNextAudio(client, msg.author.id);
    return;
  }

  await msg.channel.sendTyping();
  await msg.channel.send(response);
};

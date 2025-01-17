const { Client, Message } = require("discord.js");
const axios = require('axios');
const {ElevenLabsClient} = require('elevenlabs');
const fs = require('fs');

const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus} = require('@discordjs/voice');
const path = require('path');

const audioQueue = [];
let isPlaying = false;
let leaveTimeout;

/**
 * @brief Handle a message sent in the server.
 * @param {Client} client - The bot
 * @param {Message} msg - The message which was sent
 */
module.exports = async (client, msg) => {
  // Ignore msg if author is a bot or bot is not mentioned
  if (msg.author.bot || !msg.mentions.has(client.user.id)) {
    return;
  }

  /**
   * @brief Passes message to synthetic soul api. Checks if user is in a voice channel and if so, joins and speaks the response
   */
  async function handleUserMessage() {
    const elevenLabsClient = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_KEY });

    const url = process.env.SYNTHETIC_SOUL_API_URL;
    const payload = {
        message: msg.content,
        username: msg.author.username
    };
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post(url, payload, { headers });

      console.log(response.data.response)
      const voiceChannel = msg.member?.voice.channel;

      if (!voiceChannel) {
        await msg.channel.sendTyping();
        msg.reply(response.data.response)
        return;
      }else{

        const tts = await elevenLabsClient.generate({
          voice: process.env.VOICE_ID,
          text:  response.data.response,
          model_id: process.env.ELEVENLABS_MODEL_ID
        });

        const fileName = `output_${Date.now()}.mp3`;
        const filePath = path.join(__dirname, '..', '..', 'audio', fileName);

        await handleTTSResponse(tts, filePath);

        audioQueue.push({ filePath, voiceChannel });
        if (!isPlaying) playNextAudio();      
      }
      
    } catch (error) {
        console.error('Error making POST request:', error.message);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', error.response.data);
        }
    }

    
  }

  /**
   * @brief Joins voice channel user is in and plays audio response file. If there are numerous, recursively calls. Stays in call for 30 seconds before leaving
   */
  async function playNextAudio() {
    // TODO: Make bot stay in call for as long as the message sender is in the call
    if (audioQueue.length === 0) {
      isPlaying = false;
      return;
    }

    isPlaying = true;
    const { filePath, voiceChannel } = audioQueue.shift();
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      selfDeaf: false,
    });

    const player = createAudioPlayer();
    const resource = createAudioResource(filePath);

    player.play(resource);
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => {
      fs.unlinkSync(filePath); // Delete the file after playback
      console.log(`${filePath} deleted`);
      clearTimeout(leaveTimeout);
      leaveTimeout = setTimeout(() => {
        if (connection.state.status !== 'destroyed') connection.destroy();
      }, 30000); // 30 seconds timeout to leave the channel
      playNextAudio();
    });

    player.on('error', (error) => {
      console.error('Audio player error:', error.message);
      connection.destroy();
      isPlaying = false;
    });
  }

  /**
   * @brief Writes the audio output file
   */
  async function handleTTSResponse(wrapper, filePath) {
    const reader = wrapper.reader;
  
    const chunks = [];
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        chunks.push(value);
      }
      const buffer = Buffer.concat(chunks);
      require('fs').writeFileSync(filePath, buffer);
      console.log('Audio written to:', filePath);
    } catch (err) {
      console.error('Error while reading stream:', err);
    } finally {
      reader.releaseLock(); // Ensure the lock is released after processing
    }
  }

  handleUserMessage();
};

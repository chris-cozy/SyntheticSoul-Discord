const { Client, Message, GatewayIntentBits } = require("discord.js");
const axios = require('axios');
const {ElevenLabsClient} = require('elevenlabs');
const fs = require('fs');

const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus} = require('@discordjs/voice');
const path = require('path');

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

  async function handleUserMessage() {
    const client = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_KEY });

    const url = process.env.SYNTHETIC_SOUL_API_URL;
    const payload = {
        message: msg.content,
        user_id: msg.author.id,
        user_name: msg.author.username
    };
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post(url, payload, { headers });

      console.log(response.data.response)
      const voiceChannel = msg.member?.voice.channel;
      //const voices = await client.voices.getAll();
      // console.log(voices)
      if (!voiceChannel) {
        await msg.channel.sendTyping();
        msg.reply(response.data.response)
      }else{
        let tts = await client.generate({
          voice: "Tamara",
          text: response.data.response,
          model_id: "eleven_turbo_v2_5"
        });
        await handleTTSResponse(tts);

        // Join the voice channel
        const connection = joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: voiceChannel.guild.id,
          adapterCreator: voiceChannel.guild.voiceAdapterCreator,
          selfDeaf: false,
        });

        // Create an audio player
        const player = createAudioPlayer();

        // Load an audio file (ensure this file exists in your project directory)
        const resource = createAudioResource(path.join(__dirname, '..', '..', 'audio', 'output.mp3'));
        console.log(resource);

        // Subscribe the connection to the audio player
        const subscription = connection.subscribe(player);
        if (!subscription) {
          throw new Error('Subscription failed. Check connection.');
        }

        // Play the audio
        player.play(resource);

        player.on('stateChange', (oldState, newState) => {
          console.log(`Audio Player transitioned from ${oldState.status} to ${newState.status}`);
        });

        player.on('error', (error) => {
          console.error('Audio Player Error:', error.message);
        });

        // Handle idle state to clean up
        player.on(AudioPlayerStatus.Idle, () => {
          console.log('Audio finished playing. Disconnecting...');
          connection.destroy();
        });

      }
      
    } catch (error) {
        console.error('Error making POST request:', error.message);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', error.response.data);
        }
    }

    
  }

  async function handleTTSResponse(wrapper) {
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
      require('fs').writeFileSync(path.join(__dirname, '..', '..', 'audio', 'output.mp3'), buffer);
      console.log('Audio written to output.mp3');
    } catch (err) {
      console.error('Error while reading stream:', err);
    } finally {
      reader.releaseLock(); // Ensure the lock is released after processing
    }
  }

  handleUserMessage();
};

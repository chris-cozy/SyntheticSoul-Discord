const dotenv = require("dotenv");
const {ElevenLabsClient} = require('elevenlabs');
const fs = require('fs');
const path = require('path');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, EndBehaviorType} = require('@discordjs/voice');
const wav = require('wav');

dotenv.config();
const elevenLabsClient = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_KEY });
const audioDirectory = path.join(__dirname, '..', 'audio');
const audioQueue = [];
let isPlaying = false;
let leaveVoiceChannelTimeout;
const activeAudioStreams = new Map(); // Tracks active audio streams by user ID


/**
 * @brief Queries elevenlabs api for the audio buffer, then writes to local temporary file
 * @param {String} response - String to turn into audio
 * @returns Filepath of temporary file
 */
async function HandleTTSResponse(response) {

    const tts = await elevenLabsClient.generate({
        voice: process.env.VOICE_ID,
        text:  response,
        model_id: process.env.ELEVENLABS_MODEL_ID
    });
    
    const fileName = `output_${Date.now()}.mp3`;
    const filePath = path.join(audioDirectory, fileName);

    const reader = tts.reader;
  
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
      fs.writeFileSync(filePath, buffer);

      return filePath;
    } catch (err) {
      console.error('Error - HandleTTSResponse: While reading stream:', err);
    } finally {
      reader.releaseLock(); // Ensure the lock is released after processing
    }
}

/**
 * @brief Removes all files in the audio directory
 */
async function ClearTemporaryAudioFiles(){
  try {
      const files = fs.readdirSync(audioDirectory);
      
      files.forEach((file) => {
          const filePath = path.join(audioDirectory, file);
          fs.unlinkSync(filePath);
      });

      console.log('Success - Removed all temporary audio files.');
  } catch (err) {
      console.error('Error - ClearTemporaryAudioFiles:', err);
  }

}

/**
 * @brief Pushes audio filepath and desired voiceChannel to the queue
 */
function PushToAudioQueue(filePath, voiceChannel, msg){
  audioQueue.push({ filePath, voiceChannel, msg });
}

/**
 * @brief Joins voice channel user is in and plays audio response file. If there are numerous, recursively calls. Stays in call for 30 seconds before leaving
 * @param {Client} client - Bot client
 * @param {String} msg - Message the audio
 */
async function PlayNextAudio(client, author_id) {
  if (isPlaying) return;
  let lastVoiceChannel = null;
  const lastMessageAuthorId = author_id;
  
  if (audioQueue.length === 0) {
    isPlaying = false;

    // If the bot is still connected, check the presence of the last message sender
    const voiceChannel = lastVoiceChannel;
    if (!voiceChannel) return;

    if (!lastMessageAuthorId) return;

    const lastMessageAuthor = voiceChannel.members.get(lastMessageAuthorId);

    if (!lastMessageAuthor) {
      leaveVoiceChannelTimeout = setTimeout(() => {
        const nonBotMembers = voiceChannel.members.filter(
          (member) => member.user.id !== client.user.id
        );
        if (nonBotMembers.size === 0) {
          connection?.destroy();
        }
      }, 15000);
    } 
    return;
  }

  try{
    isPlaying = true;
    const { filePath, voiceChannel, current_author_id } = audioQueue.shift();
    const connection = JoinVoiceChannel(voiceChannel, client);

    lastVoiceChannel = voiceChannel;

    const player = createAudioPlayer();
    const resource = createAudioResource(filePath);

    player.play(resource);
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => {
      fs.unlinkSync(filePath);
      isPlaying = false;
      PlayNextAudio(client, current_author_id);
    });

    player.on('error', (error) => {
      console.error('Error - PlayNextAudio:', error.message);
      connection.destroy();
      isPlaying = false;
    });
  }catch(err) {
    console.error('Error - PlayNextAudio:', error.message);
    isPlaying = false;
  }
}

/**
 * @brief Joins the specified voice channel
 * @param voiceChannel - Channel to connect to
 * @returns Voice channel connection
 */
function JoinVoiceChannel(voiceChannel, client){
  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    selfDeaf: false,
  });

  // Subscribe to user speech activity
  HandleVoiceCallInput(connection, client);
  return connection;
}

/**
 * @brief Joins the specified voice channel
 * @param connection - Voice call connection object
 * @param client - The agent
 */
function HandleVoiceCallInput(connection, client) {
  const receiver = connection.receiver;

  receiver.speaking.on('start', (userId) => {
    // Get server in context of voice call connection
    const guild = client.guilds.cache.get(connection.joinConfig.guildId);

    if (!guild) {
      console.error('Error - HandleVoiceCallInput: Guild not found');
      return;
    }

    // Grab the user which is speaking
    const user = guild.members.cache.get(userId);
    if (user) {
      console.log(`Processing - HandleVoiceCallInput: User ${user.user.username} has started speaking.`);
      HandleSpeakingStart(userId, receiver); // Process audio stream
    }
  });

  receiver.speaking.on('end', (userId) => {
    // Get server in context of voice call connection
    const guild = client.guilds.cache.get(connection.joinConfig.guildId);

    if (!guild) {
      console.error('Error - HandleVoiceCallInput: Guild not found');
      return;
    }

    // Grab the user which stopped speaking
    const user = guild.members.cache.get(userId);
    if (user) {
      console.log(`Processing - HandleVoiceCallInput: User ${user.user.username} has stopped speaking.`);
      HandleSpeakingEnd(userId);
    }
  });
}

/**
 * @brief Creates an audio stream for what's being spoken
 * @param userId - The ID of the user speaking
 * @param receiver - The voice call connection receiver
 */
async function HandleSpeakingStart(userId, receiver) {
  if (activeAudioStreams.has(userId)) {
    console.log(`Warning - HandleSpeakingStart: Audio stream for user ID ${userId} is already active.`);
    return;
  }

  const audioStream = receiver.subscribe(userId, {
    end: {
      behavior: EndBehaviorType.AfterSilence,
      duration: 2000,
    }
  });

  activeAudioStreams.set(userId, audioStream);

  console.log(`Processing - HandleSpeakingStart: Started capturing audio for user ID ${userId}`);
  ProcessAudioStream(userId, audioStream); // Pass the stream to transcription
}

function HandleSpeakingEnd(userId) {
  const audioStream = activeAudioStreams.get(userId);

  if (!audioStream){
    console.log(`Warning - HandleSpeakingEnd: No active audio stream found for user ID: ${userId}`);
    return;
  }
  
  console.log(`Processing - HandleSpeakingEnd: Ending audio stream for user ID: ${userId}`);
  // Emit the 'end' event manually 
  audioStream.destroy();
  activeAudioStreams.delete(userId);
  
  console.log(`Success - HandleSpeakingEnd: Stopped capturing audio for user ID: ${userId}`);
}

/**
 * @brief Creates a .wav file with the audio data from the stream
 * @param userId - The ID of the user speaking
 * @param audioStream - The audio stream to use
 */
async function ProcessAudioStream(userId, audioStream) {
  const fileName = `input_${Date.now()}.wav`;
  const filePath = path.join(__dirname, '..', 'audio', fileName);

  const wavWriter = new wav.FileWriter(filePath, {
      sampleRate: 48000, // Discord's default sample rate
      channels: 2,       // Stereo
      bitDepth: 16,      // 16-bit PCM
  });

  audioStream.pipe(wavWriter);


  wavWriter.on('error', (err) => {
      console.error(`Error - ProcessAudioStream: Writing WAV file for user ID ${userId}:`, err.message);
  });


  // Handle audio stream errors
  audioStream.on('error', (error) => {
    console.error(`Error - ProcessAudioStream: In audio stream for user ID ${userId}:`, error.message);
  });

  const chunks = [];

  audioStream.on('data', (chunk) => {
    chunks.push(chunk);
  });

  audioStream.on('end', async () => {
    console.log(`Processing - ProcessingAudioStream: Audio stream ended for user ID ${userId}. Finalizing WAV file.`);
    
    try {
      wavWriter.end(() => {
        console.log(`Success - ProcessAudioStream: WAV file written to ${filePath}`);
      });

      // Transcribe the audio using OpenAI's Whisper API
      const transcription = await openai.createTranscription(fs.createReadStream(filePath), 'whisper-1');

      console.log(`Success - ProcessAudioStream: Transcription for user ID ${userId}:`, transcription.data.text);

      // Clean up: Delete the temporary WAV file
      /*
      unlink(filePath, (err) => {
        if (err) {
          console.error(`Error - ProcessAudioStream: Deleting file ${filePath}:`, err.message);
        } else {
          console.log(`Success - ProcessAudioStream: Temporary file ${filePath} deleted.`);
        }
      });
      */

    } catch (error) {
      console.error(`Error - ProcessAudioStream: Transcribing audio for user ID: ${userId}:`, error.message);

      // Ensure file cleanup even if transcription fails
      unlink(filePath, (err) => {
        if (err) {
          console.error(`Error - ProcessAudioStream: Deleting file ${filePath}:`, err.message);
        } else {
          console.log(`Success - ProcessAudioStream: Temporary file ${filePath} deleted.`);
        }
      });
    }
  });
}


module.exports = {
  HandleTTSResponse,
  ClearTemporaryAudioFiles,
  PushToAudioQueue,
  PlayNextAudio,
  JoinVoiceChannel,
  HandleSpeakingStart,
  HandleSpeakingEnd,
  ProcessAudioStream
};
  
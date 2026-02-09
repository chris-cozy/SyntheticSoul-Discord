const dotenv = require("dotenv");
const {ElevenLabsClient} = require('elevenlabs');
const fs = require('fs');
const path = require('path');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, EndBehaviorType, entersState, VoiceConnectionStatus, getVoiceConnection  } = require('@discordjs/voice');
const ffmpegStatic = require('ffmpeg-static');
const prism = require('prism-media');
const { execFile } = require('child_process');
const { VoiceChannel } = require('discord.js');
const { createWriteStream } = require('node:fs');
const { pipeline } = require('node:stream');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const { CheckImplicitAddressing, GetResponse } = require("./syntheticSoulService");
const elevenLabsClient = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_KEY });
const audioDirectory = path.join(__dirname, '..', 'audio');
const audioQueue = [];
let isPlaying = false;
let leaveVoiceChannelTimeout = null;
let lastVoiceChannel = null;
let lastVoiceConnection = null;
const activeSessions = new Map();
const opusStreamState = {};
const processingFiles = new Set(); // Track ongoing MP3 conversions

dotenv.config();

function EnsureAudioDirectory() {
  if (!fs.existsSync(audioDirectory)) {
    fs.mkdirSync(audioDirectory, { recursive: true });
  }
}

function SafeUnlink(filePath) {
  try {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error(`Error - SafeUnlink: Could not delete ${filePath}:`, error.message);
  }
}

async function ConvertOggToMp3(oggPath, mp3Path) {
  if (!ffmpegStatic) {
    throw new Error("ffmpeg-static binary unavailable on this platform.");
  }

  return new Promise((resolve, reject) => {
    const args = [
      "-y",
      "-i", oggPath,
      "-vn",
      "-ar", "44100",
      "-ac", "2",
      "-ab", "192k",
      "-f", "mp3",
      mp3Path,
    ];

    execFile(ffmpegStatic, args, (error, _stdout, stderr) => {
      if (error) {
        return reject(new Error(`${error.message}${stderr ? ` | ${stderr.trim()}` : ""}`));
      }
      resolve(mp3Path);
    });
  });
}



/**
 * @brief Queries elevenlabs api for the audio buffer, then writes to local temporary file
 * @param {String} response - String to turn into audio
 * @returns Filepath of temporary file
 */
async function HandleTTSResponse(response) {
    EnsureAudioDirectory();

    async function readWebReaderToBuffer(reader) {
      const chunks = [];
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) chunks.push(Buffer.from(value));
        }
      } finally {
        if (reader && typeof reader.releaseLock === "function") {
          reader.releaseLock();
        }
      }
      return chunks.length ? Buffer.concat(chunks) : null;
    }

    async function readNodeStreamToBuffer(stream) {
      return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on("end", () => resolve(chunks.length ? Buffer.concat(chunks) : null));
        stream.on("error", reject);
      });
    }

    async function normalizeTTSBuffer(tts) {
      if (!tts) return null;
      if (Buffer.isBuffer(tts)) return tts;
      if (tts instanceof Uint8Array) return Buffer.from(tts);
      if (typeof tts.arrayBuffer === "function") {
        const ab = await tts.arrayBuffer();
        return Buffer.from(ab);
      }
      if (typeof tts.getReader === "function") {
        return readWebReaderToBuffer(tts.getReader());
      }
      if (tts.reader && typeof tts.reader.read === "function") {
        return readWebReaderToBuffer(tts.reader);
      }
      if (typeof tts.pipe === "function") {
        return readNodeStreamToBuffer(tts);
      }
      if (typeof tts[Symbol.asyncIterator] === "function") {
        const chunks = [];
        for await (const chunk of tts) {
          chunks.push(Buffer.from(chunk));
        }
        return chunks.length ? Buffer.concat(chunks) : null;
      }
      return null;
    }

    try {
      const tts = await elevenLabsClient.generate({
          voice: process.env.VOICE_ID,
          text: response,
          model_id: process.env.ELEVENLABS_MODEL_ID
      });

      const buffer = await normalizeTTSBuffer(tts);
      if (!buffer || !buffer.length) {
        throw new Error("No audio buffer returned from ElevenLabs.");
      }

      const fileName = `output_${Date.now()}.mp3`;
      const filePath = path.join(audioDirectory, fileName);
      fs.writeFileSync(filePath, buffer);
      return filePath;
    } catch (err) {
      console.error("Error - HandleTTSResponse:", err);
      return null;
    }
}

/**
 * @brief Removes all files in the audio directory
 */
async function ClearTemporaryAudioFiles(){
  try {
      EnsureAudioDirectory();
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
 * @param {String} filePath - File path of the audio file to push into the queue
 * @param {VoiceChannel} voiceChannel - Voice channel to play the audio in
 * @param {String} authorId - User ID of message sender
 */
function PushToAudioQueue(filePath, voiceChannel, authorId){
  audioQueue.push({ filePath, voiceChannel, authorId });
}

/**
 * @brief Joins voice channel user is in and plays audio response file. If there are numerous, recursively calls. Stays in call for 30 seconds before leaving
 * @param {Client} client - Bot client
 * @param {String} author_id - User ID of the source message author
 */
async function PlayNextAudio(client, authorId) {
  if (isPlaying) return;
  const lastMessageAuthorId = authorId;
  
  if (audioQueue.length === 0) {
    isPlaying = false;

    // If the bot is still connected, check the presence of the last message sender
    const voiceChannel = lastVoiceChannel;
    if (!voiceChannel) return;
    if (!lastVoiceConnection) return;

    if (leaveVoiceChannelTimeout) {
      clearTimeout(leaveVoiceChannelTimeout);
      leaveVoiceChannelTimeout = null;
    }

    if (!lastMessageAuthorId) return;
    const lastMessageAuthor = voiceChannel.members.get(lastMessageAuthorId);

    if (!lastMessageAuthor) {
      leaveVoiceChannelTimeout = setTimeout(() => {
        const nonBotMembers = voiceChannel.members.filter(
          (member) => member.user.id !== client.user.id
        );
        if (nonBotMembers.size === 0) {
          lastVoiceConnection?.destroy();
          lastVoiceConnection = null;
          lastVoiceChannel = null;
        }
      }, 15000);
    } 
    return;
  }

  try{
    if (leaveVoiceChannelTimeout) {
      clearTimeout(leaveVoiceChannelTimeout);
      leaveVoiceChannelTimeout = null;
    }

    isPlaying = true;
    const { filePath, voiceChannel, authorId: nextAuthorId } = audioQueue.shift();
    const connection = await JoinVoiceChannel(voiceChannel, client);

    lastVoiceChannel = voiceChannel;
    lastVoiceConnection = connection;

    const player = createAudioPlayer();
    const resource = createAudioResource(filePath);

    player.play(resource);
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => {
      setTimeout(() => {
        try {
            fs.unlinkSync(filePath);
        } catch (err) {
            console.error('Error deleting file:', err);
        }
      }, 100); // Allow time for processes to release the file
      isPlaying = false;
      PlayNextAudio(client, nextAuthorId);
    });

    player.on('error', (error) => {
      console.error('Error - PlayNextAudio:', error.message);
      connection.destroy();
      isPlaying = false;
    });
  }catch(err) {
    console.error('Error - PlayNextAudio:', err.message);
    isPlaying = false;
  }
}

/**
 * @brief Joins the specified voice channel
 * @param {VoiceChannel} voiceChannel - Voice channel to connect to
 * @param {Client} client - Bot client
 * @returns Voice channel connection
 */
function JoinVoiceChannel(voiceChannel, client){
  const existingConnection = getVoiceConnection(voiceChannel.guild.id);
  if (existingConnection && existingConnection.joinConfig.channelId === voiceChannel.id) {
    return existingConnection;
  }

  if (existingConnection) {
    existingConnection.destroy();
  }

  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    selfDeaf: false,
  });

  HandleVoiceCallInput(connection, client, voiceChannel);
  return connection;
}

/**
 * @brief Subscribes to user speech activity in the specified channel
 * @param connection - Voice call connection object
 * @param {Client} client - The agent
 * @param {VoiceChannel} voiceChannel - The voice channel that is being listened to
 */
async function HandleVoiceCallInput(connection, client, voiceChannel) {
  await entersState(connection, VoiceConnectionStatus.Ready, 20e3);
  const receiver = connection.receiver;

  receiver.speaking.on('start', (userId) => {
    if (activeSessions.has(userId)) {
      //console.warn(`Warning - HandleVoiceCallInput: Skipping stream create because user ${userId} already has an active session.`);
      return;
    }
    
    const baseFile = `input_${userId}_${Date.now()}`;
    activeSessions.set(userId, baseFile);
    CreateListeningStream(receiver, userId, baseFile);
  });

  receiver.speaking.on('end', async (userId) => {
      const baseFile = activeSessions.get(userId);
      if (!baseFile) {
        //console.error(`Error - HandleVoiceCallInput: No active session found for user ${userId}`);
        return;
      }

      // Wait until the Opus stream has ended
      while (!opusStreamState[userId]) {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Small delay to avoid busy-wait
      }

      const baseFilePath = path.join(audioDirectory, baseFile);
      const oggPath = `${baseFilePath}.ogg`;
      const mp3Path = `${baseFilePath}.mp3`;

    

      if (fs.existsSync(oggPath)) {
        try{
          if (processingFiles.has(oggPath)) {
            //console.warn(`Warning - HandleVoiceCallInput: Skipping duplicate processing for file: ${mp3Path}`);
            return;
          }
          processingFiles.add(oggPath);

          const convertedPath = await ConvertOggToMp3(oggPath, mp3Path);
          console.log('Success - HandleVoiceCallInput: MP3 file generated at:', convertedPath);

          const user = client.users.cache.get(userId);
          const spokenMessage = await TranscribeAudio(convertedPath);

          SafeUnlink(oggPath);
          SafeUnlink(mp3Path);
          activeSessions.delete(userId);
          delete opusStreamState[userId];
          processingFiles.delete(oggPath);

          await HandleCallResponse(
            spokenMessage,
            userId,
            user?.username || `user_${userId}`,
            voiceChannel,
            client
          );
        } catch (err){
          processingFiles.delete(oggPath);
          activeSessions.delete(userId);
          delete opusStreamState[userId];
          SafeUnlink(oggPath);
          SafeUnlink(mp3Path);
          console.error(`Error - HandleVoiceCallInput: converting OGG to MP3: ${err.message}`);
        }     
      } else {
        activeSessions.delete(userId);
        delete opusStreamState[userId];
        console.error(`Error - HandleVoiceCallInput: OGG file not found at ${oggPath}`);
      }

  });
}

/**
 * @brief Creates the opus stream which writes to the .ogg file
 * @param receiver - Voice call connection receiver
 * @param {String} userId - The user ID of the speaker
 * @param {String} filename - The filename for use when creating the .ogg
 */
function CreateListeningStream(receiver, userId, filename) {
  EnsureAudioDirectory();
  const oggFile = `${filename}.ogg`;
  const oggFilePath = path.join(audioDirectory, oggFile);
  const silenceTrigger = 4000

  try{
    const opusStream = receiver.subscribe(userId, {
      end: {
          behavior: EndBehaviorType.AfterSilence,
          duration: silenceTrigger,
      },
    });

    const oggStream = new prism.opus.OggLogicalBitstream({
        opusHead: new prism.opus.OpusHead({
            channelCount: 2,
            sampleRate: 48000,
        }),
        pageSizeControl: {
            maxPackets: 10,
        },
    });


    const out = createWriteStream(oggFilePath, { flags: 'a' });
    opusStreamState[userId] = false;
    console.log(`Success - CreateListeningStream: 👂Started recording ${oggFilePath}`);

    opusStream.on('data', (chunk) => {
      // console.log(`Data chunk received: ${chunk.length} bytes`);
    });

    // Handle end of stream
    opusStream.on('end', () => {
        console.log('Processing - CreateListeningStream: Opus stream ended');
        opusStreamState[userId] = true;
    });

    oggStream.on('end', () => {
        console.log('Processing - CreateListeningStream: Ogg stream ended');
    });

    out.on('finish', () => {
        console.log('Success - CreateListeningStream: File write completed');
    });

    pipeline(opusStream, oggStream, out, (err) => {
        if (err) {
            console.error(`Error - CreateListeningStream: recording file ${oggFilePath} - ${err.message}`);
        } 
    });

      // Handling potential errors with each stream
    opusStream.on('error', (err) => {
      console.error(`Error - CreateListeningStream: Opus stream error: ${err.message}`);
    });

    oggStream.on('error', (err) => {
        console.error(`Error - CreateListeningStream: Ogg stream error: ${err.message}`);
    });

    out.on('error', (err) => {
        console.error(`Error - CreateListeningStream: File write error: ${err.message}`);
    });
  }catch(error){
    console.error(`Error - CreateListeningStream: ${error.message}`);
  }
  
}

/**
 * @brief Transcribe a .mp3 file into text (open ai whisper)
 * @param {String} filepath - Path of the .mp3 file
 * @returns {String} The text transcription
 */
async function TranscribeAudio(filePath) {
  try {
    const transcription = await openai.createTranscription(fs.createReadStream(filePath), 'whisper-1');

    console.log('Success - TranscribeAudio: Transcription:', transcription.data.text);
    return transcription.data.text;
  } catch (error) {
    console.error('Error - TranscribeAudio: during transcription:', error);
  }
}

/**
 * @brief Handles responding to a message in voice call.
 * @param {String} message - spoken message
 * @param {String} userId - The speaker's Discord user ID
 * @param {String} username - The speaker's username
 * @param {VoiceChannel} voiceChannel - The voice channel the message was spoken in
 * @param {Client} client - The client
 */
async function HandleCallResponse(message, userId, username, voiceChannel, client){
  if (!voiceChannel) return;
  if(!(await CheckImplicitAddressing(message, username))) return;
    
  const response =  await GetResponse(message, username, 'dm', userId);
  if (!response || typeof response !== "string") return;

  const filePath = await HandleTTSResponse(response)
  if (!filePath) return;

  PushToAudioQueue(filePath, voiceChannel, userId);
  PlayNextAudio(client, userId)
    
  return;  
}


function GetClientVoiceData(client) {
  for (const guild of client.guilds.cache.values()) {
    const connection = getVoiceConnection(guild.id);
    if (connection && connection.joinConfig.channelId) {
      const voiceChannel = guild.channels.cache.get(connection.joinConfig.channelId);
      return { connection, voiceChannel };
    }
  }
  return null;
};


module.exports = {
  HandleTTSResponse,
  ClearTemporaryAudioFiles,
  PushToAudioQueue,
  PlayNextAudio,
  JoinVoiceChannel,
  CreateListeningStream,
  TranscribeAudio,
  GetClientVoiceData,
  HandleVoiceCallInput
};
  

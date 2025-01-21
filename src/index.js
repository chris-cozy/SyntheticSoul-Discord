/**
 * @author Cozy
 * @version 3.0.0
 * @link https://discord.js.org/#/
 * @link https://mongoosejs.com/docs/
 * @link https://canvacord.js.org/docs/
 * @link https://discordjs.guide/miscellaneous/useful-packages.html#day-js
 */
const dotenv = require("dotenv");
dotenv.config();
const { Client, IntentsBitField } = require("discord.js");
const eventHandler = require("./handlers/eventHandler");

//-----SETUP-----//
const client = new Client({
  // Information the bot needs to recieve
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    // Needed for canvacord status
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.DirectMessageTyping
  ],
});

// Immediately invoked function, made async to wait for database connection
(async () => {
  try {
    eventHandler(client);
    client.login(process.env.TOKEN);
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();

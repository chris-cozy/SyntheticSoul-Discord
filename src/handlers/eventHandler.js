const {GetAllFiles} = require("../utils/fileHelpers");
const path = require('path');
const { Client } = require('discord.js');

/**
 * @brief Handle files/directories in events directory. Extract files from each event subdir,
 * then run the module when the named event occurs.
 * @param {Client} client - The bot
 */
module.exports = (client) => {
    // Targeting events directory, grabbing subdirs
    const eventFolders = GetAllFiles(path.join(__dirname, '..', 'events'), true);

    // Extract files from each subdir
    for (const eventFolder of eventFolders) {
        const eventFiles = GetAllFiles(eventFolder);

        // Sort in alphabetical order
        eventFiles.sort((a, b) => a > b);

        // Replace all \\ with / (windows OS), then remove them to get event name
        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();
        const discordEventName = eventName === "ready" ? "clientReady" : eventName;

        // Extract function/module from each file in event
        client.on(discordEventName, async (arg) => {
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile);

                // Run function, passing in any necessary arguments
                await eventFunction(client, arg)
            }
        })
    }
}

const getAllFiles = require("../utils/getAllFiles")
const path = require('path');

/**
 * Handles files/directories in events directory
 * @param {client} client - The bot
 */
module.exports = (client) => {
    // Targeting events directory, grabbing subdirs
    const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

    // Extract files from each subdir
    for (const eventFolder of eventFolders) {
        const eventFiles = getAllFiles(eventFolder);

        // Sort in alphabetical order
        eventFiles.sort((a, b) => a > b);

        // Replace all \\ with / (windows OS), then remove them to get event name
        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();

        // Extract function/module from each file in event
        client.on(eventName, async (arg) => {
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile);

                // Run function, passing in any necessary arguments
                await eventFunction(client, arg)
            }
        })
    }
}
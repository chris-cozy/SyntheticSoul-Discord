const path = require('path');
const getAllFiles = require('./getAllFiles');

/**
 * @brief Grab local commands (src)
 * @param {List} exceptions - List of command names to skip over
 * @returns List of local commmand objects
 */
module.exports = (exceptions = []) => {
    let localCommands = [];

    // Grab all subdirs of command directory
    const commandCategories = getAllFiles(
        path.join(__dirname, '..', 'commands'),
        true
    )

    for (const commandCategory of commandCategories) {
        const commandFiles = getAllFiles(commandCategory);

        // Create a require() object for each file in command category
        for (const commandFile of commandFiles) {
            const commandObject = require(commandFile);

            // Ignore commands in exceptions
            if (exceptions.includes(commandObject.name)) {
                continue;
            }
            localCommands.push(commandObject);
        }
    }
    return localCommands;
};
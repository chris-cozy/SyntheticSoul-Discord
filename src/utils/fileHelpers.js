const fs = require('fs');
const path = require('path');
const { Client } = require('discord.js');

/**
 * @brief Grab file paths or subdir paths in a directory
 * @param {String} directory - Directory path to search
 * @param {Boolean} foldersOnly - Determine if only return subdirs
 * @returns Array of file paths or subdir paths (Array)
 */
export const GetAllFiles = (directory, foldersOnly = false) => {
    let fileNames = [];

    // Create array all files in directory, with filetype included
    const files = fs.readdirSync(directory, { withFileTypes: true });

    for (const file of files) {
        // Create path to current file
        const filePath = path.join(directory, file.name);

        // Add filepaths to array
        if (foldersOnly) {
            if (file.isDirectory()) {
                fileNames.push(filePath)
            }
        } else {
            if (file.isFile()) {
                fileNames.push(filePath);
            }
        }
    }

    return fileNames;
}

/**
* @brief Grab commands for the application.
* @param {Client} client 
* @param {int} guildId 
* @returns List of commands (Array)
*/
export const GetApplicationCommands = async (client, guildId) => {
   let applicationCommands;

   // If application in a discord server, grab those commands.
   // If not, grab global commands
   if (guildId) {
       const guild = await client.guilds.fetch(guildId);
       applicationCommands = guild.commands;
   } else {
       applicationCommands = await client.application.commands;
   }

   await applicationCommands.fetch();

   return applicationCommands;
}


/**
 * @brief Check if commands are different
 * @param {object} existingCommand - Command object
 * @param {object} localCommand - Command object
 * @returns whether the commands are different (boolean)
 */
export const AreCommandsDifferent = (existingCommand, localCommand) => {
    // Check if the choices are different
    const areChoicesDifferent = (existingChoices, localChoices) => {
        for (const localChoice of localChoices) {
            const existingChoice = existingChoices?.find(
                (choice) => choice.name === localChoice.name
            );

            // Check if there is not an existing command that matches
            if (!existingChoice) {
                return true;
            }

            // Check if the two commands don't have the same value
            if (localChoice.value !== existingChoice.value) {
                return true;
            }
        }
        return false;
    };

    // Check if the choices are different
    const areOptionsDifferent = (existingOptions, localOptions) => {
        for (const localOption of localOptions) {
            const existingOption = existingOptions?.find(
                (option) => option.name === localOption.name
            );

            if (!existingOption) {
                return true;
            }

            if (
                localOption.description !== existingOption.description ||
                localOption.type !== existingOption.type ||
                (localOption.required || false) !== existingOption.required ||
                (localOption.choices?.length || 0) !==
                (existingOption.choices?.length || 0) ||
                areChoicesDifferent(
                    localOption.choices || [],
                    existingOption.choices || []
                )
            ) {
                return true;
            }
        }
        return false;
    };

    // Checks if the description is the same, or if the options have changed
    if (
        existingCommand.description !== localCommand.description ||
        existingCommand.options?.length !== (localCommand.options?.length || 0) ||
        areOptionsDifferent(existingCommand.options, localCommand.options || [])
    ) {
        return true;
    }

    return false;
};


/**
 * @brief Grab local commands (src)
 * @param {List} exceptions - List of command names to skip over
 * @returns List of local commmand objects
 */
export const GetLocalCommands = (exceptions = []) => {
    let localCommands = [];

    // Grab all subdirs of command directory
    const commandCategories = GetAllFiles(
        path.join(__dirname, '..', 'commands'),
        true
    )

    for (const commandCategory of commandCategories) {
        const commandFiles = GetAllFiles(commandCategory);

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
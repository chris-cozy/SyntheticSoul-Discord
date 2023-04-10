/**
 * Grab commands for the application.
 * @param {*} client 
 * @param {int} guildId 
 * @returns Array of commands
 */
module.exports = async (client, guildId) => {
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
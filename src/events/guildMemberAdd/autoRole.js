const { Client, GuildMember } = require('discord.js');
const autoRole = require('../../schemas/autorole');

/**
 * @brief Add autorole to member on add
 * @param {Client} client 
 * @param {GuildMember} member 
 */
module.exports = async (client, member) => {
    try {
        let guild = member.guild;
        if (!guild) {
            return;
        }
        const role = await autoRole.findOne({ guildId: guild.id });

        // If no autorole entry
        if (!role) {
            return;
        }

        await member.roles.add(role.roleId);
    } catch (error) {
        console.log(`there was an error: $${error}`);
    }
}
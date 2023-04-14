const { Client, Interaction, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const userLevel = require('../../schemas/level');
const canvacord = require('canvacord');
const calculateXpForLevel = require('../../utils/calculateXpForLevel');

module.exports = {
    name: 'level',
    description: "display a user's level",
    options: [
        {
            name: 'target-user',
            description: 'the user whose level you wish to display',
            type: ApplicationCommandOptionType.Mentionable
        }
    ],

    /**
     * @brief Check a user's level, sending a rank card
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        await interaction.deferReply();

        // Check if command was run in a server
        if (!interaction.inGuild()) {
            interaction.editReply(`you can only run this command in a server silly`);
            return;
        }

        // If mentioned user provided, set target user to their id. If not, set it to the user's id
        const mentionedUserId = interaction.options.get('target-user')?.value;
        const targetUserId = mentionedUserId || interaction.member.id;
        const targetUserObject = await interaction.guild.members.fetch(targetUserId);

        // Find user's entry in the database
        const fetchedUser = await userLevel.findOne({
            userId: targetUserId,
            guildId: interaction.guild.id
        });

        // If user does not have a db entry
        if (!fetchedUser) {
            // Check if mentioned user exists, and alter message accordingly
            interaction.editReply(
                mentionedUserId ? `${targetUserObject.user.tag} doesn't have any levels yet, they should talk to me moree` : "you don't have any levels yet, you should talk to me moree"
            );
            return;
        }

        let allUsers = await userLevel.find({ guildId: interaction.guild.id }).select('-_id userId level xp');
        // Sort all users by level and xp
        allUsers.sort((a, b) => {
            if (a.level === b.level) {
                return b.xp - a.xp;
            } else {
                return b.level - a.level;
            }
        });

        // Grab rank of desired user
        let currentRank = allUsers.findIndex((lvl) => lvl.userId === targetUserId) + 1;

        // Setup rank card
        const card = new canvacord.Rank()
            .setAvatar(targetUserObject.user.displayAvatarURL({ size: 256 }))
            .setRank(currentRank)
            .setLevel(fetchedUser.level)
            .setCurrentXP(fetchedUser.xp)
            .setRequiredXP(calculateXpForLevel(fetchedUser.level))
            //.setStatus(targetUserObject.presence.status)
            .setProgressBar('#46923c', 'COLOR')
            .setUsername(targetUserObject.user.username)
            .setDiscriminator(targetUserObject.user.discriminator)

        const data = await card.build();

        // Turn card into discord attachment
        const attachment = new AttachmentBuilder(data);
        interaction.editReply({ files: [attachment] });
    },
}
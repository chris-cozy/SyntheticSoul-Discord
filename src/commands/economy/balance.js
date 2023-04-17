const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const userBalance = require('../../schemas/balance');

const dailyAmount = 100;

module.exports = {
    name: 'balance',
    description: "check a user's balance",
    options: [
        {
            name: 'target-user',
            description: "user who's balance you want to check",
            type: ApplicationCommandOptionType.Mentionable
        }
    ],

    /**
     * @brief Send an embed with a user's balance information
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        // Check if command was run in a server
        if (!interaction.inGuild()) {
            interaction.editReply({ content: `you can only run this command in a server silly` });
            return;
        }

        // If mentioned user provided, set target user to their id. If not, set it to the user's id
        const mentionedUserId = interaction.options.get('target-user')?.value;
        const targetUserId = mentionedUserId || interaction.member.id;
        const targetUserObject = await interaction.guild.members.fetch(targetUserId);

        try {
            // Find user's entry in the database
            const fetchedUser = await userBalance.findOne({
                userId: targetUserId,
                guildId: interaction.guild.id
            });

            // If user does not have a db entry
            if (!fetchedUser) {
                // Check if mentioned user exists, and alter message accordingly
                interaction.editReply(
                    mentionedUserId ? `**${targetUserObject.user.tag}** doesn't have a balance..` : "**you** don't have a balance yet.. run '/daily' to set one up"
                );
                return;
            }

            const embed = new EmbedBuilder();

            // Check if a target was mentioned or not
            if (mentionedUserId) {
                embed
                    .setTitle(targetUserObject.user.username)
                    .setColor('Random')
                    .addFields(
                        {
                            name: 'balance',
                            value: `${fetchedUser.balance}`,
                            inline: true
                        },
                        {
                            name: 'last daily collect',
                            value: `${fetchedUser.lastDailyCollect.toDateString()}`,
                            inline: true
                        },
                    )
                    .setThumbnail(targetUserObject.user.displayAvatarURL())
                    .setTimestamp()
                    .setFooter({ text: `requested by ${interaction.user.tag} `, iconURL: `${interaction.user.displayAvatarURL()}` });
            } else {
                embed
                    .setTitle(targetUserObject.user.username)
                    .setColor('Random')
                    .addFields(
                        {
                            name: 'balance',
                            value: `${fetchedUser.balance}`,
                            inline: true
                        },
                        {
                            name: 'last daily collect',
                            value: `${fetchedUser.lastDailyCollect.toDateString()}`,
                            inline: true
                        },
                    )
                    .setThumbnail(targetUserObject.user.displayAvatarURL())
                    .setTimestamp()
                    .setFooter({ text: `requested by ${interaction.user.tag} `, iconURL: `${interaction.user.displayAvatarURL()}` });
            }

            interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.log(`there was an error: $${error}`);
        }
    },
}
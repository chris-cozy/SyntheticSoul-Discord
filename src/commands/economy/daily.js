const { Client, Interaction, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const userBalance = require('../../schemas/balance');

const dailyAmount = 100;

module.exports = {
    name: 'daily',
    description: "collect daily allowance",

    /**
     * @brief Add daily allowance to user balance
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

        try {
            let query = {
                userId: interaction.member.id,
                guildId: interaction.guild.id,
            };

            let user = await userBalance.findOne(query);

            // If user exists, grab dates and check relevance, then update collect date. 
            // If not, add new user balance entry.
            if (user) {
                const lastDailyCollectDate = user.lastDailyCollect.toDateString();
                const currentDate = new Date().toDateString();

                if (lastDailyCollectDate === currentDate) {
                    interaction.editReply({ content: "you've already collected your dailys, don't be greedy.." });
                    return;
                }

                user.lastDailyCollect = new Date();

            } else {
                user = new userBalance({
                    ...query,
                    lastDailyCollect: new Date(),
                })
            }

            // Update database
            user.balance += dailyAmount;
            await user.save();

            interaction.editReply({ content: `your daily allowance of **${dailyAmount}** was collected, and your new balance is **${user.balance}**!` });

        } catch (error) {
            console.log(`there was an error: $${error}`);
        }
    },
}
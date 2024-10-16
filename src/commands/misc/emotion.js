const { EmbedBuilder } = require("discord.js");
const { Client, Interaction } = require("discord.js");
const { Users, Self } = require("../../schemas/users");

module.exports = {
  name: "emotion",
  description: "information about the program's emotional status",
  devonly: false,
  testOnly: false,
  deleted: false,

  /**
   * @brief Send an embed with bot emotiong information
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    let self = await grabSelf(process.env.BOT_NAME);

    async function grabSelf(agentName) {
      let self = await Self.findOne({ name: agentName });

      if (!self) {
        self = new Self({
          name: process.env.BOT_NAME,
          personality_matrix: JSON.parse(process.env.BOT_PERSONALITY_MATRIX),
        });

        await self.save();
        self = await Self.findOne({ name: agentName });
      }
      return self;
    }

    try {
        
      let embed = new EmbedBuilder()
        .setTitle(client.user.username)
        .setColor("Random")
        .setDescription(self.emotional_status.reason)
        .setURL("https://github.com/chris-cozy/SyntheticSoul-Discord")
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setFooter({
          text: `requested by ${interaction.user.tag} `,
          iconURL: `${interaction.user.displayAvatarURL()}`,
        });

      const emotions = self.emotional_status.emotions.toObject();
      Object.entries(emotions).forEach(([emotion, data]) => {
        if (self.emotional_status.emotions[emotion].value >= 0) {
          embed.addFields({ name: emotion, value: `${self.emotional_status.emotions[emotion].value}`, inline: true });
        }
      });

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.log(`there was an error: ${error}`);
    }
  },
};

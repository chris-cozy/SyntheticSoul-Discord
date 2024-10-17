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
    let self = await GrabSelf(process.env.BOT_NAME);

    async function GrabSelf(agentName) {
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

    let embed;

    try {
        
      embed = new EmbedBuilder()
        .setTitle(`${client.user.username}'s current emotions`)
        .setColor("Random")
        .setURL("https://github.com/chris-cozy/SyntheticSoul-Discord")
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setFooter({
          text: `requested by ${interaction.user.username} `,
          iconURL: `${interaction.user.displayAvatarURL()}`,
        });
        
      const emotions = self.emotional_status.emotions.toObject();
      for (const emotion in emotions) {
        // Skip the _id field, as it's not an emotion
        if (emotion === "_id") continue;
      
        const value = emotions[emotion].value;
        console.log(`${emotion}: ${value}`);
        embed.addFields({ name: `${emotion}`, value: value.toString(), inline: true });
      }
      interaction.reply({ embeds: [embed] });

    } catch (error) {
      interaction.reply({ embeds: [embed] });
      console.log(`Error - ${error}`);
    }
  },
};

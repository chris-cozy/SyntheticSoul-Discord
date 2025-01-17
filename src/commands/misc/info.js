const { EmbedBuilder } = require("discord.js");
const { Client, Interaction } = require("discord.js");
const { FormatDate } = require("../../utils/logicHelpers");

module.exports = {
  name: "info",
  description: "information about bot",
  devonly: false,
  testOnly: false,
  deleted: false,

  /**
   * @brief Send an embed with program information
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    try {
      const embed = new EmbedBuilder()
        .setTitle(client.user.username)
        .setColor("Random")
        .setDescription( "˚｡⋆୨୧˚  i'm just a girl  ˚୨୧⋆ ｡˚")
        .setURL("https://github.com/chris-cozy/SyntheticSoul-Discord")
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setFooter({
          text: `requested by ${interaction.user.username} `,
          iconURL: `${interaction.user.displayAvatarURL()}`,
        });

        // Call endpoint to get agent information
        /*
        embed.addFields({name: 'Self Identity', value: `${self.identity}`, inline: false});
      embed.addFields({name: `Latest Thought: ${FormatDate(self.latest_thought.timestamp)}`, value: `${self.latest_thought.thought}`, inline: false});
      */

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.log(`Error - ${error.message}`);
    }
  },
};

const { EmbedBuilder } = require("discord.js");
const { Client, Interaction } = require("discord.js");
const { Users, Self } = require("../../schemas/users");
const {GrabSelf, GrabUser, GetConversationSnippet} = require("../../services/mongoService");

module.exports = {
  name: "self",
  description: "information on the program's perception of you",
  devonly: false,
  testOnly: false,
  deleted: false,

  /**
   * @brief Send an embed with program's perception of you
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    let user = await GrabUser(interaction.user.id);
    let embed;

    try {
        
      embed = new EmbedBuilder()
        .setTitle(`${client.user.username}'s perception of ${interaction.user.username}`)
        .setColor("Random")
        .setURL("https://github.com/chris-cozy/SyntheticSoul-Discord")
        .setThumbnail(interaction.user.displayAvatarURL())
        .setTimestamp()
        .setFooter({
          text: `requested by ${interaction.user.username} `,
          iconURL: `${interaction.user.displayAvatarURL()}`,
        });
        
        embed.addFields({ name: `Intrinsic Relationship`, value: user.intrinsic_relationship, inline: false });
        embed.addFields({ name: `Extrinsic Relationship`, value: user.extrinsic_relationship, inline: false });
        embed.addFields({ name: `Summary`, value: user.summary, inline: false });
      interaction.reply({ embeds: [embed] });

    } catch (error) {
      interaction.reply({ embeds: [embed] });
      console.log(`Error - ${error.message}`);
    }
  },
};

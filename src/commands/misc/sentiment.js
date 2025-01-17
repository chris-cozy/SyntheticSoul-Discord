const { EmbedBuilder } = require("discord.js");
const { Client, Interaction } = require("discord.js");

module.exports = {
  name: "sentiment",
  description: "information on the program's sentiment towards you",
  devonly: false,
  testOnly: false,
  deleted: false,

  /**
   * @brief Send an embed with sentiment information
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    try {
        
      const embed = new EmbedBuilder()
        .setTitle(`${client.user.username}'s sentiment towards ${interaction.user.username}`)
        .setColor("Random")
        .setURL("https://github.com/chris-cozy/SyntheticSoul-Discord")
        .setThumbnail(interaction.user.displayAvatarURL())
        .setTimestamp()
        .setFooter({
          text: `requested by ${interaction.user.username} `,
          iconURL: `${interaction.user.displayAvatarURL()}`,
        });
        
        // TODO: Call Endpoint to get sentiment information
        /*
        const sentiments = user.sentiment_status.sentiments.toObject();
      for (const sentiment in sentiments) {
        // Skip the _id field, as it's not an emotion
        if (sentiment === "_id") continue;
      
        const value = sentiments[sentiment].value;
        console.log(`${sentiment}: ${value}`);
        embed.addFields({ name: `${sentiment}`, value: value.toString(), inline: true });
      }
        */
      interaction.reply({ embeds: [embed] });

    } catch (error) {
      interaction.reply({ embeds: [embed] });
      console.log(`Error - ${error.message}`);
    }
  },
};

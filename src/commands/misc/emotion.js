const { EmbedBuilder } = require("discord.js");
const { Client, Interaction } = require("discord.js");
const { getActiveAgent } = require("../../utils/syntheticSoulService");
const { deferInteractionReply, sendInteractionReply } = require("../../utils/interactionHelpers");

module.exports = {
  name: "emotion",
  description: "show live emotional metrics for the active agent",
  devonly: false,
  testOnly: false,
  deleted: false,

  /**
   * @brief Send an embed with the agent's emotional information.
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    await deferInteractionReply(interaction);

    try {
      const agent = await getActiveAgent(interaction.user.id, interaction.user.username);
      const emotions = agent?.emotional_status?.emotions || {};

      const embed = new EmbedBuilder()
        .setTitle(`${client.user.username}'s current emotions`)
        .setColor("Random")
        .setURL("https://github.com/chris-cozy/SyntheticSoul-Discord")
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setFooter({
          text: `requested by ${interaction.user.username}`,
          iconURL: `${interaction.user.displayAvatarURL()}`,
        });

      const entries = Object.entries(emotions)
        .filter(([, value]) => value && typeof value === "object" && Number.isFinite(value.value))
        .slice(0, 12);

      if (!entries.length) {
        embed.setDescription("No emotional metrics were returned by the API.");
      } else {
        for (const [emotion, value] of entries) {
          embed.addFields({ name: emotion, value: String(value.value), inline: true });
        }
      }

      await sendInteractionReply(interaction, { embeds: [embed] });
    } catch (error) {
      await sendInteractionReply(interaction, `Unable to load emotional status right now: ${error.message}`);
    }
  },
};

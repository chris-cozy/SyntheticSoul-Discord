const { EmbedBuilder } = require("discord.js");
const { Client, Interaction } = require("discord.js");
const { getConversation } = require("../../utils/syntheticSoulService");
const { deferInteractionReply, sendInteractionReply } = require("../../utils/interactionHelpers");

module.exports = {
  name: "sentiment",
  description: "show conversation context status for your current identity",
  devonly: false,
  testOnly: false,
  deleted: false,

  /**
   * @brief Send an embed with conversation-context status.
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    await deferInteractionReply(interaction);

    try {
      const conversation = await getConversation(interaction.user.id, interaction.user.username);
      const messages = Array.isArray(conversation?.messages) ? conversation.messages : [];
      const latest = messages.length ? messages[messages.length - 1] : null;

      const embed = new EmbedBuilder()
        .setTitle(`${client.user.username}'s context for ${interaction.user.username}`)
        .setColor("Random")
        .setURL("https://github.com/chris-cozy/SyntheticSoul-Discord")
        .setThumbnail(interaction.user.displayAvatarURL())
        .addFields(
          { name: "Conversation ID", value: `\`${conversation?.id || "unknown"}\``, inline: false },
          { name: "Total Messages", value: `\`${messages.length}\``, inline: true },
          { name: "Last Message Role", value: `\`${latest ? (latest.from_agent ? "assistant" : "user") : "n/a"}\``, inline: true }
        )
        .setTimestamp()
        .setFooter({
          text: `requested by ${interaction.user.username}`,
          iconURL: `${interaction.user.displayAvatarURL()}`,
        });

      if (!messages.length) {
        embed.setDescription("No stored conversation history found yet for this identity.");
      }

      await sendInteractionReply(interaction, { embeds: [embed] });
    } catch (error) {
      await sendInteractionReply(interaction, `Unable to read conversation context: ${error.message}`);
    }
  },
};

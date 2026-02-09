const { EmbedBuilder } = require("discord.js");
const { Client, Interaction } = require("discord.js");
const { getAuthMe, getConversation } = require("../../utils/syntheticSoulService");
const { deferInteractionReply, sendInteractionReply } = require("../../utils/interactionHelpers");

module.exports = {
  name: "self",
  description: "show your current Synthetic Soul identity and conversation stats",
  devonly: false,
  testOnly: false,
  deleted: false,

  /**
   * @brief Send an embed with the program's perception/session info.
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    await deferInteractionReply(interaction);

    try {
      const me = await getAuthMe(interaction.user.id, interaction.user.username);
      const conversation = await getConversation(interaction.user.id, interaction.user.username).catch(() => null);
      const messageCount = Array.isArray(conversation?.messages) ? conversation.messages.length : 0;

      const embed = new EmbedBuilder()
        .setTitle(`${client.user.username}'s profile for ${interaction.user.username}`)
        .setColor("Random")
        .setURL("https://github.com/chris-cozy/SyntheticSoul-Discord")
        .setThumbnail(interaction.user.displayAvatarURL())
        .addFields(
          { name: "API Username", value: `\`${me.username || "unknown"}\``, inline: true },
          { name: "Session ID", value: `\`${me.sid || "unknown"}\``, inline: true },
          { name: "Auth Type", value: `\`${me.authType || "unknown"}\``, inline: true },
          { name: "Messages in Conversation", value: `\`${messageCount}\``, inline: true }
        )
        .setTimestamp()
        .setFooter({
          text: `requested by ${interaction.user.username}`,
          iconURL: `${interaction.user.displayAvatarURL()}`,
        });

      await sendInteractionReply(interaction, { embeds: [embed] });
    } catch (error) {
      await sendInteractionReply(interaction, `Unable to load profile right now: ${error.message}`);
    }
  },
};

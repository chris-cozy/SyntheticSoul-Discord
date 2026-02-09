/**
 * @brief Defer a slash command response with guild-only ephemeral visibility.
 * @param {import('discord.js').Interaction} interaction
 */
async function deferInteractionReply(interaction) {
  const deferOptions = interaction.inGuild() ? { ephemeral: true } : {};
  await interaction.deferReply(deferOptions);
}

/**
 * @brief Safely send the final interaction response.
 * @param {import('discord.js').Interaction} interaction
 * @param {string|object} payload
 */
async function sendInteractionReply(interaction, payload) {
  const normalizedPayload = typeof payload === "string" ? { content: payload } : payload;
  const guildReplyPayload = interaction.inGuild()
    ? { ephemeral: true, ...normalizedPayload }
    : normalizedPayload;

  try {
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply(normalizedPayload);
      return;
    }

    await interaction.reply(guildReplyPayload);
  } catch (error) {
    try {
      await interaction.followUp(guildReplyPayload);
    } catch (followUpError) {
      console.error("Error - sendInteractionReply:", followUpError.message);
      throw error;
    }
  }
}

module.exports = {
  deferInteractionReply,
  sendInteractionReply,
};

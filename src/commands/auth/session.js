const { Client, Interaction } = require("discord.js");
const { getStoredSession, getAuthMe } = require("../../utils/syntheticSoulService");
const { deferInteractionReply, sendInteractionReply } = require("../../utils/interactionHelpers");

module.exports = {
  name: "session",
  description: "Show your current Synthetic Soul session status",
  devOnly: false,
  testOnly: false,
  deleted: false,

  /**
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    await deferInteractionReply(interaction);

    try {
      const session = getStoredSession(interaction.user.id);
      if (!session) {
        await sendInteractionReply(interaction, "No session found. Send a message to start a guest session or use /login.");
        return;
      }

      const me = await getAuthMe(interaction.user.id, interaction.user.username);
      const expiresInSec = Math.max(0, Math.floor((Number(session.expiresAt || 0) - Date.now()) / 1000));

      await sendInteractionReply(interaction, [
        `Auth type: \`${session.authType || "unknown"}\``,
        `API username: \`${me.username || session.apiUsername || "unknown"}\``,
        `Session id: \`${me.sid || "unknown"}\``,
        `Access token TTL: \`${expiresInSec}s\``,
      ].join("\n"));
    } catch (error) {
      await sendInteractionReply(interaction, `Failed to read session: ${error.message}`);
    }
  },
};

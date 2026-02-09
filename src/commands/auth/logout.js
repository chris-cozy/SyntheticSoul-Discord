const { Client, Interaction } = require("discord.js");
const { logout } = require("../../utils/syntheticSoulService");
const { deferInteractionReply, sendInteractionReply } = require("../../utils/interactionHelpers");

module.exports = {
  name: "logout",
  description: "Sign out and clear your local bot session",
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
      await logout(interaction.user.id);
      await sendInteractionReply(interaction, "Signed out. Your local bot session was cleared.");
    } catch (error) {
      await sendInteractionReply(interaction, `Logout encountered an error: ${error.message}`);
    }
  },
};

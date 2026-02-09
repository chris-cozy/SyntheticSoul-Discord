const { Client, Interaction } = require("discord.js");
const { createGuest } = require("../../utils/syntheticSoulService");
const { deferInteractionReply, sendInteractionReply } = require("../../utils/interactionHelpers");

module.exports = {
  name: "guest",
  description: "Start a new guest session with Synthetic Soul",
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
      const session = await createGuest(interaction.user.id, interaction.user.username);
      await sendInteractionReply(interaction, 
        `Guest session created as \`${session.apiUsername}\`. Your Discord messages are now linked to this guest identity.`
      );
    } catch (error) {
      await sendInteractionReply(interaction, `Failed to create guest session: ${error.message}`);
    }
  },
};

const { ApplicationCommandOptionType, Client, Interaction } = require("discord.js");
const { claim } = require("../../utils/syntheticSoulService");
const { deferInteractionReply, sendInteractionReply } = require("../../utils/interactionHelpers");

module.exports = {
  name: "claim",
  description: "Upgrade your current guest session into a registered account",
  devOnly: false,
  testOnly: false,
  deleted: false,
  options: [
    {
      name: "email",
      description: "Email for the new account",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "username",
      description: "New account username",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "password",
      description: "New account password",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  /**
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    await deferInteractionReply(interaction);

    const email = interaction.options.getString("email", true);
    const username = interaction.options.getString("username", true);
    const password = interaction.options.getString("password", true);

    try {
      const session = await claim(interaction.user.id, interaction.user.username, email, username, password);
      await sendInteractionReply(interaction, 
        `Guest account upgraded successfully. You are now signed in as \`${session.apiUsername}\`.`
      );
    } catch (error) {
      await sendInteractionReply(interaction, `Claim failed: ${error.message}`);
    }
  },
};

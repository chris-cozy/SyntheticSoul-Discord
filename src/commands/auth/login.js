const { ApplicationCommandOptionType, Client, Interaction } = require("discord.js");
const { login } = require("../../utils/syntheticSoulService");
const { deferInteractionReply, sendInteractionReply } = require("../../utils/interactionHelpers");

module.exports = {
  name: "login",
  description: "Sign in to an existing Synthetic Soul account",
  devOnly: false,
  testOnly: false,
  deleted: false,
  options: [
    {
      name: "email",
      description: "Account email",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "password",
      description: "Account password",
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
    const password = interaction.options.getString("password", true);

    try {
      const session = await login(interaction.user.id, interaction.user.username, email, password);
      await sendInteractionReply(
        interaction,
        `Signed in successfully as \`${session.apiUsername}\`. Your conversation history will continue under this account.`
      );
    } catch (error) {
      await sendInteractionReply(interaction, `Login failed: ${error.message}`);
    }
  },
};

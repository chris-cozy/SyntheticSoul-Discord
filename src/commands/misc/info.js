const { EmbedBuilder } = require("discord.js");
const { Client, Interaction } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const { Users, Self } = require("../../schemas/users");
const { FormatDate } = require("../../utils/logicHelpers");

module.exports = {
  name: "info",
  description: "information about bot",
  devonly: false,
  testOnly: false,
  deleted: false,

  /**
   * @brief Send an embed with bot information
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    //await interaction.deferReply();

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    let self = await GrabSelf(process.env.BOT_NAME);

    async function GrabSelf(agentName) {
      let self = await Self.findOne({ name: agentName });

      if (!self) {
        self = new Self({
          name: process.env.BOT_NAME,
          personality_matrix: JSON.parse(process.env.BOT_PERSONALITY_MATRIX),
        });

        await self.save();
        self = await Self.findOne({ name: agentName });
      }
      return self;
    }

    try {
      const embed = new EmbedBuilder()
        .setTitle(client.user.username)
        .setColor("Random")
        .setDescription( "˚｡⋆୨୧˚  i'm just a girl  ˚୨୧⋆ ｡˚")
        .setURL("https://github.com/chris-cozy/SyntheticSoul-Discord")
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setFooter({
          text: `requested by ${interaction.user.username} `,
          iconURL: `${interaction.user.displayAvatarURL()}`,
        });

        embed.addFields({name: 'Self Identity', value: `${self.identity}`, inline: false});
      embed.addFields({name: `Latest Thought: ${FormatDate(self.latest_thought.timestamp)}`, value: `${self.latest_thought.thought}`, inline: false});

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.log(`there was an error: ${error}`);
    }
  },
};

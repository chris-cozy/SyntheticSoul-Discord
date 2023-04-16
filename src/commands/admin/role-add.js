const { Client, Colors, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'role-add',
    description: "add a role for this server",
    options: [
        {
            name: 'name',
            description: "the role name",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'color',
            description: "the role color",
            type: ApplicationCommandOptionType.Number,
            required: true,
            choices: [
                {
                    name: 'White',
                    value: Colors.White,
                },
                {
                    name: 'Aqua',
                    value: Colors.Aqua,
                },
                {
                    name: 'Green',
                    value: Colors.Green,
                },
                {
                    name: 'Blue',
                    value: Colors.Blue,
                },
                {
                    name: 'Yellow',
                    value: Colors.Yellow,
                },
                {
                    name: 'Purple',
                    value: Colors.Purple,
                },
                {
                    name: 'Luminous Vivid Pink',
                    value: Colors.LuminousVividPink,
                },
                {
                    name: 'Fuchsia',
                    value: Colors.Fuchsia,
                },
                {
                    name: 'Gold',
                    value: Colors.Gold,
                },
                {
                    name: 'Orange',
                    value: Colors.Orange,
                },
                {
                    name: 'Red',
                    value: Colors.Red,
                },
                {
                    name: 'Grey',
                    value: Colors.Grey,
                },
                {
                    name: 'Navy',
                    value: Colors.Navy,
                },
                {
                    name: 'Dark Aqua',
                    value: Colors.DarkAqua,
                },
                {
                    name: 'Dark Green',
                    value: Colors.DarkGreen,
                },
                {
                    name: 'Dark Blue',
                    value: Colors.DarkBlue,
                },
                {
                    name: 'Dark Purple',
                    value: Colors.DarkPurple,
                },
                {
                    name: 'Dark Vivid Pink',
                    value: Colors.DarkVividPink,
                },
                {
                    name: 'Dark Orange',
                    value: Colors.DarkOrange,
                },
                {
                    name: 'Dark Red',
                    value: Colors.DarkRed,
                },
                {
                    name: 'Dark Grey',
                    value: Colors.DarkGrey,
                },
                {
                    name: 'Light Grey',
                    value: Colors.LightGrey,
                },
                {
                    name: 'Blurple',
                    value: Colors.Blurple,
                },
                {
                    name: 'Greyple',
                    value: Colors.Greyple,
                },
                {
                    name: 'Not quite Black',
                    value: Colors.NotQuiteBlack,
                }
            ]
        },
        {
            name: 'reason',
            description: 'the reason behind adding the role',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.ManageRoles],

    /**
     * @brief Allow user to add a role to the server
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const roleName = interaction.options.get('name').value;
        const roleColor = interaction.options.get('color').value;
        const roleReason = interaction.options.get('reason').value;

        if (!interaction.inGuild()) {
            interaction.editReply("you can only run this command inside of a server..");
            return;
        }

        try {
            interaction.guild.roles.create({
                name: roleName,
                color: roleColor,
                reason: roleReason,
            })

            interaction.editReply(`you have successfully created the role **${roleName}**`);
        } catch (error) {
            console.log(`there was an error: $${error}`);
        }
    }
}
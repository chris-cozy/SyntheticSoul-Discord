const { EmbedBuilder } = require('discord.js');
/**
 * @brief Send embed with information about the 
 * bot
 */
module.exports = {
    name: 'info',
    description: 'information about bot',
    devonly: false,
    testOnly: false,
    deleted: false,

    callback: (client, interaction) => {
        //await interaction.deferReply();

        try {

            let verif;
            if (client.user.verified) {
                verif = 'true';
            } else {
                verif = 'false';
            }
            // Create embed to send
            const embed = new EmbedBuilder()
                .setTitle(client.user.username)
                //.setColor(client.user.accentColor)
                .setDescription(`an gpt-enabled discord assistant`)
                .setURL('https://discord.js.org/#/')
                .addFields(
                    {
                        name: 'presence',
                        value: `${client.user.presence.status}`,
                        inline: true
                    },
                    {
                        name: 'verified',
                        value: `${verif}`,
                        inline: true
                    },
                    {
                        name: 'tag',
                        value: `${client.user.tag}`,
                        inline: true
                    },
                    {
                        name: 'timestamp of creation',
                        value: `${client.user.createdAt}`
                    }
                )
                .setThumbnail(client.user.displayAvatarURL())
                .setTimestamp()
                .setFooter({ text: `requested by ${interaction.user.tag} `, iconURL: `${interaction.user.displayAvatarURL()}` });

            interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.log(`there was an error: ${error}`);
        }

    },
}
const { SlashCommandBuilder } = require('@discordjs/builders');

const commandName = 'setposition';
const commandDescription = 'Set channel position!';

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commandName)
        .setDescription(commandDescription)
        .addIntegerOption(option => {
            return option
                .setName('index')
                .setRequired(true)
                .setDescription('The position you want to move the channel to.')
        }),
    async execute(interaction) {
        const newChannelIndex = interaction.options.getInteger('index');
        const channelID = interaction.channelId;
        const channel = await interaction.member.guild.channels.fetch(channelID);

        await channel.setPosition(newChannelIndex)
            .catch(console.error);

        interaction.reply(`Position set to: ${newChannelIndex}.`);
    },
};
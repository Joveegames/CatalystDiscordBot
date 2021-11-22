const { SlashCommandBuilder } = require('@discordjs/builders');

const commandName = 'setposition';
const commandDescription = 'Set channel position!';
const commandContent = 'Set!';
// const commandOptions = [
//     name: 'index',

// ]

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commandName)
        .setDescription(commandDescription)
        .addIntegerOption(option => {
            return option
            .setName('index')
            .setRequired(true)
            .setDescription('The index of the position you want to move the channel to.')
        }),
    async execute(interaction) {

        const args = interaction.options;
        console.log('args: ');
        console.log(args);

        const newChannelIndex = interaction.options.getNumber('index');

        // const channelId = interaction.channel.id;
        const channelId = '889779700778536971';

        interaction.guild.channel.setPositions([{ channel: channelId, position: newChannelIndex }])
            .then(guild => console.log(`Updated channel positions for ${guild}`))
            .catch(console.error);

        await interaction.reply(commandContent);
    },
};
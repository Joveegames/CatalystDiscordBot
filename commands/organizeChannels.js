const { SlashCommandBuilder } = require('@discordjs/builders');

const commandName = 'organizechannels';
const commandDescription = 'Organize the channels in the given categorie alphabetically.';
const commandContent = 'Reorganized the channels alphabetically.';

const orderAlphabetically = (listOfObjects) => {
    return listOfObjects.sort((a, b) => a.name.localeCompare(b.name));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commandName)
        .setDescription(commandDescription)
        .addChannelOption(option => {
            return option
                .setName('category')
                .setRequired(true)
                .setDescription('Category under which the channels will be organized.')
        }),
    async execute(interaction) {
        const categoryId = interaction.options.getChannel('category').id;
        const channelsInCategory = interaction.client.channels.cache.filter(channel => channel.parentId === categoryId);
        const channelsOrdered = orderAlphabetically(channelsInCategory);

        var jsonArr = [];
        let index = 0;
        channelsOrdered.forEach((element) => {
            jsonArr.push({
                channel: element.id,
                position: index
            });
            ++index;
        });

        interaction.member.guild.channels.setPositions(jsonArr)
            .catch(console.error);

        await interaction.reply(commandContent);
    },
};
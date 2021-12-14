const { SlashCommandBuilder } = require('@discordjs/builders');

const commandName = 'getchannels';
const commandDescription = 'Get all the channels and categories.';

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commandName)
        .setDescription(commandDescription),
    async execute(interaction) {
        var commandContent = '';

        const categories = interaction.client.channels.cache.filter(channel => channel.type === 'GUILD_CATEGORY');

        categories.forEach(category => {

            // console.log(`${category.name}:`);
            commandContent += `${category.name}:\n`;

            const categoryID = category.id;
            const channelsInCategory = interaction.client.channels.cache.filter(channel => channel.parentId === categoryID);
            channelsInCategory.forEach(channel => {

                // console.log(`    ${channel.name}`);
                commandContent += `    ${channel.name}\n`;
            })
        })

        await interaction.reply(commandContent);
    },
};
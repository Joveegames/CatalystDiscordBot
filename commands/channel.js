const { SlashCommandBuilder } = require('@discordjs/builders');
const { categories } = require('../resources/categories');

const commandName = 'channel';
const commandDescription = 'Creates a channel!';
const commandContent = 'Channel created.';

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commandName)
        .setDescription(commandDescription),
    async execute(interaction) {
        const username = interaction.user.username;

        interaction.guild.channels.create(username + '\'s channel', {
            type: 'text',
            topic: 'Bot set topic',
            parent: categories.BOTCREATEDCHANNELS,
            // permissionOverwrites: [
            //     {
            //         id: everyoneRole.id,
            //         deny: ['VIEW_CHANNEL'],
            //     },
            // ],
        })

        await interaction.reply(commandContent);
    },
};
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

const commandName = 'channel2';
const commandDescription = 'Create a channel under selected category.';
const commandContent = 'Test';

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commandName)
        .setDescription(commandDescription)
        .addChannelOption(option => {
            return option
                .setName('category')
                .setRequired(true)
                .setDescription('Category under which the channel will be created.')
        }),
    async execute(interaction) {
        const user = interaction.user;
        const username = user.username;
        const categoryId = interaction.options.getChannel('category');

        interaction.guild.channels.create(username + '\'s channel', {
            type: 'text',
            topic: 'Bot set topic',
            parent: categoryId,
            position: 0,
            permissionOverwrites: [
                {
                    id: user,
                    allow: [Permissions.FLAGS.MANAGE_MESSAGES],
                },
            ],
        })

        await interaction.reply(commandContent);
    }
};
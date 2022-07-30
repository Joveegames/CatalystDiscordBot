const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

const commandName = 'createchannelsfromlist';
const commandDescription = 'Create channels under selected category from a comma separated list of names.';
const commandContent = 'Channels created.';

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commandName)
        .setDescription(commandDescription)
        .addChannelOption(option => {
            return option
                .setName('category')
                .setRequired(true)
                .setDescription('Category under which the channel will be created.')
        })
        .addStringOption(option => {
            return option
            .setName('names')
            .setRequired(true)
            .setDescription('Comma separated list of channel names.')}),

    async execute(interaction) {
        const user = interaction.user;
        const categoryId = interaction.options.getChannel('category').id;
        const channelNames = interaction.options.getString('names');

        const channelNamesSplitted = channelNames.split(',');

        channelNamesSplitted.forEach(element => {
            console.log(element);

            interaction.guild.channels.create(element, {
                type: 'text',
                // topic: 'topic', // Optional
                parent: categoryId,
                // position: 0, // Optional
                permissionOverwrites: [
                    {
                        id: user,
                        allow: [Permissions.FLAGS.MANAGE_MESSAGES],
                    },
                ],
            })
        });

        await interaction.reply(commandContent);
    }
};
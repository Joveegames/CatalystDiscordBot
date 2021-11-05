const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

const { categories } = require('../resources/categories');

const commandName = 'channel';
const commandDescription = 'Creates a channel!';
const commandContent = 'Channel created.';

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commandName)
        .setDescription(commandDescription),
    async execute(interaction) {
        const user = interaction.user;
        const username = user.username;

        interaction.guild.channels.create(username + '\'s channel', {
            type: 'text',
            topic: 'Bot set topic',
            parent: categories.BOTCREATEDCHANNELS,

            permissionOverwrites: [
                {
                    id: user,
                    allow: [Permissions.FLAGS.MANAGE_MESSAGES],
                },
            ],
        })

        await interaction.reply(commandContent);
    },
};
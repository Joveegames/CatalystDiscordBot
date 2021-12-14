const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

const commandName = 'channel3';
const commandDescription = 'Create a channel under selected category.';

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commandName)
        .setDescription(commandDescription)
        .addIntegerOption(option => {
            return option
                .setName('fund')
                .setRequired(true)
                .setDescription('Which fund is the project under?')
        }),
    async execute(interaction) {
        const user = interaction.user;
        const username = user.username;
        const fundIndexString = interaction.options.getInteger('fund').toString();
        const newChannelName = `f${fundIndexString}-${username}'s-channel`;

        const selectedCategoryName = 'FUND ' + fundIndexString;
        const allChannels = interaction.client.channels.cache;

        // Get fund categories
        const categories = allChannels.filter(channel => channel.type === 'GUILD_CATEGORY');
        const fundCategories = categories.filter(category => category.name.startsWith('FUND '));

        // Check that we have such category
        const categoryId = fundCategories.find(category => category.name === selectedCategoryName).id;
        if (categoryId) {

            // Get channel names in the category
            const channelsInSelectedCategory = allChannels.filter(channel => channel.parentId === categoryId)
            const channelNames = channelsInSelectedCategory.map(channel => channel.name);

            // Add new channel name in to the list
            channelNames.push(newChannelName);

            // Order names alphabetically
            const namesSortedAlphabetically = channelNames.sort(function (a, b) {
                if (a < b) { return -1; }
                if (a > b) { return 1; }
                return 0;
            });

            // Create the channel
            const newChannelPosition = namesSortedAlphabetically.indexOf(newChannelName);
            interaction.guild.channels.create(newChannelName, {
                type: 'text',
                topic: 'Bot set topic',
                parent: categoryId,
                // position: newChannelPosition, // Doesn't work, have to do in the 'then' statement.
                permissionOverwrites: [
                    {
                        id: user,
                        allow: [Permissions.FLAGS.MANAGE_MESSAGES],
                    },
                ],
            })
                .then(channel => {
                    channel.setPosition(newChannelPosition)
                    channel.createInvite(
                        {
                            maxAge: 0, // unlimited time.
                            maxUses: 0 // unlimited uses.
                        }
                    )
                        .then(invite => {
                            // console.log(`Created an invite with a code of ${invite.code}`);
                            interaction.reply(`Created a channel under ${selectedCategoryName} at position ${newChannelPosition}. Invite link for this channel: https://discord.gg/${invite.code}`);
                        })
                        .catch(console.error)
                });
        }
        else {
            interaction.reply({ content: 'No such fund index. Channel creation failed.', ephemeral: true });
        }
    }
}
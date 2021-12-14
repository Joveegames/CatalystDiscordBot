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
        const fundIndex = interaction.options.getInteger('fund');
        const selectedCategoryName = 'FUND ' + fundIndex.toString();

        // Get fund categories
        const categories = interaction.client.channels.cache.filter(channel => channel.type === 'GUILD_CATEGORY');
        const fundCategories = categories.filter(category => category.name.startsWith('FUND '));

        // Check that value is within the categories
        const categoryId = fundCategories.find(category => category.name === selectedCategoryName)
        if (categoryId) {

            // Create the channel
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
                .then(channel => {
                    channel.createInvite(
                        {
                            maxAge: 0, // unlimited time.
                            maxUses: 0 // unlimited uses.
                        }
                    )
                        .then(invite => {
                            console.log(`Created an invite with a code of ${invite.code}`);
                            interaction.reply(`Created a channel under ${selectedCategoryName}. Invite link for this channel: https://discord.gg/${invite.code}`);
                        })
                        .catch(console.error)
                });
        }
        else {
            console.log('false: ' + selectedCategoryName);
            interaction.reply({ content: 'No such fund index. Channel creation failed.', ephemeral: true });
        }
    }
};
const { SlashCommandBuilder } = require('@discordjs/builders');

const { emojis } = require('../resources/emojis');
const { messages } = require('../resources/messages');

const commandName = 'role';
const commandDescription = 'Creates the role reaction message on the role reaction channel with the reaction emojis.';

const dogEmoji = emojis.DOG;
const catEmoji = emojis.CAT;

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commandName)
        .setDescription(commandDescription),
    async execute(interaction) {
        try {
            interaction.reply(messages.REACTIONROLES)
            const message = await interaction.fetchReply();
            message.react(dogEmoji);
            message.react(catEmoji);
        } catch (error) {
            console.error('Something went wrong when sending the message:', error);
        }
    },
};
const { SlashCommandBuilder } = require('@discordjs/builders');

const { sendRoleReactionMessage } = require('../functions/basicFunctions');

const commandName = 'createrolemessage';
const commandDescription = 'Creates the role reaction message on the role reaction channel with the reaction emojis.';
const commandSuccessContent = 'Message created.';
const commandFailureContent = 'Message could not be created.';

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commandName)
        .setDescription(commandDescription),
    async execute(interaction) {
        if (await sendRoleReactionMessage(interaction.client)) {
            await interaction.reply(commandSuccessContent);
        } else {
            await interaction.reply(commandFailureContent);
        }
    },
};
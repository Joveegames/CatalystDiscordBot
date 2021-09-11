const { SlashCommandBuilder } = require('@discordjs/builders');

const { channels } = require('../resources/channels');
const { emojis } = require('../resources/emojis');
const { sendMessageToChannel } = require('../functions/basicFunctions');

const commandName = 'createrolemessage';
const commandDescription = 'Creates the role reaction message on the role reaction channel with the reaction emojis.';
const commandSuccessReply = 'Message created.';
const commandFailureReply = 'Message could not be created.';

const sendRoleReactionMessage = async (client) => {
    const dogEmoji = emojis.DOG;
    const catEmoji = emojis.CAT;

    const messageContent =
        'React to this message to receive a role:\n' +
        `${dogEmoji}: Dog role.\n` +
        `${catEmoji}: Cat role.\n`;
    const reactionRoleChannelID = channels.REACTIONROLES;

    try {
        sendMessageToChannel(client, reactionRoleChannelID, messageContent)
            .then(function (message) {
                message.react(dogEmoji)
                message.react(catEmoji)
            });
    } catch (error) {
        console.error('Something went wrong when sending the message:', error);
        return false;
    }
    return true;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commandName)
        .setDescription(commandDescription),
    async execute(interaction) {
        if (await sendRoleReactionMessage(interaction.client)) {
            await interaction.reply(commandSuccessReply);
        } else {
            await interaction.reply(commandFailureReply);
        }
    },
};

const { channels } = require('../resources/channels');
const { emojis } = require('../resources/emojis');

const sendRoleReactionMessage = async (client) => {
    const dogEmoji = emojis.DOG;
    const catEmoji = emojis.CAT;

    const messageContent =
        'React to this message to receive a role:\n' +
        `${dogEmoji}: Dog role.\n` +
        `${catEmoji}: Cat role.\n`;
    const reactionRoleChannelID = channels.REACTIONROLES;

    try {
        const message = await sendMessageToChannel(client, reactionRoleChannelID, messageContent)
            .then(function () {
                message.react(dogEmoji)
                message.react(catEmoji)
            });
            } catch (error) {
                console.error('Something went wrong when sending the message:', error);
                return false;
            }
        return true;
    }

const sendMessageToChannel = async (client, channelID, messageContent) => {
        const channel = client.channels.cache.get(channelID);
        return await channel.send(messageContent);
    }

    module.exports = {
        sendRoleReactionMessage,
        sendMessageToChannel,
    };

const sendMessageToChannel = (client, channelID, messageContent) => {
    const channel = client.channels.cache.get(channelID);
    return channel.send(messageContent);
}

module.exports = {
    sendMessageToChannel,
};
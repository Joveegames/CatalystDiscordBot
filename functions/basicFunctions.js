
const sendMessageToChannel = (client, channelID, messageContent) => {
    const channel = client.channels.cache.get(channelID);
    return channel.send(messageContent);
}

const giveUserRole = (roleID, guild, member) => {
    const role =guild.roles.cache.find(role => role.id === roleID);
    member.roles.add(role);
}

const removeUserRole = (roleID, guild, member) => {
    const role =guild.roles.cache.find(role => role.id === roleID);
    member.roles.remove(role);
}

module.exports = {
    sendMessageToChannel,
    giveUserRole,
    removeUserRole,
};
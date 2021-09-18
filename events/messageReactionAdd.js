
const { emojiRoles } = require('../resources/roles');
const { users } = require('../resources/users');
const { messages } = require('../resources/messages');

const eventName = 'messageReactionAdd';

module.exports = {
    name: eventName,
    async execute(reaction, user) {
        // When a reaction is received, check if the structure is partial
        if (reaction.partial) {
            // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                return;
            }
        }

        if (user.bot) return;

        // Reaction roles:
        if (reaction.message.author.id === users.CARDANOBOT) {
            const messageToReactTo = reaction.message.content;
            if (messageToReactTo == messages.REACTIONROLES) {
                const { guild } = reaction.message;
                const userWhoReacted = guild.members.cache.find(member => member.id === user.id);

                const emoji = reaction._emoji.name
                const roleID = emojiRoles[emoji];

                if (roleID) {
                    const role = reaction.message.guild.roles.cache.find(role => role.id === roleID);
                    userWhoReacted.roles.add(role);
                }
            }
        }
    },
};
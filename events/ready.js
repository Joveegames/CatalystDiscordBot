
// const { channels } = require('../resources/channels');

const eventName = 'ready';

// const roleReactionChannel = channels.REACTIONROLES;

module.exports = {
	name: eventName,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		// Cache the reaction role message.
		// const channel = client.channels.cache.get(roleReactionChannel);
		// await channel.messages.fetch();
	},
};
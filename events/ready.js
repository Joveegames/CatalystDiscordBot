
const eventName = 'ready';

module.exports = {
	name: eventName,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
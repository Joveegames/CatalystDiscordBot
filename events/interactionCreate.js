// Libraries
const Discord = require('discord.js');

// Cooldowns
const cooldowns = new Discord.Collection();

const eventName = 'interactionCreate';

module.exports = {
	name: eventName,
	async execute(interaction) {
		if (!interaction.isCommand()) return;
		const command = interaction.client.commands.get(interaction.commandName);
		if (!command) return;

		// Check cooldown
		if (!cooldowns.has(command.data.name)) {
			cooldowns.set(command.data.name, new Discord.Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.data.name);
		const cooldownAmount = (command.cooldown) * 1000;

		if (timestamps.has(interaction.user.id)) {
			const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				interaction.reply({ content: `Please wait ${timeLeft.toFixed(1)} second(s) more before reusing the \`${command.data.name}\` command.`, ephemeral: true });
				return false;
			}
		}
		else {
			timestamps.set(interaction.user.id, now);
			setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};
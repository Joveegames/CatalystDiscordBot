const { SlashCommandBuilder } = require('@discordjs/builders');

const commandName = 'cooldown';
const commandDescription = 'Command with a cooldown.';
const commandContent = 'No cooldown.';

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commandName)
		.setDescription(commandDescription),
	cooldown: 30,
	async execute(interaction) {
		await interaction.reply(commandContent);
	},
};
const { SlashCommandBuilder } = require('@discordjs/builders');

const commandName = 'ping';
const commandDescription = 'Replies with Pong!';
const commandContent = 'Pong!';

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commandName)
		.setDescription(commandDescription),
	cooldown: 30,
	async execute(interaction) {
		await interaction.reply(commandContent);
	},
};
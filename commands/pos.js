const { SlashCommandBuilder } = require('@discordjs/builders');

const commandName = 'pos';
const commandDescription = 'Create a channel under selected category.';

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commandName)
        .setDescription(commandDescription),
        
    async execute(interaction) {
        const channelID = interaction.channelId;
        const channel = await interaction.member.guild.channels.fetch(channelID);
 
        interaction.reply(`Channel position: ${channel.position}.`);
    }
};
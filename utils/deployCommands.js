const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('../configs/bot.json');

const commands = [
	new SlashCommandBuilder().setName('init').setDescription('Инициализация бота')
    	.setDefaultMemberPermissions(0).setDMPermission(false),

	// new SlashCommandBuilder().setName('notice').setDescription('Разослать оповещения')
		// .addRoleOption(option => option.setName('роль').setDescription('Оповещение будет разослано всем, у кого есть эта роль').setRequired(true))
		// .addStringOption(option => option.setName('текст').setDescription('Текст оповещения').setRequired(true)),
];
    
commands.map(command => command.toJSON());

const rest = new REST().setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
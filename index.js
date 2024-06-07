const { Client, GatewayIntentBits, Events } = require('discord.js');
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });
const { token } = require('./configs/bot.json');


bot.once(Events.ClientReady, client => {});


bot.login(token);
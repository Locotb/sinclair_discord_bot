const { Client, GatewayIntentBits, Events, MessageType } = require('discord.js');
const { token } = require('./configs/bot.json');
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const btnmng = require('./managers/buttonManager.js');
const cmdmng = require('./managers/commandManager.js');
const utils = require('./utils/utils.js');
const channelsIds = require('./constants/channels.json');
const emojisIds = require('./constants/emojis.json');


bot.on(Events.InteractionCreate, async interaction => {
    let replyOptions = null;
    
    if (interaction.isButton()) {
        replyOptions = await btnmng.onClickBtn(interaction);
    }
    else if (interaction.isCommand()) {
        replyOptions = await cmdmng.onCommand(interaction);
    }
    else {
        replyOptions = { content: utils.getPhrase('something_went_wrong'), ephemeral: true };
    }    

    try {
        await interaction.reply(replyOptions);
    } catch (err) {
        await utils.onError(err, interaction.guild, utils.getPhrase('interaction_reply_err_description'));
    }
});

bot.on(Events.MessageCreate, async msg => {
    if (msg.channelId === channelsIds.welcome && msg.type === MessageType.UserJoin) {
        try {
            await msg.react(emojisIds.sinc);
        } catch (err) {
            await utils.onError(err, msg.guild, utils.getPhrase('welcome_reaction_err_description'));
        }
    }
});


bot.login(token);
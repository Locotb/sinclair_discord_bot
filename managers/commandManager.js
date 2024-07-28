const { ButtonStyle } = require('discord.js');
const utils = require('../utils/utils.js');
const buttonsIds = require('../constants/buttons.json');
const channelsIds = require('../constants/channels.json');
const emojisIds = require('../constants/emojis.json');
const rolesIds = require('../constants/roles.json');


class CommandManager {
    async onCommand(interaction) {
        let replyOptions = null;

        if (interaction.commandName === 'init') {
            replyOptions = await this.onCommand_init(interaction);
        }
        else {
            replyOptions = { content: utils.getPhrase('command_not_recognized'), ephemeral: true };
        }

        return replyOptions;
    }

    async onCommand_init(interaction) {
        let gtaOnlineEmoji = interaction.guild.emojis.cache.get(emojisIds.gta_online).toString();

        const buttonsData = [
            { id: buttonsIds.role_gta_online, emoji: emojisIds.gta_online, style: ButtonStyle.Secondary },
            { id: buttonsIds.role_consoles, emoji: emojisIds.video_game, style: ButtonStyle.Secondary },
        ];
        const buttons = utils.createBtns(buttonsData);
        const channel = interaction.guild.channels.cache.get(channelsIds.roles_management);

        if (!channel) {
            return { content: utils.getPhrase('roles_mng_channel_not_found') };
        }

        let msg = utils.getPhrase('roles_management_tutorial') + '\n' +
                utils.getPhrase('manage_role').replace('<::>', gtaOnlineEmoji).replace('<@&>', `<@&${rolesIds.gta_online}>`) + '\n' +
                utils.getPhrase('manage_role').replace('<::>', emojisIds.video_game).replace('<@&>', `<@&${rolesIds.consoles}>`)
    
        try {
            await channel.send({ content: msg, components: buttons });
        } catch (err) {
            await utils.onError(err, interaction.guild, utils.getPhrase('send_roles_tutorial_err_description'));
        }
                
        return { content: utils.getPhrase('command_init_completed') };
    }
}


module.exports = new CommandManager;
const { ButtonStyle } = require('discord.js');
const utils = require('../utils/utils.js');
const buttonsIds = require('../constants/buttons.json');
const channelsIds = require('../constants/channels.json');
const emojisIds = require('../constants/emojis.json');


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
        const channel = interaction.guild.channels.cache.get(channelsIds.roles_management);

        if (!channel) {
            return { content: utils.getPhrase('roles_mng_channel_not_found') };
        }
        
        const buttonsData = [
            { id: buttonsIds.role_gta_online, emoji: emojisIds.gta_online, style: ButtonStyle.Secondary },
            { id: buttonsIds.role_consoles, emoji: emojisIds.video_game, style: ButtonStyle.Secondary },
        ];

        const buttons = utils.createBtns(buttonsData);
        const content = utils.getManageRolesMsgContent();
    
        try {
            await channel.send({ content, components: buttons });
        } catch (err) {
            await utils.onError(err, interaction.guild, utils.getPhrase('send_roles_tutorial_err_description'));
        }
                
        return { content: utils.getPhrase('command_init_completed') };
    }
}


module.exports = new CommandManager;
const utils = require('../utils/utils.js');
const buttonsIds = require('../constants/buttons.json');
const rolesIds = require('../constants/roles.json');


class ButtonManager {
    async onClickBtn(interaction) {
        let replyOptions = null;

        if ([buttonsIds.role_gta_online, buttonsIds.role_consoles].includes(interaction.customId)) {
            replyOptions = await this.onClickRoleBtn(interaction);
        }
        else {
            replyOptions = { content: utils.getPhrase('button_not_recognized'), ephemeral: true };
        }

        return replyOptions;
    }

    async onClickRoleBtn(interaction) {
        let roleId = '', msg = '';
    
        if (interaction.customId === buttonsIds.role_gta_online) {
            roleId = rolesIds.gta_online;
        }
        else if (interaction.customId === buttonsIds.role_consoles) {
            roleId = rolesIds.consoles;
        }

        try {
            if (interaction.member.roles.cache.has(roleId)) {
                await interaction.member.roles.remove(roleId);
                msg = utils.getPhrase('role_removed').replace('<@&>', `<@&${roleId}>`);
            } else {
                await interaction.member.roles.add(roleId);
                msg = utils.getPhrase('role_added').replace('<@&>', `<@&${roleId}>`);
            }
        } catch (err) {
            msg = utils.getPhrase('something_went_wrong');
            await utils.onError(err, interaction.guild, utils.getPhrase('role_mng_err_description'));
        }
    
        return { content: msg, ephemeral: true };
    }
}


module.exports = new ButtonManager;
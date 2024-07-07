const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const channelsIds = require('../constants/channels.json');
const phrases = require('../constants/phrases.json');


class Utils {
    createBtns(data, rows = []) {
        let btns = [], lim = Math.min(5, data.length), tData; // max 5 btns in a raw
        
        for (let i = 0; i < lim; i++) {
            tData = data[i];
    
            btns.push(new ButtonBuilder()
                .setCustomId(tData.id)
                .setStyle(tData.style));
    
            if (tData.label) btns[i].setLabel(tData.label);
            if (tData.emoji) btns[i].setEmoji(tData.emoji);
        }
    
        data.splice(0, lim);
        rows.push(new ActionRowBuilder().addComponents(...btns));
    
        if (data.length > 0) return this.createBtns(data, rows);
        else return rows;
    }

    getPhrase(key, lang = 'ru') {
        return phrases[key][lang];
    }

    async onError(err, guild, description) {
        let channel = guild.channels.cache.get(channelsIds.sinclair_team);

        console.log(new Date().toLocaleString('ru'), err);

        try {
            await channel.send(this.getPhrase('error_occurred') + ' ' + description);
        } catch (e) {
            console.log(new Date().toLocaleString('ru'), e);
        }
    }
}


module.exports = new Utils;
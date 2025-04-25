"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: {
        name: "register-status-channel",
        description: "Register albion status checker channel"
    },
    async execute(interaction, guildManager) {
        interaction.reply("Kursif lox");
        const guild = guildManager.guild;
        const voiceChannel = await guild.channels.create({ name: "check-status", type: discord_js_1.ChannelType.GuildVoice });
        guildManager.registerAlbionStatusChannel(voiceChannel);
    }
};

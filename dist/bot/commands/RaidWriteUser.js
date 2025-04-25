"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: {
        name: "raid-write",
        description: "Create raid",
        options: [
            { name: "raid-id", type: discord_js_1.ApplicationCommandOptionType.String, description: "Напишіть id рейду, або ключове слово \"last\" щоб використовувати останній рейд", required: true },
            { name: "user", type: discord_js_1.ApplicationCommandOptionType.User, description: "Введіть користувача", required: true },
            { name: "roleindex", type: discord_js_1.ApplicationCommandOptionType.Number, description: "Номер ролі на яку записати користувача", required: true }
        ]
    },
    async execute(interaction, guildManager) {
        const raidId = interaction.options.getString("raid-id");
        const user = interaction.options.getUser("user");
        const roleIndex = interaction.options.getNumber("roleindex");
        if (!raidId || !user || !roleIndex)
            return;
        const raid = raidId == "last" ? guildManager.raidManager.raids[guildManager.raidManager.raids.length - 1] : guildManager.raidManager.raids.find(_raid => _raid.id == Number(raidId));
        if (!raid)
            return interaction.reply("Не знайшов такого колу");
        raid.writeUser(user, roleIndex, interaction);
    }
};

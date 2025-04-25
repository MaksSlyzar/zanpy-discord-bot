"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: {
        name: "raid-create",
        description: "Create raid",
        options: [
            { name: "name", type: discord_js_1.ApplicationCommandOptionType.String, description: "Enter raid name", required: true },
            { name: "roles", type: discord_js_1.ApplicationCommandOptionType.String, description: "text", required: true },
            { name: "date", type: discord_js_1.ApplicationCommandOptionType.String, description: "Введіть час колу", required: true }
        ]
    },
    async execute(interaction, guildManager) {
        const rolesText = interaction.options.get("roles")?.value;
        const raidName = interaction.options.get("name")?.value;
        const date = interaction.options.get("date")?.value;
        if (!rolesText || !raidName || !date)
            return interaction.reply("Error...");
        try {
            await interaction.deferReply();
            guildManager.raidManager.createRaid(interaction, raidName, rolesText, "T8", date);
        }
        catch (err) {
            console.log(err);
        }
    }
};

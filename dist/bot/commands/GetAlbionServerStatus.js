"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetAlbionServerStatus_1 = require("../functions/GetAlbionServerStatus");
exports.default = {
    data: {
        name: "get-albion-server-status",
        description: "Show status albion servers"
    },
    async execute(interaction, guildManager) {
        try {
            await interaction.deferReply(); // ✅ keeps interaction alive
            const serversInfo = await (0, GetAlbionServerStatus_1.getAlbionServerStatus)();
            const textInfo = serversInfo.map(server => `${server.name} ${server.status}`).join("\n");
            await interaction.editReply(textInfo); // ✅ update after delay
        }
        catch (err) {
            console.error("Error handling Albion status:", err);
            if (!interaction.replied) {
                await interaction.reply({ content: "❌ Failed to fetch server status.", ephemeral: true });
            }
        }
    },
};

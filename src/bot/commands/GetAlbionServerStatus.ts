import Command from "../classes/Command";
import { getAlbionServerStatus } from "../functions/GetAlbionServerStatus";
import { ChatInputCommandInteraction } from "discord.js";
import { ZanpyGuild } from "../managers/GuildManager";

export default {
  data: {
    name: "get-albion-server-status",
    description: "Show status albion servers"
  },
  async execute(interaction: ChatInputCommandInteraction, guildManager: ZanpyGuild) {
    try {
      await interaction.deferReply(); // ✅ keeps interaction alive

      const serversInfo = await getAlbionServerStatus();
      const textInfo = serversInfo.map(server => `${server.name} ${server.status}`).join("\n");

      await interaction.editReply(textInfo); // ✅ update after delay
    } catch (err) {
      console.error("Error handling Albion status:", err);
      if (!interaction.replied) {
        await interaction.reply({ content: "❌ Failed to fetch server status.", ephemeral: true });
      }
    }
  },
} as Command;

import Command from "../classes/Command";
import { ChatInputCommandInteraction } from "discord.js";
import { ZanpyGuild } from "../managers/GuildManager";

export default {
  data: {
    name: "hellocommand1",
    description: "Blabla"
  },
  async execute(interaction: ChatInputCommandInteraction, guildManager: ZanpyGuild) {
    interaction.reply("testing command successfully works");
  },
} as Command;

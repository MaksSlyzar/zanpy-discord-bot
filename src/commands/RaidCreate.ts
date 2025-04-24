import Command from "../classes/Command";
import { ApplicationCommandOptionBase, ApplicationCommandOptionType, ChatInputCommandInteraction, TextChannel } from "discord.js";
import { ZanpyGuild } from "../managers/GuildManager";
import { EmbedBuilder } from "discord.js";

export default {
  data: {
    name: "raid-create",
    description: "Create raid",
    options: [
      { name: "name", type: ApplicationCommandOptionType.String, description: "Enter raid name", required: true },
      { name: "roles", type: ApplicationCommandOptionType.String, description: "text", required: true },
      { name: "date", type: ApplicationCommandOptionType.String, description: "Введіть час колу", required: true }
    ]
  },
  async execute(interaction: ChatInputCommandInteraction, guildManager: ZanpyGuild) {
    const rolesText = interaction.options.get("roles")?.value as string;
    const raidName = interaction.options.get("name")?.value as string;
    const date = interaction.options.get("date")?.value as string;

    if (!rolesText || !raidName || !date)
      return interaction.reply("Error...");


    try {
      await interaction.deferReply();
      guildManager.raidManager.createRaid(interaction, raidName, rolesText, "T8", date);
    } catch (err) {
      console.log(err);
    }

  }
} as Command;

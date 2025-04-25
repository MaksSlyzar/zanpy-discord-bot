import Command from "../classes/Command";
import { ApplicationCommandOptionBase, ApplicationCommandOptionType, ChatInputCommandInteraction, TextChannel } from "discord.js";
import { ZanpyGuild } from "../managers/GuildManager";
import { EmbedBuilder } from "discord.js";

export default {
  data: {
    name: "raid-stop",
    description: "Видалити рейд",
    options: [
      { name: "raidid", type: ApplicationCommandOptionType.String, description: "id рейду", required: true },
    ]
  },
  async execute(interaction: ChatInputCommandInteraction, guildManager: ZanpyGuild) {
    const raidid = interaction.options.getString("raidid");

    if (!raidid)
      return interaction.reply("Error...");

    try {
      await interaction.deferReply();
      const raid = guildManager.raidManager.raids.find(raid => raid.id == Number(raidid));

      if (!raid)
        return await interaction.editReply("Не знайшов такого рейду.");

      raid.stopRaid(interaction);
    } catch (err) {
      console.log(err);
    }

  }
} as Command;

import { ApplicationCommandDataResolvable, ApplicationCommandOption, ApplicationCommandOptionData, ChatInputApplicationCommandData, ChatInputCommandInteraction, GuildManager, SlashCommandBuilder } from "discord.js";
import { ZanpyGuild } from "../managers/GuildManager";

interface Command {
  data: {
    name: string,
    options: ApplicationCommandOptionData[],
    description: string
  };

  execute(interaction: ChatInputCommandInteraction, guildManager: ZanpyGuild | undefined): Promise<void>;
}

export default Command;

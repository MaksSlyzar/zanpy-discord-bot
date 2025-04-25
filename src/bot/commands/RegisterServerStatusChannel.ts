import Command from "../classes/Command";
import { ChannelType, ChatInputCommandInteraction } from "discord.js";
import { ZanpyGuild } from "../managers/GuildManager";

export default {
  data: {
    name: "register-status-channel",
    description: "Register albion status checker channel"
  },
  async execute(interaction: ChatInputCommandInteraction, guildManager: ZanpyGuild) {

    interaction.reply("Kursif lox");
    const guild = guildManager.guild;

    const voiceChannel = await guild.channels.create({ name: "check-status", type: ChannelType.GuildVoice });

    guildManager.registerAlbionStatusChannel(voiceChannel);

  }
} as Command;

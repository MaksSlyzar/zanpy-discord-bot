import { Client, Guild } from "discord.js";
import GuildManager, { ZanpyGuild } from "./GuildManager";

export function initGuildManager(client: Client) {
  const guilds = [];

  client.guilds.cache.map(guild => {
    const zanpyGuild = new ZanpyGuild(guild);

    console.log(`Guild ${guild.name} commands inited`)
    GuildManager.pushGuild(zanpyGuild);
  });
}

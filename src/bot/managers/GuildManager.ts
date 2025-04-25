import { Guild, VoiceChannel } from "discord.js";
import { getAlbionServerStatus } from "../functions/GetAlbionServerStatus";
import GetAlbionServerStatus from "../commands/GetAlbionServerStatus";
import RaidManager from "./RaidManager";

class GuildManager {
  zanpyGuilds: Array<ZanpyGuild>;

  constructor() {
    this.zanpyGuilds = [];
  }

  pushGuild(zanpyGuild: ZanpyGuild) {
    this.zanpyGuilds.push(zanpyGuild);
  }
}


export class ZanpyGuild {
  guild: Guild;
  albionStatusChannel: VoiceChannel | null = null;
  raidManager: RaidManager;

  constructor(guild: Guild) {
    this.guild = guild;
    this.raidManager = new RaidManager(this);
  }

  registerAlbionStatusChannel(channel: VoiceChannel) {
    this.albionStatusChannel = channel;
    this.update();
  }

  async update() {
    console.log("Update in 15s")

    this.updateChannelName();

    setTimeout(() => this.update(), 15000);
  }

  async updateChannelName() {
    if (this.albionStatusChannel == undefined)
      return;

    const statusServer = await getAlbionServerStatus();

    const europeStatus = statusServer[2];

    await this.albionStatusChannel.edit({ name: europeStatus.status });
  }
}

export default new GuildManager();

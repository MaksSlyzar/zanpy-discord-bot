"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZanpyGuild = void 0;
const GetAlbionServerStatus_1 = require("../functions/GetAlbionServerStatus");
const RaidManager_1 = __importDefault(require("./RaidManager"));
class GuildManager {
    constructor() {
        this.zanpyGuilds = [];
    }
    pushGuild(zanpyGuild) {
        this.zanpyGuilds.push(zanpyGuild);
    }
}
class ZanpyGuild {
    constructor(guild) {
        this.albionStatusChannel = null;
        this.guild = guild;
        this.raidManager = new RaidManager_1.default(this);
    }
    registerAlbionStatusChannel(channel) {
        this.albionStatusChannel = channel;
        this.update();
    }
    async update() {
        console.log("Update in 15s");
        this.updateChannelName();
        setTimeout(() => this.update(), 15000);
    }
    async updateChannelName() {
        if (this.albionStatusChannel == undefined)
            return;
        const statusServer = await (0, GetAlbionServerStatus_1.getAlbionServerStatus)();
        const europeStatus = statusServer[2];
        await this.albionStatusChannel.edit({ name: europeStatus.status });
    }
}
exports.ZanpyGuild = ZanpyGuild;
exports.default = new GuildManager();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = __importDefault(require("./classes/Client"));
const discord_js_1 = require("discord.js");
const config_1 = require("./config");
const InitGuildManager_1 = require("./managers/InitGuildManager");
const loadCommands_1 = require("./functions/loadCommands");
const GuildManager_1 = __importDefault(require("./managers/GuildManager"));
const client = new Client_1.default({
    intents: ["Guilds",
        "GuildMembers",
        "GuildMessages",
        "DirectMessages",
        "GuildIntegrations",
        "GuildVoiceStates",
        "GuildVoiceStates"
    ]
});
const globalCommands = (0, loadCommands_1.loadCommands)();
client.once("ready", () => {
    console.log("Discord bot is ready");
    (0, InitGuildManager_1.initGuildManager)(client);
    const commandDatas = [];
    for (let command of globalCommands) {
        console.log(`Load command "${command.data.name}"`);
        commandDatas.push(command.data);
        client.commands.set(command.data.name, command);
    }
    client.application?.commands.set(commandDatas, "1348985949668904990");
    client.application?.commands.set(commandDatas, "1349080954765049907");
    client.application?.commands.set(commandDatas, "1228413636821651457");
});
client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
    if (interaction.isChatInputCommand())
        slashCommandsInteraction(interaction);
    if (interaction.isStringSelectMenu())
        stringSelectMenuInteraction(interaction);
});
async function slashCommandsInteraction(interaction) {
    if (interaction.command) {
        for (let command of globalCommands) {
            const guildManager = GuildManager_1.default.zanpyGuilds.find((manager) => manager.guild.id == interaction.guildId);
            if (interaction.command.name == command.data.name) {
                command.execute(interaction, guildManager);
            }
        }
    }
}
async function stringSelectMenuInteraction(interaction) {
    const guild = GuildManager_1.default.zanpyGuilds.find(guild => guild.guild.id == interaction.guildId);
    if (guild == null)
        return;
    const raid = guild.raidManager.getRaidByMessageId(interaction.message.id);
    if (raid == null)
        return;
    raid.selectInteraction(interaction);
}
client.login(config_1.config.DISCORD_TOKEN);

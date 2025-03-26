import { Client } from "discord.js";
import { config } from "./config";

const client = new Client({
  intents: ["Guilds",
    "GuildMembers",
    "GuildMessages",
    "DirectMessages",
    "GuildIntegrations",
    "GuildVoiceStates"]
})

client.once("ready", () => {
  console.log("Discord bot is ready");
});

client.login(config.DISCORD_TOKEN);

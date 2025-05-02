import Client from "./classes/Client";
import { ChatInputApplicationCommandData, ChatInputCommandInteraction, Events, Message, Partials, SlashCommandBuilder, StringSelectMenuInteraction } from "discord.js";
import { config } from "./config";
import { initGuildManager } from "./managers/InitGuildManager";
import { loadCommands } from "./functions/loadCommands";
import GuildManager from "./managers/GuildManager";
import { parse } from "dotenv";

const client = new Client({
  intents: ["Guilds",
    "GuildMembers",
    "GuildMessages",
    "DirectMessages",
    "GuildIntegrations",
    "GuildVoiceStates",
    "GuildVoiceStates",
    "MessageContent"
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

const globalCommands = loadCommands();

client.once("ready", () => {
  console.log("Discord bot is ready");

  initGuildManager(client);

  const commandDatas: ChatInputApplicationCommandData[] = [];

  for (let command of globalCommands) {
    console.log(`Load command "${command.data.name}"`);

    commandDatas.push(command.data);
    client.commands.set(command.data.name, command);
  }

  client.application?.commands.set(commandDatas, "1348985949668904990");
  client.application?.commands.set(commandDatas, "1349080954765049907");
  client.application?.commands.set(commandDatas, "1228413636821651457");

});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) slashCommandsInteraction(interaction);
  if (interaction.isStringSelectMenu()) stringSelectMenuInteraction(interaction);
});

client.on(Events.MessageCreate, (message: Message) => {
  if (message.author.bot) return;
  if (message.content.startsWith('!create-raid')) {
    const parts = message.content.split(';');

    const raidName = parts[1];
    const rolesUnparsed = parts[4];
    const gearTier = parts[3];
    const time = parts[2];

    const guildManager = GuildManager.zanpyGuilds.find(
      (manager) => manager.guild.id == message.guildId
    );
    if (!guildManager)
      return;
    const raidManager = guildManager.raidManager;
    raidManager.createRaid(message, raidName, rolesUnparsed, gearTier, time);
  }

});
async function slashCommandsInteraction(interaction: ChatInputCommandInteraction) {
  if (interaction.command) {
    for (let command of globalCommands) {
      const guildManager = GuildManager.zanpyGuilds.find(
        (manager) => manager.guild.id == interaction.guildId
      );

      if (interaction.command.name == command.data.name) {
        command.execute(interaction, guildManager);
      }
    }
  }
}

async function stringSelectMenuInteraction(interaction: StringSelectMenuInteraction) {
  const guild = GuildManager.zanpyGuilds.find(guild => guild.guild.id == interaction.guildId);
  if (guild == null)
    return;

  const raid = guild.raidManager.getRaidByMessageId(interaction.message.id);
  if (raid == null)
    return;

  raid.selectInteraction(interaction);
}

client.login(config.DISCORD_TOKEN);

import { ActionRowBuilder, ChatInputCommandInteraction, CommandInteraction, Interaction, Message, StringSelectMenuBuilder, StringSelectMenuInteraction, StringSelectMenuOptionBuilder, TextChannel, User } from "discord.js";
import { ZanpyGuild } from "./GuildManager";
import emojies from "../data/emojies.json";

interface Role {
  emoji: string;
  id: string;
  names: string[];
  defaultName: string;
  description: string;
}

interface RoleSlot extends Role {
  slotId: string;
}


export default class RaidManager {
  zanpyGuild: ZanpyGuild;
  raids: Array<Raid>;

  constructor(zanpyGuild: ZanpyGuild) {
    this.zanpyGuild = zanpyGuild;
    this.raids = [];
  }

  createRaid(interaction: ChatInputCommandInteraction, raidName: string, rolesUnparsed: string, gearTier: string) {
    const newRaid = new Raid(this.zanpyGuild, raidName, rolesUnparsed, gearTier, interaction);

    this.raids.push(newRaid);

  }

  getRaidByMessageId(messageId: string) {
    const output = this.raids.find(raid => raid.message?.id == messageId);
    return output;
  }
}

function generateRandomId(): number {
  return Math.floor(Math.random() * Math.pow(10, 10));
}

export class Raid {
  id: number;
  zanpyGuild: ZanpyGuild;
  raidName: string;
  unparsedRoles: string;
  gearTier: string;
  message: Message | null = null;
  roles: RoleSlot[] = [];
  selectedRoles: { user: User; slotIndex: number }[] = [];
  interaction: Interaction | null = null;

  constructor(
    zanpyGuild: ZanpyGuild,
    raidName: string,
    unparsedRoles: string,
    gearTier: string,
    interaction: ChatInputCommandInteraction
  ) {
    this.id = generateRandomId();
    this.zanpyGuild = zanpyGuild;
    this.raidName = raidName;
    this.unparsedRoles = unparsedRoles;
    this.gearTier = gearTier;
    this.roleParser();

    console.log(`Raid #${this.id}. Name: ${this.raidName} created.`);


    const channel = interaction.channel as TextChannel;
    channel.send({
      content: this.generateTextMessage(),
      components: [this.createSelectMenu()],
    }).then(msg => {
      interaction.editReply("Ви створили кол. #ID" + this.id);
      this.message = msg
    });
  }

  roleParser() {
    const names = this.unparsedRoles.split("%");
    this.roles = names.map(name => {
      const base = this.getEmojiByName(name);
      return {
        ...base,
        slotId: `${base.id}-${Math.random().toString(36).substring(2, 9)}`
      };
    });
  }

  getEmojiByName(name: string) {
    const found = emojies["albion-icons"].find((item) => item.names.includes(name));
    return found
      ? { ...found, defaultName: found.names[0] }
      : {
        id: "none",
        description: "",
        names: ["none"],
        emoji: "crossed_swords",
        defaultName: "None",
      };
  }

  createSelectMenu(): ActionRowBuilder<StringSelectMenuBuilder> {
    const availableSlots = this.roles
      .map((role, index) => ({ ...role, index }))
      .filter(role =>
        !this.selectedRoles.find(sel => sel.slotIndex === role.index) && role.id != "none"
      );

    const options = availableSlots.map(role =>
      new StringSelectMenuOptionBuilder()
        .setLabel(role.names[0])
        .setDescription(role.description)
        .setEmoji(role.emoji)
        .setValue(role.index.toString())
    );

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId(`selector_${this.id}`)
      .setPlaceholder('Записатись!')
      .addOptions(new StringSelectMenuOptionBuilder()
        .setLabel("Виписатись:(")
        .setEmoji(emojies.basic.cancel.emoji)
        .setValue("66")
        .setDescription("Заплатити 3 ляма штрафу в казну гільдії і виписатись")
        , ...options);

    return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu);
  }

  selectInteraction(interaction: StringSelectMenuInteraction) {
    const selectedIndex = parseInt(interaction.values[0]);
    if (selectedIndex == 66) {
      //Remove user from raid
      const index = this.selectedRoles.findIndex(role => role.user.id == interaction.user.id);

      if (index != -1)
        this.selectedRoles.splice(index, 1);

    } else {

      this.selectedRoles = this.selectedRoles.filter(sr => sr.user.id !== interaction.user.id);

      this.selectedRoles.push({ user: interaction.user, slotIndex: selectedIndex });
    }

    interaction.update({
      content: this.generateTextMessage(),
      components: [this.createSelectMenu()],
    });
  }

  writeUser(user: User, roleIndex: number, interaction: CommandInteraction) {
    if (roleIndex == 66) {
      //Remove user from raid
      const index = this.selectedRoles.findIndex(role => role.user.id == user.id);

      if (index != -1)
        this.selectedRoles.splice(index, 1);

    } else {

      this.selectedRoles = this.selectedRoles.filter(sr => sr.user.id !== user.id);

      if (roleIndex - 1 >= 0 && roleIndex < this.roles.length) {
        this.selectedRoles.push({ user: user, slotIndex: roleIndex - 1 });
      } else {
        interaction.reply(``)
      }


    }

    this.message?.edit({ content: this.generateTextMessage(), components: [this.createSelectMenu()] })
  }

  generateTextMessage(): string {
    const lines = this.roles.map((role, i) => {
      const selected = this.selectedRoles.find(sel => sel.slotIndex === i);
      const user = selected?.user ?? null;
      const userDisplay = user ? `<@${user.id}>` : "_(вільно)_";
      const roleName = role.names[0];
      const emoji = role.emoji;

      return `**${i + 1}.** <:${emoji}> **${roleName}** → ${userDisplay}`;
    });

    return [
      `## :crossed_swords: **Рейд о 19:00 — ${this.raidName}**`,
      `### :shield: **Еквівалент зброї: ${this.gearTier}**`,
      ``,
      `**Учасники:**`,
      `------------------------`,
      ...lines,
      `------------------------`,
      ``,
      `🆔 **id${this.id}**`,
      `------------------------`
    ].join("\n");
  }

}


"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Raid = void 0;
const discord_js_1 = require("discord.js");
const emojies_json_1 = __importDefault(require("../data/emojies.json"));
class RaidManager {
    constructor(zanpyGuild) {
        this.zanpyGuild = zanpyGuild;
        this.raids = [];
    }
    createRaid(interaction, raidName, rolesUnparsed, gearTier, time) {
        const newRaid = new Raid(this.zanpyGuild, raidName, rolesUnparsed, gearTier, interaction, time);
        this.raids.push(newRaid);
    }
    getRaidByMessageId(messageId) {
        const output = this.raids.find(raid => raid.message?.id == messageId);
        return output;
    }
}
exports.default = RaidManager;
function generateRandomId() {
    return Math.floor(Math.random() * Math.pow(10, 10));
}
class Raid {
    constructor(zanpyGuild, raidName, unparsedRoles, gearTier, interaction, time) {
        this.message = null;
        this.roles = [];
        this.selectedRoles = [];
        this.interaction = null;
        this.time = "";
        this.id = generateRandomId();
        this.zanpyGuild = zanpyGuild;
        this.raidName = raidName;
        this.unparsedRoles = unparsedRoles;
        this.gearTier = gearTier;
        this.roleParser();
        this.time = time;
        console.log(`Raid #${this.id}. Name: ${this.raidName} created.`);
        const channel = interaction.channel;
        channel.send({
            content: this.generateTextMessage(),
            components: [this.createSelectMenu()],
        }).then(msg => {
            interaction.editReply("Ви створили кол. #ID" + this.id);
            this.message = msg;
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
    getEmojiByName(name) {
        const found = emojies_json_1.default["albion-icons"].find((item) => item.names.includes(name));
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
    createSelectMenu() {
        const availableSlots = this.roles
            .map((role, index) => ({ ...role, index }))
            .filter(role => !this.selectedRoles.find(sel => sel.slotIndex === role.index) && role.id != "none");
        const options = availableSlots.map(role => new discord_js_1.StringSelectMenuOptionBuilder()
            .setLabel(role.names[0])
            .setDescription(role.description)
            .setEmoji(role.emoji)
            .setValue(role.index.toString()));
        const selectMenu = new discord_js_1.StringSelectMenuBuilder()
            .setCustomId(`selector_${this.id}`)
            .setPlaceholder('Записатись!')
            .addOptions(new discord_js_1.StringSelectMenuOptionBuilder()
            .setLabel("Виписатись:(")
            .setEmoji(emojies_json_1.default.basic.cancel.emoji)
            .setValue("66")
            .setDescription("Заплатити 3 ляма штрафу в казну гільдії і виписатись"), ...options);
        return new discord_js_1.ActionRowBuilder().addComponents(selectMenu);
    }
    selectInteraction(interaction) {
        const selectedIndex = parseInt(interaction.values[0]);
        if (selectedIndex == 66) {
            //Remove user from raid
            const index = this.selectedRoles.findIndex(role => role.user.id == interaction.user.id);
            if (index != -1)
                this.selectedRoles.splice(index, 1);
        }
        else {
            this.selectedRoles = this.selectedRoles.filter(sr => sr.user.id !== interaction.user.id);
            this.selectedRoles.push({ user: interaction.user, slotIndex: selectedIndex });
        }
        interaction.update({
            content: this.generateTextMessage(),
            components: [this.createSelectMenu()],
        });
    }
    writeUser(user, roleIndex, interaction) {
        if (roleIndex == 66) {
            //Remove user from raid
            const index = this.selectedRoles.findIndex(role => role.user.id == user.id);
            if (index != -1)
                this.selectedRoles.splice(index, 1);
        }
        else {
            this.selectedRoles = this.selectedRoles.filter(sr => sr.user.id !== user.id);
            if (roleIndex - 1 >= 0 && roleIndex < this.roles.length) {
                this.selectedRoles.push({ user: user, slotIndex: roleIndex - 1 });
            }
            else {
                interaction.reply(``);
            }
        }
        this.message?.edit({ content: this.generateTextMessage(), components: [this.createSelectMenu()] });
    }
    generateTextMessage() {
        const lines = this.roles.map((role, i) => {
            const selected = this.selectedRoles.find(sel => sel.slotIndex === i);
            const user = selected?.user ?? null;
            const userDisplay = user ? `<@${user.id}>` : "_(вільно)_";
            const roleName = role.names[0];
            const emoji = role.emoji;
            return `**${i + 1}.** <:${emoji}> **${roleName}** → ${userDisplay}`;
        });
        return [
            `## :crossed_swords: **Збір о ${this.time} — ${this.raidName}**`,
            `### :shield: **Еквівалент зброї: ${this.gearTier}**`,
            ``,
            `**Учасники:**`,
            `------------------------`,
            ...lines,
            `------------------------`,
            ``,
            `🆔 ${this.id}`,
            `------------------------`
        ].join("\n");
    }
}
exports.Raid = Raid;

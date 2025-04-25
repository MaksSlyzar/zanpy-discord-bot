"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    data: {
        name: "hellocommand1",
        description: "Blabla"
    },
    async execute(interaction, guildManager) {
        interaction.reply("testing command successfully works");
    },
};

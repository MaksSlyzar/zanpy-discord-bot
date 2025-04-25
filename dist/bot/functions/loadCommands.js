"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCommands = void 0;
const CommandHello_1 = __importDefault(require("../commands/CommandHello"));
const GetAlbionServerStatus_1 = __importDefault(require("../commands/GetAlbionServerStatus"));
const RegisterServerStatusChannel_1 = __importDefault(require("../commands/RegisterServerStatusChannel"));
const RaidCreate_1 = __importDefault(require("../commands/RaidCreate"));
const RaidWriteUser_1 = __importDefault(require("../commands/RaidWriteUser"));
const loadCommands = () => {
    return [CommandHello_1.default, GetAlbionServerStatus_1.default, RegisterServerStatusChannel_1.default, RaidCreate_1.default, RaidWriteUser_1.default];
};
exports.loadCommands = loadCommands;

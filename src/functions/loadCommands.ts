import CommandHello from "../commands/CommandHello";
import GetAlbionServerStatus from "../commands/GetAlbionServerStatus";
import RegisterServerStatusChannel from "../commands/RegisterServerStatusChannel";
import RaidCreate from "../commands/RaidCreate";
import RaidWriteUser from "../commands/RaidWriteUser";

export const loadCommands = () => {
  return [CommandHello, GetAlbionServerStatus, RegisterServerStatusChannel, RaidCreate, RaidWriteUser];
};

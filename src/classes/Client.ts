import Discord, { Collection, ClientOptions } from "discord.js";
import Command from "./Command";

export default class Client extends Discord.Client {
  commands: Collection<string, Command> = new Collection();

  constructor(options: ClientOptions) {
    super(options);
  }
}

import { CommandInteraction } from "discord.js";
import Bot from "structures/Bot";
import Interaction from "structures/Interaction";

export default class PingInteraction extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "ping",
      description: "Returns the bot's ping",
    });
  }

  async execute(interaction: CommandInteraction) {
    interaction.reply(`My ping is ${Math.round(this.bot.ws.ping)} ms`);
  }
}

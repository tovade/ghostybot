import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

const API_URL = "https://some-random-api.ml/canvas/invert?avatar=";

export default class InvertCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "invert",
      description: "Invert your avatar",
      category: "image",
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const member = await this.bot.utils.findMember(message, args, { allowAuthor: true });
      if (!member) {
        return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
      }

      const image = `${API_URL}${member?.user.displayAvatarURL({ format: "png" })}`;

      const embed = this.bot.utils
        .baseEmbed(message)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${image})`)
        .setImage(image);

      return message.channel.send(embed);
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}

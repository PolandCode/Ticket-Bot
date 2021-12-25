function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const config = require("../../config.json");
const configuration = require('../../configuration/configuration.json')
const guildConf = configuration.guild
const tickets = configuration.tickets
const colors = configuration.colors
const activityCycle = configuration.activityCycle
const filter = require('../../configuration/chatFilter.json');

module.exports = {
  name: 'ping',
  aliases: [],
  permissions: [],
  cooldown: null,
  argsreq: null,
  usage: '',
  description: 'Get the latency of the bot',
  category: 'utilities',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    await message.reply({ embeds: [
      new Discord.MessageEmbed()
        .setTitle(`Client Latency`)
        .setDescription(`__${client.user.username}'s Latency:__ \`${client.ws.ping}\``)
        .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL()}`)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(colors.neutral)
    ]});
  }
}
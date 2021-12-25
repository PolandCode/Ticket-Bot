const config = require("../../config.json");
const configuration = require('../../configuration/configuration.json')
const guildConf = configuration.guild
const tickets = configuration.tickets
const colors = configuration.colors
const activityCycle = configuration.activityCycle
const filter = require('../../configuration/chatFilter.json');

module.exports = {
  name: 'lock',
  aliases: [],
  permissions: [],
  cooldown: null,
  argsreq: null,
  usage: '',
  description: 'Lock a ticket to staff only messages',
  category: 'tickets',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    if (!message.channel.name.startsWith('ticket-')) {
      return new MsgError(`**${message.author.tag}**, you are not inside of a ticket.`)
    }

    if (tickets.onlySupportCanAdd === 'true' && !message.member.roles.cache.has(tickets.supportRoleID)) {
      return new MsgError(`**${message.author.tag}**, you do not have permission to lock this ticket.`)
    }

    message.channel.permissionOverwrites.cache.forEach(function(p) {
      if (p.type === 'member') {
        var member = message.guild.members.cache.find(u => u.id === p.id)
        message.channel.permissionOverwrites.edit(member, {
          "VIEW_CHANNEL": true,
          "SEND_MESSAGES": false
        });
      }
    });
    
    let embed = new Discord.MessageEmbed()
      .setTitle('Ticket Locked  🔒')
      .setDescription(`This ticket has been locked until further notice.`)
      .setColor(colors.success)
    message.channel.send({ 
      embeds: [embed]
    });
    message.delete()
  }
}
const config = require("../../config.json");
const configuration = require('../../configuration/configuration.json')
const guildConf = configuration.guild
const tickets = configuration.tickets
const colors = configuration.colors
const activityCycle = configuration.activityCycle
const filter = require('../../configuration/chatFilter.json');

module.exports = {
  name: 'add',
  aliases: [],
  permissions: [],
  cooldown: null,
  argsreq: 1,
  usage: 'add <@user>',
  description: 'Add a user to a ticket',
  category: 'tickets',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    if (!message.channel.name.startsWith('ticket-')) {
      return new MsgError(`**${message.author.tag}**, you are not inside of a ticket.`)
    }

    if (tickets.onlySupportCanAdd === 'true' && !message.member.roles.cache.has(tickets.supportRoleID)) {
      return new MsgError(`**${message.author.tag}**, you do not have permission to add users to this ticket.`)
    }

    if (message.mentions.members.size < 1) {
      return new MsgError(`**${message.author.tag}**, invalid usage. Please mention a member.\nCorrect Usage: \`.add <@user>\``)
    }

    let member = message.mentions.members.first() || message.guild.members.cache.find(u => u.name == args[0]) || message.guild.members.cache.find(u => u.id == args[0])

    if(message.channel.permissionOverwrites.cache.has(member.id)) {
      return new MsgError(`**${message.author.tag}**, you cannot add the same user twice!`)
    }
    try {
      message.channel.permissionOverwrites.edit(member, { 
        "VIEW_CHANNEL": true, 
        "SEND_MESSAGES": true 
      });
    } catch(err) {
      return new MsgError(`**${message.author.tag}**, there was an error whilst trying to add the user to the ticket.`)
    }

    let button = new Discord.MessageButton()

    
    let embed = new Discord.MessageEmbed()
      .setTitle('User Added')
      .setDescription(`<@${member.id}> has been successfully added to the ticket.`)
      .setColor(colors.success)
    message.reply({ 
      embeds: [embed]
    });
  }
}
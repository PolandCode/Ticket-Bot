require('discord-reply');
const fs = require('fs');
const config = require("../../config.json");
const configuration = require('../../configuration/configuration.json')
const guildConf = configuration.guild
const tickets = configuration.tickets
const colors = configuration.colors
const activityCycle = configuration.activityCycle
const filter = require('../../configuration/chatFilter.json');


const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = {
  name: 'close',
  description: 'Closes the current ticket you are in',
  async execute(Discord, client, message, args, InvalidUsage, MsgError) {

    if (!message.channel.name.startsWith('ticket-')) {
      return new MsgError(`**${message.author.tag}**, you are not inside of a ticket.`)
    }



    if (tickets.onlySupportCanClose === 'true' && message.author.roles.includes(tickets.supportRoleID) === true || tickets.onlySupportCanClose === 'false' || client.author.includes(message.author.id)) {

      const embed = new MessageEmbed()
        .setColor(colors.success)
        .setTitle('Closing Ticket')
        .setDescription('This ticket will be closed in 10 seconds.')
        .setTimestamp()
        .setFooter(`Closed by ${message.author.tag}`, `${message.author.avatarURL()}`)  

      const btnCancelClose = new MessageButton()
        .setLabel('Cancel Close')
        .setCustomId('cancel_close')
        .setStyle('PRIMARY');

      const row = new MessageActionRow()
        .addComponents(
          btnCancelClose
        )

      await message.channel.send({
        embeds: [embed]
      });
        setTimeout(() => message.channel.delete(), 10000);
      return;

    } else {
      
      const embed = new MessageEmbed()
        .setColor(colors.error)
        .setTitle('Insufficient Permission')
        .setDescription('You do not have permission to close this ticket.')
  
      message.reply({
        embeds: [embed]
      });
    }
  }
};

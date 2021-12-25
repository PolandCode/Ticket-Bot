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
  name: 'sendpanel',
  description: 'Send your ticket panel',
  execute(Discord, client, message, args, InvalidUsage, MsgError) {

    const authorTag = ('SpukaMC#2670');
    const authorAvatar = ('https://cdn.discordapp.com/avatars/709080929766998116/a_0ca8763f7fe8a0a000afc88d9da7644c.gif?size=240');

    const channel = (message.channel);

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('🎟  Ticket Center')
      .setDescription(tickets.ticketPanelEmbed)
      .setFooter(`Coded by ${authorTag}`, `${authorAvatar}`)

    const btnOpen = new MessageButton()
        .setLabel('Open Ticket')
        .setCustomId('ticket_create')
        .setStyle('SUCCESS')
        .setEmoji('🎟')
    
    const row = new MessageActionRow()
    .addComponents(
      btnOpen
    )
  
    message.channel.send({
      embeds: [embed],
      components: [row]
    })
    .then((msg) => {
      setTimeout(() => message.delete(), 1000);
    })
    .catch((err) => {
      throw err;
    });
  }
};

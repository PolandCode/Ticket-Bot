require('discord-reply');
const fs = require('fs');
const config = require("../../config.json");
const configuration = require('../../configuration/configuration.json')
const guildConf = configuration.guild
const tickets = configuration.tickets
const colors = configuration.colors
const activityCycle = configuration.activityCycle
const filter = require('../../configuration/chatFilter.json');

const {MessageEmbed} = require('discord.js')

module.exports = {
  name: 'send',
  aliases: [],
  permissions: [],
  cooldown: null,
  argsreq: 1,
  usage: '<message>',
  description: 'Sends a message!',
  category: 'utilities',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    message.delete();
    message.channel.send(args.join(' '));
  }
}
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
  name: 'test',
  description: 'Description',
  execute(Discord, client, message, args, InvalidUsage, MsgError) {

    let menu = new Discord.MessageSelectMenu()
      .setCustomId('menu')
      .addOptions(
        {
          label: "Test",
          description: "You can select me!",
          value: "first_option",
        },
        {
          label: "Test2",
          description: "You can select me too!",
          value: "second_option",
        },
      )
    let row = new MessageActionRow()
      .addComponents(
        menu
      )
    message.reply({
      content: 'Hello there!',
      components: [row]
    });
  }
};
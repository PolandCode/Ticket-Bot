const config = require("../../config.json");
const configuration = require('../../configuration/configuration.json')
const guildConf = configuration.guild
const tickets = configuration.tickets
const colors = configuration.colors
const activityCycle = configuration.activityCycle
const filter = require('../../configuration/chatFilter.json');

module.exports = {
  name: 'closeallnow',
  aliases: ["can"],
  permissions: [],
  cooldown: null,
  argsreq: null,
  usage: '',
  description: 'Tnstantly delete all tickets',
  category: 'tickets',
  dev: true,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {

    client.guilds.cache.get(guildConf.guildID).channels.cache.filter(function(c) {
      if (c.name.toLowerCase().startsWith("ticket-")) {
        c.delete();
        console.log(`${c.name} Deleted`)
      }
    })

  }
}
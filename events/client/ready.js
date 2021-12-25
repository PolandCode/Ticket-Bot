const config = require("../../config.json");
const { MessageEmbed } = require('discord.js');
const configuration = require('../../configuration/configuration.json')
const guildConf = configuration.guild
const tickets = configuration.tickets
const colors = configuration.colors
const activityCycle = configuration.activityCycle
const filter = require('../../configuration/chatFilter.json');
const sqlite = require('sqlite3').verbose();

module.exports = async (Discord, client) => {
  console.log(`${client.user.tag} has logged in (${client.user.id})`);
  console.log(`${client.user.username} developed by MrXex`);
  let db = new sqlite.Database('./database/database.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
  db.run(`CREATE TABLE IF NOT EXISTS userData(userId INTEGER, tag TEXT, username TEXT, ticketsOpenNow INTEGER, ticketsOpened INTEGER, messagesSent INTEGER)`);
  db.run(`CREATE TABLE IF NOT EXISTS ticketData(channelId INTEGER, channelName TEXT, ticketId INTEGER, authorId INTEGER, ticketType TEXT, opened TEXT)`);
  db.run(`CREATE TABLE IF NOT EXISTS guildData(guildId INTEGER, ticketCount INTEGER, memberCount INEGER)`);

  if (activityCycle.randomOrder === 'true') {

    setInterval(() => {

      ticketsTotal = client.guilds.cache.get(guildConf.guildID).channels.cache.filter(function(c) {
        if (c.name.toLowerCase().startsWith("ticket-")) {
          return true;
        }
      }).size

      usersOnline = client.guilds.cache.get(guildConf.guildID).members.cache.filter(m => m.presence ?.status === 'online' || m.presence ?.status === 'dnd' || m.presence ?.status === 'idle').size

      usersTotal = client.guilds.cache.get(guildConf.guildID).memberCount

      let placeholders = [
        {
          "name": "tickets_total",
          "value": ticketsTotal,
        },
        {
          "name": "users_online",
          "value": usersOnline,
        },
        {
          "name": "users_total",
          "value": usersTotal,
        }
      ]

      const random = activityCycle.activities[Math.floor(Math.random() * activityCycle.activities.length)]

      let placeholder = random.placeholder;


      client.user.setStatus(activityCycle.presence)
      client.user.setActivity({
        name: (random.content.replace("{0}", placeholders.find(p => p.name === placeholder).value)),
        type: (random.type)
      });

    }, (activityCycle.interval))

  } else if (activityCycle.randomOrder === 'false') {

    console.log(`You have set "randomOrder" of activityCycle to "false" in the configuration.`)
    console.log(`Ordered activity cycling is currently not supported. Please change the value to "true".`)

  } else {

    console.log(`Please set Config > activityCycle > randomOrder to either "true" or "false".`)

  }



  const channel = client.channels.cache.get(guildConf.logChannelID);
  const startEmbed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Bot Started')
    .setDescription(`The bot has started.\nLogged in as **${client.user.tag}**`)
    .setTimestamp()
    .setFooter(`Bot Developed by MrXez`)
  channel.send({
    embeds: [startEmbed]
  });

}


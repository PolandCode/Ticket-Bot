let cooldown = new Map();
const { MessageEmbed } = require('discord.js')
const config = require("../../config.json");
const configuration = require('../../configuration/configuration.json')
const guildConf = configuration.guild
const tickets = configuration.tickets
const colors = configuration.colors
const activityCycle = configuration.activityCycle
const filter = require('../../configuration/chatFilter.json');
const sqlite = require('sqlite3').verbose();

module.exports = async (Discord, client, message) => {
  if(!message.guild || message.author.bot) return;

  let userId = message.author.id
  let tag = message.author.tag
  let username = message.author.username

  let db = new sqlite.Database('./database/database.db', sqlite.OPEN_READWRITE);

  let query = `SELECT * FROM userData WHERE userId = ?`;
  db.get(query, [userId], (err, row) => {
    if (err) {
      console.log(err);
      return;
    }
    if (row === undefined) {
      let insertdata = db.prepare(`INSERT INTO userData VALUES(?,?,?,?,?,?)`);
      insertdata.run(userId, tag, username, '0', '0', '0');
      insertdata.finalize();
      db.close();
      return;
    } else {
      var userId2 = row.userId;
      var tag2 = row.tag;
      var username2 = row.username;
      var ticketsOpenNow = row.ticketsOpenNow;
      var ticketsOpened = row.ticketsOpened;
      var messagesSent = row.messagesSent;
      messagesSent++;
      // let insertdata = db.prepare(`INSERT INTO userData VALUES(?,?,?,?,?,?)`);
      // insertdata.run(userId2, tag2, username2, ticketsOpenNow, ticketsOpened, messagesSent);
      db.run(`UPDATE userData SET messagesSent = ? WHERE userId = ?`, [messagesSent, userId]);
      // db.close();
      return;
    }
  });

  const prefix = process.env.prefix;
  client.prefix = prefix

  if(new RegExp(`^<@!?${client.user.id}>$`, `gim`).test(message.content)) message.reply({ embeds: [
    new MessageEmbed()
      .setTitle(`Bot Help`)
      .setDescription(`You can access my help menu using \`${client.prefix}help\`!`)
      .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL()}`)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(colors.neutral)
  ] });

  
  filter.restrictedWords.forEach(word => {
    if(message.content.toLowerCase().includes(word)) {
      let censor = new Discord.MessageEmbed()
        .setTitle('Censored!')
        .setDescription('You may not use those words as it is considered profanity.')
        .setColor(colors.error)
      message.delete()
      message.channel.send({ embeds: [censor] }).then(m => {
        setTimeout(() => {m.delete()}, 5000);
      })
    }
  })

  if(message.author.bot || !message.content.startsWith(client.prefix) || !message.guild) return;

  const args = message.content.slice(client.prefix.length).split(/ +/gim);
  const cmd = args.shift().toLowerCase();
  const command = client.commands.get(cmd) || client.aliases.get(cmd);

  if(!command || command.dev == true && !client.author.includes(message.author.id)) return;

  class MsgError {
    constructor(desc) {
      this.description = desc;

      message.reply({ embeds:[
        new MessageEmbed()
          .setDescription(`${this.description}`)
          .setColor(colors.error)
      ]});
    }
  }

  class InvalidUsage {
    constructor(cd) {
      if(!client.commands.has(cd)) return console.log('INCORRECT COMMAND NAME')

      this.cd = cd;
      this.usage = client.commands.get(cd).usage;

      message.channel.send({embeds: [
        new MessageEmbed()
          //.setTitle(`Command Usage`)
          .setDescription(`Command Usage: \`${client.prefix}${command.usage}\`.`)
          //.setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL()}`)
          .setColor(colors.neutral)
      ] });
    }
  }
  
  if (command.permissions?.length && !client.author.includes(message.author.id)) {
    let perms = [];
    for(let i of command.permissions) {
      if(!Discord.Permissions.FLAGS[i]) {console.log(`Invalid Perm: ${i}`); continue;}
      if(!message.member.permissions.has(Discord.Permissions.FLAGS[i])) perms.push(i)
    }
    if(perms.length) return message.channel.send(`Missing Permissions: \`${perms.join()}\``)
  }  
  
  if(command.argsreq && command.argsreq !== null && !args[command.argsreq - 1]) return new InvalidUsage(command.name)

  if(command.cooldown && command.cooldown !== null && !client.author.includes(message.author.id)) {
    let date =  Date.now();
    let cooldowns = cooldown.get(message.author.id);

    if(!cooldowns) {
      cooldown.set(message.author.id, {time: date, cmds: [command.name]})
    } else if (cooldowns.cmds.includes(command.name)) {
      return new MsgError(`You're on cooldown for \`${parseInt(((cooldowns.time + (command.cooldown * 1000)) - date)/1000)}\` seconds on the command: \`${command.name}\``)
    } else if(!cooldowns.cmds.includes(command.name)) {
      cooldowns.time = date;
      cooldowns.cmds.push(command.name);
    };
    
    setTimeout(() => {
      let cooldownarray = cooldown.get(message.author.id).cmds;
      cooldownfilter = cooldownarray.filter(e => e !== command.name);

      cooldown.get(message.author.id).cmds = cooldownfilter
    }, command.cooldown * 1000);
  }
  command.execute(Discord, client, message, args, InvalidUsage, MsgError, configuration);
}
// require('discord-reply');
// const fs = require('fs');
// const config = require("../../config.json");
// const configuration = require('../../configuration/configuration.json')
// const guildConf = configuration.guild
// const tickets = configuration.tickets
// const colors = configuration.colors
// const activityCycle = configuration.activityCycle
// const filter = require('../../configuration/chatFilter.json');

// const PREFIX = (config.prefix);
// const STATUS = (config.status);

// const {MessageEmbed} = require('discord.js')
// module.exports = {
//   name: 'presence',
//   description: 'This command sets the bots presence.',
//   execute(Discord, client, message, args, InvalidUsage, MsgError) {
//   if (message.author.id === (config.botOwnerID)) {
//      if (args[0] === 'dnd') {
//        const STATUS = (args[0])
//        const newObject = {
//          bottoken: (config.bottoken),
//          botOwnerID: (config.botOwnerID),
//          prefix: (config.prefix),
//          status: (args[0]),
//        }
//        fs.writeFile('./config.json', JSON.stringify(newObject, null, 2), err => {
//          if (err) {
//            console.log(err);
//          } else {
//            client.user.setPresence({
//              activity: {name: `${PREFIX}help`, type: "PLAYING"},
//              status: 'dnd'
//            });
//            const dndEmbed = new MessageEmbed()
//              .setColor('RANDOM')
//              .setDescription(`The bot's presencce has been set to "**${STATUS}**".`)
//            message.reply(dndEmbed);
//          }
//        });
//      } else if (args[0] === 'idle') {
//        const STATUS = (args[0])
//        const newObject = {
//          bottoken: (config.bottoken),
//          botOwnerID: (config.botOwnerID),
//          prefix: (config.prefix),
//          status: (args[0]),
//        }
//        fs.writeFile('./config.json', JSON.stringify(newObject, null, 2), err => {
//          if (err) {
//            console.log(err);
//          } else {
//            client.user.setPresence({
//              activity: {name: `${PREFIX}help`, 
//              type: "PLAYING"},
//              status: 'idle'
//            });
//            const idleEmbed = new MessageEmbed()
//              .setColor('RANDOM')
//              .setDescription(`The bot's presencce has been set to "**${STATUS}**".`)
//            message.reply(idleEmbed);
//          }
//        });
//      } else if (args[0] === 'online') {
//        const STATUS = (args[0])
//        const newObject = {
//          bottoken: (config.bottoken),
//          botOwnerID: (config.botOwnerID),
//          prefix: (config.prefix),
//          status: (args[0]),
//        }
//        fs.writeFile('./config.json', JSON.stringify(newObject, null, 2), err => {
//          if (err) {
//            console.log(err);
//          } else {
//            client.user.setPresence({
//              activity: {name: `${PREFIX}help`, type: "PLAYING"},
//              status: 'online'
//            });
//            const onlineEmbed = new MessageEmbed()
//              .setColor('RANDOM')
//              .setDescription(`The bot's presencce has been set to "**${STATUS}**".`)
//            message.reply(onlineEmbed);
//          }
//        });
//      } else if (args[0] === 'sync') {
//        const config = require("../config.json");
//        const STATUS = (config.status)
//          client.user.setPresence({
//            activity: {name: `${PREFIX}help`, type: "PLAYING"},
//            status: (config.status)
//          });
//          const psyncEmbed = new MessageEmbed()
//            .setColor('RANDOM')
//            .setDescription('The status has been synced to the configuration file.')
//          message.reply(psyncEmbed);
//      } else if (args.length === 0) {
//          const phelpEmbed = new MessageEmbed()
//            .setColor('RANDOM')
//            .setTitle('Help Menu - Presence')
//            .setDescription(`**Commands:**\n${PREFIX}presence dnd\n${PREFIX}presence idle\n${PREFIX}presence online\n${PREFIX}presence sync`)
//          message.reply(phelpEmbed)
//      } else {
//        const invuEmbed = new MessageEmbed()
//          .setColor('RANDOM')
//          .setDescription(`Please enter a valid option.\nUse "${PREFIX}presence" for more info.`)
//        message.reply(invuEmbed);
//      }
//    } else {
//      const nopermEmbed = new MessageEmbed()
//        .setColor('RANDOM')
//        .setDescription(`Insufficient Permission.\nPlease use "${PREFIX}help" for help.`)
//      message.reply(nopermEmbed)
//      console.log(`${message.author.tag} tried to use the presence command. Owner ID is: ${config.botOwnerID}`)
//    }
//   }
// };

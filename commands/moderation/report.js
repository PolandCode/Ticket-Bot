// require('discord-reply');
// const fs = require('fs');
// const config = require("../../config.json");
// const configuration = require('../../configuration/configuration.json')
// const guildConf = configuration.guild
// const tickets = configuration.tickets
// const colors = configuration.colors
// const activityCycle = configuration.activityCycle
// const filter = require('../../configuration/chatFilter.json');

// const {MessageEmbed} = require('discord.js')
// module.exports = {
//   name: 'report',
//   description: 'This is the report module of the bot!',
//   execute(message, args, client) {
//     const channel = message.guild.channels.cache.find(c => c.id === (guildConf.reportChannelID));
//     if (channel) {
//       if (args.length === 0) {
//         const usageEmbed = new MessageEmbed()
//           .setColor('RANDOM')
//           .setDescription(`**Usage:** ${config.prefix}report <@user> <reason/situation>`)
//         messgae.lineReply(usageEmbed);
//       } else if (args.length === 1) {
//         const noargs1Embed = new MessageEmbed()
//           .setColor('RANDOM')
//           setDescription(`Please specify the reason for this report.\n**Usage:** ${config.prefix}report <@user> <reason/situation>`)
//         message.lineReply(noargs1Embed)
//       } else if (args.length > 1) {
//         const member = message.mentions.users.first();
//         if (member) {
//           const reason = args.slice(1).join(' ');

//           const infoEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setDescription(`**${message.author.tag}**, you have successfully reported <@${member.id}>.\nYou should receive a staff response soon by either DM or ticket.\nYour report card has been generated below:`)
//           message.author.send(infoEmbed)
//           const reportedEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('User Reported')
//             .setDescription(`**User:** <@${member.id}>\n**Reason:** ${reason}`)
//             .setTimestamp()
//             .setFooter(`Reported by ${message.author.tag}`, `${message.author.avatarURL()}`)
//           message.author.send(reportedEmbed)
//           message.delete()
//           const reportEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle(`New Report`)
//             .setDescription(`**User:** <@${member.id}>\n**Reason:** ${reason}\n**Reported By:** <@${message.author.id}>`)
//             .setTimestamp()
//             .setFooter(`Reported by ${message.author.tag}`, `${message.author.avatarURL()}`)
//           channel.send(`<@&${guildConf.staffID}> There is a new report. Details have been sent below.\n> React with a **Thumbs Up** to let other staff know you have seen it.\n> React with a **Check** to let other staff know the issue has been resolved.`)
//           channel.send(reportEmbed).then((msg) => {
//             msg.react('👍');
//             msg.react('☑');
//           });
//         }
//       }
//     } else {
//       const nsuEmbed = new MessageEmbed()
//         .setColor('#F04848')
//         .setTitle('Channel Not Setup')
//         .setDescription(`
//           **${message.author.tag}**, the server owner has not setup the
//           staff's report inbox yet. Please try again later.`)
//         .setTimestamp()
//         .setFooter('Bot by Spuka#2670')
//       message.lineReply(nsuEmbed);
//     }
//   }
// };

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
//   name: 'kick',
//   description: 'This command kicks a user from the server.',
//   execute (message, args, client) {
//     if (message.member.permissions.has("KICK_MEMBERS") || message.author.id === (config.botOwnerID)) {
//       if (args.length === 0) {
//         const noargsEmbed = new MessageEmbed()
//           .setColor('RANDOM')
//           .setDescription(`**Usage:** ${config.prefix}kick <@user> <reason>`)
//         message.lineReply(noargsEmbed)
//       } else if (args.length === 1) {
//         const member = message.mentions.users.first();
//         if (member) {
//           const MemberTarget = message.guild.members.cache.get(member.id);
//           MemberTarget.kick();
//           const kickEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('Member Kicked')
//             .setDescription(`**User:** <@${MemberTarget.id}>\n**Reason:** None Provided\n**Moderator:** <@${message.author.id}>`)
//             .setTimestamp()
//             .setFooter(`Kicked by ${message.author.tag}`, `${message.author.avatarURL()}`)
//           message.lineReplyNoMention(kickEmbed);
//             const logEmbed = new MessageEmbed()
//               .setColor('RANDOM')
//               .setTitle('Member Kicked')
//               .setDescription(`**User:** <@${MemberTarget.id}>\n**Reason:** None Provided\n**Moderator:** <@${message.author.id}>`)
//               .setTimestamp()
//               .setFooter(`Kicked by ${message.author.tag}`, `${message.author.avatarURL()}`)
//             message.guild.channels.cache.get(guildConf.logChannelID).send(logEmbed);
//         } else {
//           const ckickEmbed = new MessageEmbed()
//             .setColor('#F04848')
//             .setDescription(`**${message.author.tag}**, you cannot kick that member.\nThe user may not exist or the bot may not have permission.`)
//           message.lineReply(ckickEbed);
//         }
//       } else if (args.length > 1) {

//         const member = message.mentions.users.first();

//         if (member) {

//           const MemberTarget = message.guild.members.cache.get(member.id);
//           const reason = args.slice(1).join(' ');

//           MemberTarget.kick();

//           const kickEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('Member Kicked')
//             .setDescription(`**User:** <@${MemberTarget.id}>\n**Reason:** ${reason}\n**Moderator:** <@${message.author.id}>`)
//             .setTimestamp()
//             .setFooter(`Kicked by ${message.author.tag}`, `${message.author.avatarURL()}`)
//           message.lineReplyNoMention(kickEmbed);



//           const logEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('Member Kicked')
//             .setDescription(`**User:** <@${MemberTarget.id}>\n**Reason:** ${reason}\n**Moderator:** <@${message.author.id}>`)
//             .setTimestamp()
//             .setFooter(`Kicked by ${message.author.tag}`, `${message.author.avatarURL()}`)
//           message.guild.channels.cache.get(guildConf.logChannelID).send(logEmbed);
//         } else {
//           const ckickEmbed = new MessageEmbed()
//             .setColor('#F04848')
//             .setDescription(`**${message.author.tag}**, you cannot kick that member.\nThe user may not exist or the bot may not have permission.`)
//           message.lineReply(ckickEbed);
//         }
//       }
//     } else {
//       const nopermEmbed = new MessageEmbed()
//         .setColor('#F04848')
//         .setDescription(`**${message.author.tag}**, you are missing the "**KICK_MEMBERS**" permission.`)
//       message.lineReply(nopermEmbed)
//     }
//   }
// };

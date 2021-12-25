// require('discord-reply');
// const fs = require('fs');
// const ms = require('ms')
// const config = require("../../config.json");
// const configuration = require('../../configuration/configuration.json')
// const guildConf = configuration.guild
// const tickets = configuration.tickets
// const colors = configuration.colors
// const activityCycle = configuration.activityCycle
// const filter = require('../../configuration/chatFilter.json');

// const {MessageEmbed} = require('discord.js')
// module.exports = {
//   name: 'mute',
//   description: 'This command mutes a member.',
//   execute(message, args, client) {

//     if (message.member.permissions.has("MANAGE_MESSAGES")  || message.author.id === (config.botOwnerID)) {

//       const target = message.mentions.users.first();
//       if (target) {
//         let mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
//         let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

//         let MemberTarget = message.guild.members.cache.get(target.id);

//         if (args.length === 1) {
//           MemberTarget.roles.remove(mainRole.id);
//           MemberTarget.roles.add(muteRole.id);
//           const muteEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('Member Muted')
//             .setDescription(`**User:** <@${MemberTarget.id}>\n**Reason:** None Provided\n**Moderator:** <@${message.author.id}>`)
//             .setTimestamp()
//             .setFooter(`Muted by ${message.author.tag}`, `${message.author.avatarURL()}`)
//           message.lineReplyNoMention(muteEmbed);
//           const logEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('Member Muted')
//             .setDescription(`**User:** <@${MemberTarget.id}>\n**Reason:** None Provided\n**Moderator:** <@${message.author.id}>`)
//             .setTimestamp()
//             .setFooter(`Muted by ${message.author.tag}`, `${message.author.avatarURL()}`)
//             message.guild.channels.cache.get(guildConf.logChannelID).send(logEmbed);
//           return
//         } else if (args.length > 1) {

//           const reason = args.slice(1).join(' ');

//           MemberTarget.roles.remove(mainRole.id);
//           MemberTarget.roles.add(muteRole.id);

//           const muteEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('Member Muted')
//             .setDescription(`**User:** <@${MemberTarget.id}>\n**Reason:** ${reason}\n**Moderator:** <@${message.author.id}>`)
//             .setTimestamp()
//             .setFooter(`Muted by ${message.author.tag}`, `${message.author.avatarURL()}`)
//           message.lineReplyNoMention(muteEmbed);
//           const logEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('Member Muted')
//             .setDescription(`**User:** <@${MemberTarget.id}>\n**Reason:** ${reason}\n**Moderator:** <@${message.author.id}>`)
//             .setTimestamp()
//             .setFooter(`Muted by ${message.author.tag}`, `${message.author.avatarURL()}`)
//           message.guild.channels.cache.get(guildConf.logChannelID).send(logEmbed);

//         }

//       } else if (args.length === 0) {

//         const noargsEmbed = new MessageEmbed()
//           .setColor('RANDOM')
//           .setDescription(`**Usage:** ${config.prefix}mute <@user> <reason>`)
//         message.lineReply(noargsEmbed)

//       } else {

//         const cmuteEmbed = new MessageEmbed()
//           .setColor('#F04848')
//           .setDescription(`**${message.author.tag}**, you cannot mute that member.\nThe user may not exist or the bot may not have permission.`)
//         message.lineReply(cmuteEmbed)

//       }

//     } else {

//       const nopermEmbed = new MessageEmbed()
//         .setColor('#F04848')
//         .setDescription(`**${message.author.tag}**, you are missing the "**MANAGE_MESSAGES**" permission.`)
//       message.lineReply(nopermEmbed)

//     }
//   }
// };

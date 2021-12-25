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
//   name: 'unmute',
//   description: 'This command unmutes a member.',
//   execute(message, args, client) {
//     if (message.member.permissions.has("MANAGE_MESSAGES")  || message.author.id === (config.botOwnerID)) {
//       const target = message.mentions.users.first();
//       if (target) {
//         let mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
//         let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
//         let MemberTarget = message.guild.members.cache.get(target.id);
//         MemberTarget.roles.add(mainRole.id);
//         MemberTarget.roles.remove(muteRole.id);
//         const unmuteEmbed = new MessageEmbed()
//           .setColor('RANDOM')
//           .setTitle('Member Unmuted')
//           .setDescription(`**User:** <@${MemberTarget.id}>\n**Moderator:** <@${message.author.id}>`)
//           .setTimestamp()
//           .setFooter(`Unmuted by ${message.author.tag}`, `${message.author.avatarURL()}`)
//         message.lineReplyNoMention(unmuteEmbed);
//         const logEmbed = new MessageEmbed()
//           .setColor('RANDOM')
//           .setTitle('Member Unmuted')
//           .setDescription(`**User:** <@${MemberTarget.id}>\n**Moderator:** <@${message.author.id}>`)
//           .setTimestamp()
//           .setFooter(`Unmuted by ${message.author.tag}`, `${message.author.avatarURL()}`)
//         message.guild.channels.cache.get(guildConf.logChannelID).send(logEmbed);
//       } else if (args.length === 0) {

//         const noargsEmbed = new MessageEmbed()
//           .setColor('RANDOM')
//           .setDescription(`**Usage:** ${config.prefix}unmute <@user>`)
//         message.lineReply(noargsEmbed)

//       } else {

//         const cunmuteEmbed = new MessageEmbed()
//           .setColor('#F04848')
//           .setDescription(`**${message.author.tag}**, you cannot unmute that member.\nThe user may not exist or the bot may not have permission.`)
//         message.lineReply(cunmuteEmbed)

//       }
//     } else {
//       const nopermEmbed = new MessageEmbed()
//         .setColor('#F04848')
//         .setDescription(`**${message.author.tag}**, you are missing the "**MANAGE_MESSAGES**" permission.`)
//       message.lineReply(nopermEmbed)
//     }
//   }
// };

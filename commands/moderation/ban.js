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
//   name: 'ban',
//   description: 'This command bans a user from the server.',
//   execute (message, args, client) {
//     if (message.member.permissions.has("BAN_MEMBERS") || message.author.id === (config.botOwnerID)) {
//       if (args.length > 1) {
//         const member = message.mentions.users.first();
//         if (member) {
//           const MemberTarget = message.guild.members.cache.get(member.id);
//           const reason = args.slice(1).join(' ');
//           MemberTarget.ban({reason: (reason)});
//           const rbanEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('Member Banned')
//             .setDescription(`**User:** <@${MemberTarget.id}>\n**Reason:** ${reason}\n**Moderator:** <@${message.author.id}>`)
//             .setTimestamp()
//             .setFooter(`Banned by ${message.author.tag}`, `${message.author.avatarURL()}`)
//           message.reply({ embeds: [rbanEmbed] });
//           const logEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('Member Banned')
//             .setDescription(`**User:** <@${MemberTarget.id}>\n**Reason:** ${reason}\n**Moderator:** <@${message.author.id}>`)
//             .setTimestamp()
//             .setFooter(`Banned by ${message.author.tag}`, `${message.author.avatarURL()}`)
//           message.guild.channels.cache.get(guildConf.logChannelID).send({ embeds: [logEmbed] });
//           console.log(`${MemberTarget.tag} has been banned by ${message.author.tag}`)
//         } else {
//           const crbanEmbed = new MessageEmbed()
//             .setColor('#F04848')
//             .setDescription(`**${message.author.tag}**, you cannot ban that member.\nThe user may not exist or the bot may not have permission.`)
//           message.reply({ embeds: [crbanEmbed] })
//         }
//       } else if (args.length === 1) {
//         const member = message.mentions.users.first();
//         if (member) {
//           const MemberTarget = message.guild.members.cache.get(member.id);
//           MemberTarget.ban();
//           const banEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('Member Banned')
//             .setDescription(`**User:** <@${MemberTarget.id}>\n**Reason:** None Provided\n**Moderator:** <@${message.author.id}>`)
//             .setTimestamp()
//             .setFooter(`Banned by ${message.author.tag}`, `${message.author.avatarURL()}`)
//           message.reply({ embeds: [banEmbed] });
//           const logEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('Member Banned')
//             .setDescription(`**User:** <@${MemberTarget.id}>\n**Reason:** None Provided\n**Moderator:** <@${message.author.id}>`)
//             .setTimestamp()
//             .setFooter(`Banned by ${message.author.tag}`, `${message.author.avatarURL()}`)
//           message.guild.channels.cache.get(guildConf.logChannelID).send({ embeds: [logEmbed] });
//           console.log(`${MemberTarget.tag} has been banned by ${message.author.tag}`);
//         } else {
//           const cbanEmbed = new MessageEmbed()
//             .setColor('#F04848')
//             .setDescription(`**${message.author.tag}**, you cannot ban that member.\nThe user may not exist or the bot may not have permission.`)
//           message.reply({ embeds: [cbanEmbed] })
//         }
//       } else if (args.length === 0) {
//         const noargsEmbed = new MessageEmbed()
//           .setColor('RANDOM')
//           .setDescription(`**Usage:** ${config.prefix}ban <@user> <reason>`)
//         message.reply({ embeds: [noargsEmbed] })
//       }
//     } else {
//       const nopermEmbed = new MessageEmbed()
//         .setColor('#F04848')
//         .setDescription(`**${message.author.tag}**, you are missing the "**BAN_MEMBERS**" permission.`)
//       message.reply({ embeds: [nopermEmbed] })
//     }
//   }
// };

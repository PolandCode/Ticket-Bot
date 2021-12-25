// require('discord-reply');
// const fs = require('fs');
// const ms = require('ms');
// const config = require("../../config.json");
// const configuration = require('../../configuration/configuration.json')
// const guildConf = configuration.guild
// const tickets = configuration.tickets
// const colors = configuration.colors
// const activityCycle = configuration.activityCycle
// const filter = require('../../configuration/chatFilter.json');

// const {MessageEmbed} = require('discord.js')
// module.exports = {
//   name: 'tempban',
//   description: 'This command tempbans a user from the server.',
//   execute (message, args, client) {
//     if (message.member.permissions.has("BAN_MEMBERS") || message.author.id === (config.botOwnerID)) {
//       if (args.length > 2) {

//         const member = message.mentions.users.first();
//         if (member) {

//           const MemberTarget = message.guild.members.cache.get(member.id);
//           const reason = args.slice(1).join(' ');

//           MemberTarget.ban({reason: (reason)});

//           const rbanEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('Member Banned')
//             .setDescription(`**User:** <@${MemberTarget.id}>\n**Duration:** ${ms(ms(args[1]))}\n**Reason:** ${reason}\n**Moderator:** <@${message.author.id}>`)
//             .setTimestamp()
//             .setFooter(`Banned by ${message.author.tag}`, `${message.author.avatarURL()}`)
//           message.lineReplyNoMention(rbanEmbed);



//           const logEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('Member Banned')
//             .setDescription(`**User:** <@${MemberTarget.id}>\n**Duration:** ${ms(ms(args[1]))}\n**Reason:** ${reason}\n**Moderator:** <@${message.author.id}>`)
//             .setTimestamp()
//             .setFooter(`Banned by ${message.author.tag}`, `${message.author.avatarURL()}`)
//           message.guild.channels.cache.get(guildConf.logChannelID).send(logEmbed);
//           console.log(`${MemberTarget.tag} has been banned by ${message.author.tag}`)

//           setTimeout(function(){
//             message.guild.members.unban(MemberTarget)
//             const logEmbed = new MessageEmbed()
//               .setColor('RANDOM')
//               .setTitle('Ban Expired')
//               .setDescription(`**User:** <@${MemberTarget.id}>\n**Ban Duration:** ${ms(ms(args[1]))}\n**Ban Reason:** ${reason}\n**Moderator:** <@${message.author.id}>`)
//               .setTimestamp()
//               .setFooter(`The user has been unbanned`)
//             client.channels.cache.get(guildConf.logChannelID).send(logEmbed);
//             console.log(`${MemberTarget.tag} has been unbanned automatically.`)
//           }, ms(args[1]));

//         } else {
//           const crbanEmbed = new MessageEmbed()
//             .setColor('#F04848')
//             .setDescription(`**${message.author.tag}**, you cannot ban that member.\nThe user may not exist or the bot may not have permission.`)
//           message.lineReply(crbanEmbed)
//         }
//       } else if (args.length === 2) {

//         const member = message.mentions.users.first();
//         if (member) {

//           const MemberTarget = message.guild.members.cache.get(member.id);

//           MemberTarget.ban();

//           const banEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('Member Banned')
//             .setDescription(`**User:** <@${MemberTarget.id}>\n**Duration:** ${ms(ms(args[1]))}\n**Reason:** None Provided\n**Moderator:** <@${message.author.id}>`)
//             .setTimestamp()
//             .setFooter(`Banned by ${message.author.tag}`, `${message.author.avatarURL()}`)
//           message.lineReplyNoMention(banEmbed);



//           const logEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('Member Banned')
//             .setDescription(`**User:** <@${MemberTarget.id}>\n**Duration:** ${ms(ms(args[1]))}\n**Reason:** None Provided\n**Moderator:** <@${message.author.id}>`)
//             .setTimestamp()
//             .setFooter(`Banned by ${message.author.tag}`, `${message.author.avatarURL()}`)
//           message.guild.channels.cache.get(guildConf.logChannelID).send(logEmbed);
//           console.log(`${MemberTarget.tag} has been banned by ${message.author.tag}`);

//           setTimeout(function(){
//             message.guild.members.unban(MemberTarget)
//             const logEmbed = new MessageEmbed()
//               .setColor('RANDOM')
//               .setTitle('Ban Expired')
//               .setDescription(`**User:** <@${MemberTarget.id}>\n**Ban Duration:** ${ms(ms(args[1]))}\n**Ban Reason:** None Provided\n**Moderator:** <@${message.author.id}>`)
//               .setTimestamp()
//               .setFooter(`The user has been unbanned`)
//             client.channels.cache.get(guildConf.logChannelID).send(logEmbed);
//             console.log(`${MemberTarget.tag} has been unbanned automatically.`)
//           }, ms(args[1]));

//         } else {
//           const cbanEmbed = new MessageEmbed()
//             .setColor('#F04848')
//             .setDescription(`**${message.author.tag}**, you cannot ban that member.\nThe user may not exist or the bot may not have permission.`)
//           message.lineReply(cbanEmbed)
//         }
//       } else if (args.length === 0) {
//         const noargsEmbed = new MessageEmbed()
//           .setColor('RANDOM')
//           .setDescription(`**Usage:** ${config.prefix}tempban <@user> <duraton> <reason>`)
//         message.lineReply(noargsEmbed)
//       }
//     } else {
//       const nopermEmbed = new MessageEmbed()
//         .setColor('#F04848')
//         .setDescription(`**${message.author.tag}**, you are missing the "**BAN_MEMBERS**" permission.`)
//       message.lineReply(nopermEmbed)
//     }
//   }
// };

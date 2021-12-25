// // require('discord-reply');
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
//   name: 'tempmute',
//   description: 'This command tempmutes a member.',
//   execute(message, args, client) {



//     if (message.member.permissions.has("MANAGE_MESSAGES")  || message.author.id === (config.botOwnerID)) {
//       const target = message.mentions.users.first();
//       if (target) {
//         let mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
//         let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

//         let MemberTarget = message.guild.members.cache.get(target.id);

//         if (!args[1]) {
//           const noargs1Embed = new MessageEmbed()
//             .setColor('#F04848')
//             .setDescription(`
//               **${message.author.tag}**, please specify the duration of the mute.
//               **Usage:** ${config.prefix}tempmute @User <duration> <reason>`)
//           message.lineReply(noargs1Embed)
//         } else if (args.length === 2) {

//           MemberTarget.roles.remove(mainRole.id);
//           MemberTarget.roles.add(muteRole.id);

//           const muteEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('Member Muted')
//             .setDescription(`**User:** <@${MemberTarget.id}>\n**Duration:** ${ms(ms(args[1]))}\n**Reason:** None Provided\n**Moderator:** <@${message.author.id}>`)
//             .setTimestamp()
//             .setFooter(`Muted by ${message.author.tag}`, `${message.author.avatarURL()}`)
//           message.lineReplyNoMention(muteEmbed);
//           const logEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('Member Muted')
//             .setDescription(`**User:** <@${MemberTarget.id}>\n**Duration:** ${ms(ms(args[1]))}\n**Reason:** None Provided\n**Moderator:** <@${message.author.id}>`)
//             .setTimestamp()
//             .setFooter(`Muted by ${message.author.tag}`, `${message.author.avatarURL()}`)
//           message.guild.channels.cache.get(guildConf.logChannelID).send(logEmbed);

//           setTimeout(function(){
//             MemberTarget.roles.add(mainRole.id);
//             MemberTarget.roles.remove(muteRole.id);
//             const logEmbed = new MessageEmbed()
//               .setColor('RANDOM')
//               .setTitle('Mute Expired')
//               .setDescription(`**User:** <@${MemberTarget.id}>\n**Duration:** ${ms(ms(args[1]))}\n**Reason:** None Provided\n**Moderator:** <@${message.author.id}>`)
//               .setTimestamp()
//               .setFooter(`The user has been unmuted`)
//             client.channels.cache.get(guildConf.logChannelID).send(logEmbed);
//             console.log(`${MemberTarget.tag} has been unmuted automatically.`)
//           }, ms(args[1]));

//         } else if (args.length > 2) {

//           MemberTarget.roles.remove(mainRole.id);
//           MemberTarget.roles.add(muteRole.id);

//           const reason = args.slice(2).join(' ');
//           const muteEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('Member Muted')
//             .setDescription(`**User:** <@${MemberTarget.id}>\n**Duration:** ${args[1]}\n**Reason:** ${reason}\n**Moderator:** <@${message.author.id}>`)
//             .setTimestamp()
//             .setFooter(`Muted by ${message.author.tag}`, `${message.author.avatarURL()}`)
//           message.lineReplyNoMention(muteEmbed);
//           const logEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('Member Muted')
//             .setDescription(`**User:** <@${MemberTarget.id}>\n**Duration:** ${args[1]}\n**Reason:** ${reason}\n**Moderator:** <@${message.author.id}>`)
//             .setTimestamp()
//             .setFooter(`Muted by ${message.author.tag}`, `${message.author.avatarURL()}`)
//           message.guild.channels.cache.get(guildConf.logChannelID).send(logEmbed);

//           setTimeout(function(){
//             MemberTarget.roles.add(mainRole.id);
//             MemberTarget.roles.remove(muteRole.id);
//             const logEmbed = new MessageEmbed()
//               .setColor('RANDOM')
//               .setTitle('Mute Expired')
//               .setDescription(`**User:** <@${MemberTarget.id}>\n**Duration:** ${ms(ms(args[1]))}\n**Reason:** ${reason}`)
//               .setTimestamp()
//               .setFooter(`The user has been unmuted`)
//             client.channels.cache.get(guildConf.logChannelID).send(logEmbed);
//             console.log(`${MemberTarget.tag} has been unmuted automatically.`)
//           }, ms(args[1]));

//         }

//       } else if (args.length === 0) {
//         const noargsEmbed = new MessageEmbed()
//           .setColor('RANDOM')
//           .setDescription(`**Usage:** ${config.prefix}tempmute <@user> <duraton> <reason>`)
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

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
//   name: 'unban',
//   description: 'This command unbans a user from the server.',
//   execute (message, args, client) {
//     if (message.member.permissions.has("BAN_MEMBERS") || message.author.id === (config.botOwnerID)) {
//       const userID = (args[0])
//       if (userID) {
//         message.guild.fetchBans().then(bans => {
//           if (bans.size === 0) return
//           let bannedUser = bans.find(b => b.user.id == userID)

//           if (bannedUser) {
//             console.log(bannedUser.user)
//             message.guild.members.unban(bannedUser.user)
//             const unbanEmbed = new MessageEmbed()
//               .setColor('RANDOM')
//               .setTitle('Member Unbanned')
//               .setDescription(`**Member:** <@${userID}>\n**Moderator:** <@${message.author.id}>`)
//               .setTimestamp()
//               .setFooter(`Unbanned by ${message.author.tag}`, `${message.author.avatarURL()}`)
//             message.channel.send(unbanEmbed)
//             const logEmbed = new MessageEmbed()
//               .setColor('RANDOM')
//               .setTitle('Member Unbanned')
//               .setDescription(`**Member:** <@${userID}>\n**Moderator:** <@${message.author.id}>`)
//               .setTimestamp()
//               .setFooter(`Unbanned by ${message.author.tag}`, `${message.author.avatarURL()}`)
//             message.guild.channels.cache.get(guildConf.logChannelID).send(logEmbed);
//           } else {
//             const nbEmbed = new MessageEmbed()
//               .setColor('#F04848')
//               .setDescription(`**${message.author.tag}**, that user is not banned.\n**Usage:** ${config.prefix}unban <userid>`)
//             message.lineReply(nbEmbed)
//           }
//         })
//       } else if (args.length === 0) {
//         const naEmbed = new MessageEmbed()
//           .setColor('RANDOM')
//           .setDescription(`**Usage:** ${config.prefix}unban <userid>`)
//         message.lineReply(naEmbed)
//       }
//     } else {
//       const npEmbed = new MessageEmbed()
//         .setColor('#F04848')
//         .setDescription(`**${message.author.tag}**, you are missing the "**BAN_MEMBERS**" permission.`)
//       message.lineReply(npEmbed)
//     }
//   }
// };

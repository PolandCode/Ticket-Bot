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
//   name: 'clear',
//   description: 'This command clears messages in the specified chat!',
//   async execute(Discord, client, message, args, InvalidUsage, MsgError) {
//     if (!args[0]) {
//       const noargsEmbed = new MessageEmbed()
//         .setColor('RANDOM')
//         .setDescription(`**${message.author.tag}**, please specify how many messages to delete.`)
//       message.lineReply(noargsEmbed)
//     } else if (isNaN(args[0])) {
//       const NaNEmbed = new MessageEmbed()
//         .setColor('RANDOM')
//         .setDescription(`**${message.author.tag}**, please enter a real number.`)
//       message.lineReply(NaNEmbed)
//     } else if(args[0] > 100) {
//       const lessEmbed = new MessageEmbed()
//         .setColor('RANDOM')
//         .setDescription(`**${message.author.tag}**, please enter a number less than 100.`)
//       message.lineReply(lessEmbed)
//     } else if(args[0] < 1) {
//       const greaterEmbed = new MessageEmbed()
//         .setColor('RANDOM')
//         .setDescription(`**${message.author.tag}**, please enter a number greater than 1.`)
//       message.lineReply(greaterEmbed)
//     } else if (message.member.permissions.has("MANAGE_MESSAGES") || message.author.id === (config.botOwnerID)) {
//       await message.channel.messages.fetch({limit: ++args[0]}).then(messages => {
//         message.channel.bulkDelete(messages)
//           const logEmbed = new MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('Messages Cleared')
//             .setDescription(`**Channel:** <#${message.channel.id}>\n**Amount:** ${args[0]}\n**Moderator:** <@${message.author.id}>`)
//             .setTimestamp()
//             .setFooter(`Cleared by ${message.author.tag}`, `${message.author.avatarURL()}`)
//           message.guild.channels.cache.get(guildConf.LogChannelID).send(logEmbed);
//       });
//     } else {
//       const npEmbed = new MessageEmbed()
//         .setColor('#F04848')
//         .setDescription(`**${message.author.tag}**, you are missing the "**MANAGE_MESSAGES**" permission.`)
//       message.lineReply(npEmbed)
//     }
//   }
// };

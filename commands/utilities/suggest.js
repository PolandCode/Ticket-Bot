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
//   name: 'suggest',
//   description: 'This commad allows members to suggest features to our server!',
//   execute(Discord, client, message, args, InvalidUsage, MsgError) {
//     if (args.length === 0) {
//       const noargsEmbed = new MessageEmbed()
//         .setColor('RANDOM')
//         .setDescription(`**Usage:** ${config.prefix}suggest (suggestion)`)
//       message.lineReply(noargsEmbed)
//     } else {
//       const channel = message.guild.channels.cache.find(c => c.id === (guildConf.suggestionsID));
//       if (!channel) {
//         const nsuEmbed = new MessageEmbed()
//           .setColor('#F04848')
//           .setTitle('Channel Not Setup')
//           .setDescription(`
//             **${message.author.tag}**, the server owner has not setup the
//             suggestions channel yet. Please try again later.`)
//           .setTimestamp()
//           .setFooter('Bot by Spuka#2670')
//         message.lineReply(nsuEmbed)
//       } else {
//         let messageArgs = args.join(' ');

//         const addedEmbed = new MessageEmbed()
//           .setColor('RANDOM')
//           .setTitle('Suggestion Added')
//           .setDescription(`Your suggestion has been added! - You can view it in <#${guildConf.suggestionsID}>.`)
//           .setTimestamp()
//         message.lineReplyNoMention(addedEmbed)

//         const suggestionEmbed = new MessageEmbed()
//           .setColor('RANDOM')
//           .setTitle(`New Suggestion`)
//           .setDescription(messageArgs)
//           .setTimestamp()
//           .setFooter(`Suggested by ${message.author.tag}`, `${message.author.avatarURL()}`)
//         channel.send(suggestionEmbed).then((msg) => {
//           msg.react('👍');
//           msg.react('👎');
//         });
//         const logEmbed = new MessageEmbed()
//           .setColor('RANDOM')
//           .setTitle('New Suggestion')
//           .setDescription(messageArgs)
//           .setTimestamp()
//           .setFooter(`Suggested by ${message.author.tag}`, `${message.author.avatarURL()}`)
//         message.guild.channels.cache.get(guildConf.logChannelID).send(logEmbed);
//       }
//     }
//   }
// };

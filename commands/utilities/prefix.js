// require('discord-reply');
// const fs = require('fs');
// const config = require("../../config.json");
// const configuration = require('../../configuration/configuration.json')
// const guildConf = configuration.guild
// const tickets = configuration.tickets
// const colors = configuration.colors
// const activityCycle = configuration.activityCycle
// const filter = require('../../configuration/chatFilter.json');

// const PREFIX = (config.prefix);

// module.exports = {
//   name: 'prefix',
//   description: 'Sets the bots prefix',
//   execute(Discord, client, message, args, InvalidUsage, MsgError) {
//     if (message.author.id === (config.botOwnerID)) {
//       if (args.length === 0) {
//         const noargsEmbed = new MessageEmbed()
//           .setColor('#F04848')
//           .setDescription(`**${message.author.tag}**, please specify the prefix you would like to set.`)
//         message.reply(noargsEmbed)
//       } else {
//         const PREFIX = (args[0])
//         const newObject = {
//           botToken: (config.bottoken),
//           botOwnerID: (config.botOwnerID),
//           prefix: (args[0])
//         }
//         fs.writeFile('../../config.json', JSON.stringify(newObject, null, 2), err => {
//           if (err) {
//             console.log(err);
//           } else {
//             const prefixEmbed = new MessageEmbed()
//               .setColor('RANDOM')
//               .setDescription(`The prefix has been set to "**${PREFIX}**".`)
//             message.reply(prefixEmbed)
//           }
//         });
//       }
//     } else {
//       message.reply('Insufficient Permission')
//     }
//   }
// };

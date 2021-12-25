const fs = require('fs');
const config = require("../../config.json");
const configuration = require('../../configuration/configuration.json')
const guildConf = configuration.guild
const tickets = configuration.tickets
const colors = configuration.colors
const activityCycle = configuration.activityCycle
const filter = require('../../configuration/chatFilter.json');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = {
  name: 'help',
  aliases: ['h'],
  permissions: [],
  cooldown: null,
  argsreq: null,
  usage: '',
  description: 'Get an interaction menu with a list of bot commands.',
  category: 'utilities',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    // Buttons

    const btnModuleMain = new MessageButton()
          .setLabel('Main')
          .setCustomId('moduleMain')
          .setStyle('SECONDARY')
          .setEmoji('🌎')

        const btnModuleMusic = new MessageButton()
          .setLabel('Music')
          .setCustomId('moduleMusic')
          .setStyle('SECONDARY')
          .setEmoji('🎵')

        const btnModuleModeration = new MessageButton()
          .setLabel('Moderation')
          .setCustomId('moduleModeration')
          .setStyle('SECONDARY')
          .setEmoji('921499466471723018')

        const btnModuleTickets = new MessageButton()
          .setLabel('Tickets')
          .setCustomId('moduleTickets')
          .setStyle('SECONDARY')
          .setEmoji('🎟')
    
        const mainRow = new MessageActionRow()
          .addComponents(
            btnModuleTickets,
            btnModuleMusic,
            btnModuleModeration
          )
        
        const musicRow = new MessageActionRow()
          .addComponents(
            btnModuleMain,
            btnModuleTickets,
            btnModuleModeration
          )
        
        const ticketRow = new MessageActionRow()
          .addComponents(
            btnModuleMain,
            btnModuleMusic,
            btnModuleModeration
          )
        
        modRow = new MessageActionRow()
          .addComponents(
            btnModuleMain,
            btnModuleMusic,
            btnModuleTickets
          )

      // Embeds

      const mainHelpEmbed = new MessageEmbed()
        .setColor(colors.neutral)
        .setTitle('Help Menu')
        .setDescription(`
         __General Commands:__
          > \`${config.prefix}help\` - Displays this help menu
          > \`${config.prefix}ping\` - Displays the bot's latency
          > \`${config.prefix}suggest\` - Suggest an idea for the server
          > \`${config.prefix}report\` - Report a member to staff
          
          __Other Modules:__
          > Click the corresponding button below.`)
        .setTimestamp()
        .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL()}`)
      const modHelpEmbed = new MessageEmbed()
          .setColor(colors.neutral)
          .setTitle('Help Menu')
          .setDescription(`            __Moderation Commands:__
            > \`${config.prefix}clear\` - Clears messages in a channel
            > \`${config.prefix}kick\` - Kicks a user from the server
            > \`${config.prefix}ban\` - Bans a user from the server
            > \`${config.prefix}tempban\` - Temporarily bans a user from the server
            > \`${config.prefix}unban\` - Unbans a user from the server
            > \`${config.prefix}mute\` - Mutes a user in the server
            > \`${config.prefix}tempmute\` - Temporarily mutes a user in the server
            > \`${config.prefix}unmute\` - Unmutes a user in the serverl
            
            __Other Modules:__
            > Click the corresponding button below.`)
          .setTimestamp()
          .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL()}`)

      const ticketsHelpEmbed = new MessageEmbed()
          .setColor(colors.neutral)
          .setTitle('Help Menu')
          .setDescription(`
            __Tickets Module Commands:__
            > \`${config.prefix}new\` - Creates a new ticket
            > \`${config.prefix}close\` - Closes the current ticket
            > \`${config.prefix}add\` - Adds a user to the ticket
            > \`${config.prefix}remove\` - Removes a user from the ticket
            
            __Other Modules:__
            > Click the corresponding button below.`)
          .setTimestamp()
          .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL()}`)

          const musicHelpEmbed = new MessageEmbed()
          .setColor(colors.neutral)
          .setTitle('Help Menu')
          .setDescription(`
            __Music Module Commands:__
            > \`${config.prefix}join\` - Makes the bot join the current voice channel
            > \`${config.prefix}play\` - Plays music from YouTube
            > \`${config.prefix}stop\` - Stops the music the bot is playing
            > \`${config.prefix}leave\` - Makes the bot leave the current voice channel
            
            __Other Modules:__
            > Click the corresponding button below.`)
          .setTimestamp()
          .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL()}`)

      m = await message.reply({ embeds: [mainHelpEmbed],components: [mainRow] })

      const collector = m.createMessageComponentCollector({ componentType: 'BUTTON' })

      collector.on('collect', async (i) => {
        if(i.user.id == message.author.id) {
          if(i.customId == 'moduleMusic') {
            await i.deferUpdate()
            await m.edit({ embeds: [musicHelpEmbed], components: [musicRow] })
          } else if (i.customId == 'moduleMain')  {
            await i.deferUpdate()
            await m.edit({ embeds: [mainHelpEmbed], components: [mainRow] })
          } else if (i.customId == 'moduleTickets') {
            await i.deferUpdate()
            await m.edit({ embeds: [ticketsHelpEmbed], components: [ticketRow] })
          } else if (i.customId == 'moduleModeration') {
            await i.deferUpdate()
            await m.edit({ embeds: [modHelpEmbed], components: [modRow] })
          }
        } else {
          i.reply({ 
            content: `This is not your help menu. Use \`.help\` to generate your own help menu.`, 
            ephemeral: true 
          });
        }
      }) 
      
  }
}
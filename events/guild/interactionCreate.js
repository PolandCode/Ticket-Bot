require('discord-reply');
const fs = require('fs');
const config = require("../../config.json");
const configuration = require('../../configuration/configuration.json')
const guildConf = configuration.guild
const tickets = configuration.tickets
const colors = configuration.colors
const activityCycle = configuration.activityCycle
const filter = require('../../configuration/chatFilter.json');
const sqlite = require('sqlite3').verbose();

const botAuthorID = ('')

const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = async (Discord, client, interaction) => {
  if(interaction.isButton()) {
    if(interaction.customId == 'ticket_create') {

      const support = interaction.guild.roles.cache.get(tickets.supportRoleID)

      const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone");

      const category = interaction.guild.channels.cache.get(tickets.supportCategoryID);

      const channel = await interaction.guild.channels.create(`ticket-${interaction.user.username}`, { 
        type: 'text',
        parent: category 
      })

      channel.permissionOverwrites.edit(everyone, {
        "VIEW_CHANNEL": false
      });

      channel.permissionOverwrites.edit(support, {
        "VIEW_CHANNEL": true,
        "SEND_MESSAGES": true
      });

      channel.permissionOverwrites.edit(interaction.user, {
        "VIEW_CHANNEL": true,
        "SEND_MESSAGES": true
      })

      if (tickets.pingSupportOnOpen === 'true') {
        channel.send(`<@&${tickets.supportRoleID}>`)
      }

      var categories = []

      tickets.ticketCategories.categories.forEach(function(i) {
        categories.push({
          label: i.displayName,
          description: i.categoryDescription,
          emoji: i.categoryEmoji,
          value: i.value
        });
      });

      let menu = new Discord.MessageSelectMenu()
        .setCustomId('ticket_category_menu')
        .setPlaceholder('Please Choose a Category')
        .addOptions(categories);

      const btnClose = new MessageButton()
        .setLabel('Close Ticket')
        .setCustomId('close_ticket')
        .setStyle('DANGER');

      const row = new MessageActionRow()
        .addComponents(
          btnClose
        )
      
      const menuRow = new MessageActionRow()
        .addComponents(
          menu
        )

      const embed = new MessageEmbed()
        .setColor(colors.neutral)
        .setTitle(`🎟  New Ticket`)
        .setDescription(tickets.newTicketEmbed)
        .setTimestamp()
        .setFooter(`Opened by ${interaction.user.tag}`, `${interaction.user.avatarURL()}`)
      channel.send({
        content: `<@${interaction.user.id}>`, 
        embeds: [embed],
        components: [menuRow, row]
      });

      interaction.reply({ 
        ephemeral: true,
        content: `Your ticket has been opened in <#${channel.id}>.`
      });

      let guildId = guildConf.guildID

      let db = new sqlite.Database('./database/database.db', sqlite.OPEN_READWRITE);

      var query = `SELECT * FROM ticketDataExtra WHERE guildId = ?`;
      db.get(query, [guildId], (err, row) => {
        if (err) {
          console.log(err);
          return;
        }
        if (row === undefined) {
          let insertdata = db.prepare(`INSERT INTO ticketDataExtra VALUES(?,?)`);
          insertdata.run(guildId, "0");
          insertdata.finalize();
          db.close();
        } else {
          var ticketCount = row.ticketCount;
          ticketCount++;
          db.run(`UPDATE ticketDataExtra SET ticketCount = ? WHERE guildId = ?`, [ticketCount, guildId]);


          let channelId = channel.id

          let str = "" + ticketCount
          let pad = "0000"
          let ticketId = pad.substring(0, pad.length - str.length) + str

          let authorId = interaction.user.id

          let channelName = channel.name

          var query = `SELECT * FROM ticketData WHERE channelId = ?`;
          db.get(query, [channelId], (err, row) => {
            if (err) {
              console.log(err);
              return;
            }
            if (row === undefined) {
              let insertdata = db.prepare(`INSERT INTO ticketData VALUES(?,?,?,?,?,?)`);
              insertdata.run(channelId, channelName, ticketId, authorId, "not_set", "true");
              insertdata.finalize();
              db.close();
              //console.log(`${channel.name} has been added to the database.`)
              return;
            } else {
              console.log(`${channelName} in already in the database.`)
            }
          });

          if (tickets.useNumberedTickets === 'true') {
            channel.setName(`ticket-${ticketId}`).then(c => {
              c.setTopic(`Opened by **${interaction.user.tag}** - Ticket ID: **${ticketId}** - Category: **N/A**`)
              return;      
            });
          } else {
            channel.setTopic(`Opened by **${interaction.user.tag}** - Ticket ID: **${ticketId}** - Category: **N/A**`)
          }
        }
      });
    } else if (interaction.customId === 'close_ticket') {
      
      if (interaction.member._roles.includes(tickets.supportRoleID) === true && tickets.onlySupportCanClose === true || tickets.onlySupportCanClose === false || client.author.includes(interaction.user.id)) {

        await interaction.deferUpdate()

        const embed = new MessageEmbed()
          .setColor(colors.success)
          .setTitle('Closing Ticket')
          .setDescription('This ticket will be closed in 10 seconds.')
          .setTimestamp()
          .setFooter(`Closed by ${interaction.user.tag}`, `${interaction.user.avatarURL()}`)  

        const btnCancelClose = new MessageButton()
          .setLabel('Cancel Close')
          .setCustomId('cancel_close')
          .setStyle('PRIMARY');
  
        const row = new MessageActionRow()
          .addComponents(
            btnCancelClose
          )

        await interaction.channel.send({
          embeds: [embed]
        });
          setTimeout(() => interaction.channel.delete(), 10000);
        return;

      } else {
        
        const embed = new MessageEmbed()
          .setColor(colors.error)
          .setTitle('Insufficient Permission')
          .setDescription('You do not have permission to close this ticket.')
    
        interaction.reply({
          embeds: [embed],
          ephemeral: true
        });
      }

    } else if (interaction.customId === 'module_tickets') {
      if (interaction.user.id === interaction.message.mentions.repliedUser.id) {

        await interaction.deferUpdate()

        const btnModuleMain = new MessageButton()
          .setLabel('Main')
          .setCustomId('module_main')
          .setStyle('SECONDARY')
          .setEmoji('🌎')

        const btnModuleMusic = new MessageButton()
          .setLabel('Music')
          .setCustomId('module_music')
          .setStyle('SECONDARY')
          .setEmoji('🎵')

        const btnModuleModeration = new MessageButton()
          .setLabel('Moderation')
          .setCustomId('module_moderation')
          .setStyle('SECONDARY')
          .setEmoji('921499466471723018')
    
        const row = new MessageActionRow()
          .addComponents(
            btnModuleMain,
            btnModuleMusic,
            btnModuleModeration
          )

        const ticketsHelpEmbed = new MessageEmbed()
          .setColor(colors.neutral)
          .setTitle('Help Menu')
          .setDescription(`
            __Tickets Module Commands:__
            > \`${config.prefix}ticket\` - Creates a new ticket
            > \`${config.prefix}close\` - Closes the current ticket
            > \`${config.prefix}add\` - Adds a user to the ticket
            > \`${config.prefix}remove\` - Removes a user from the ticket
            
            __Other Modules:__
            > Click the corresponding button below.`)
          .setTimestamp()
          .setFooter(`Requested by ${interaction.user.tag}`, `${interaction.user.avatarURL()}`)

        interaction.message.edit({
          embeds: [ticketsHelpEmbed],
          components: [row]
        });
      } else {
        interaction.reply({ 
          content: `This is not your help menu. Use \`.help\` to generate your own help menu.`, 
          ephemeral: true 
        });
      }
    } else if (interaction.customId === 'module_music') {
      if (interaction.user.id === interaction.message.mentions.repliedUser.id) {

        await interaction.deferUpdate()

        const btnModuleMain = new MessageButton()
          .setLabel('Main')
          .setCustomId('module_main')
          .setStyle('SECONDARY')
          .setEmoji('🌎')

        const btnModuleTickets = new MessageButton()
          .setLabel('Tickets')
          .setCustomId('module_tickets')
          .setStyle('SECONDARY')
          .setEmoji('🎟')

        const btnModuleModeration = new MessageButton()
          .setLabel('Moderation')
          .setCustomId('module_moderation')
          .setStyle('SECONDARY')
          .setEmoji('921499466471723018')
    
        const row = new MessageActionRow()
          .addComponents(
            btnModuleMain,
            btnModuleTickets,
            btnModuleModeration
          )

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
          .setFooter(`Requested by ${interaction.user.tag}`, `${interaction.user.avatarURL()}`)

        interaction.message.edit({
          embeds: [musicHelpEmbed],
          components: [row]
        });
      } else {
        interaction.reply({ 
          content: `This is not your help menu. Use \`.help\` to generate your own help menu.`, 
          ephemeral: true 
        });
      }
    } else if (interaction.customId === 'module_moderation') {
      if (interaction.user.id === interaction.message.mentions.repliedUser.id) {

        await interaction.deferUpdate()

        const btnModuleMain = new MessageButton()
          .setLabel('Main')
          .setCustomId('module_main')
          .setStyle('SECONDARY')
          .setEmoji('🌎')

        const btnModuleTickets = new MessageButton()
          .setLabel('Tickets')
          .setCustomId('module_tickets')
          .setStyle('SECONDARY')
          .setEmoji('🎟')

        const btnModuleMusic = new MessageButton()
          .setLabel('Music')
          .setCustomId('module_music')
          .setStyle('SECONDARY')
          .setEmoji('🎵')
    
        const row = new MessageActionRow()
          .addComponents(
            btnModuleMain,
            btnModuleTickets,
            btnModuleMusic
          )

        const  moderationHelpEmbed = new MessageEmbed()
          .setColor(colors.neutral)
          .setTitle('Help Menu')
          .setDescription(`
            __Moderation Commands:__
            > \`${config.prefix}clear\` - Clears messages in a channel
            > \`${config.prefix}kick\` - Kicks a user from the server
            > \`${config.prefix}ban\` - Bans a user from the server
            > \`${config.prefix}tempban\` - Temporarily bans a user from the server
            > \`${config.prefix}unban\` - Unbans a user from the server
            > \`${config.prefix}mute\` - Mutes a user in the server
            > \`${config.prefix}tempmute\` - Temporarily mutes a user in the server
            > \`${config.prefix}unmute\` - Unmutes a user in the server
            
            __Other Modules:__
            > Click the corresponding button below.`)
          .setTimestamp()
          .setFooter(`Requested by ${interaction.user.tag}`, `${interaction.user.avatarURL()}`)

        interaction.message.edit({
          embeds: [moderationHelpEmbed],
          components: [row]
        });
      } else {
        interaction.reply({ 
          content: `This is not your help menu. Use \`.help\` to generate your own help menu.`, 
          ephemeral: true 
        });
      }
    } else if (interaction.customId === 'module_main') {
      if (interaction.user.id === interaction.message.mentions.repliedUser.id) {

        await interaction.deferUpdate()

      const btnModuleTickets = new MessageButton()
        .setLabel('Tickets')
        .setCustomId('module_tickets')
        .setStyle('SECONDARY')
        .setEmoji('🎟')

      const btnModuleMusic = new MessageButton()
        .setLabel('Music')
        .setCustomId('module_music')
        .setStyle('SECONDARY')
        .setEmoji('🎵')

      const btnModuleModeration = new MessageButton()
        .setLabel('Moderation')
        .setCustomId('module_moderation')
        .setStyle('SECONDARY')
        .setEmoji('921499466471723018')
  
      const row = new MessageActionRow()
        .addComponents(
          btnModuleTickets,
          btnModuleMusic,
          btnModuleModeration
        )

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
        .setFooter(`Requested by ${interaction.user.tag}`, `${interaction.user.avatarURL()}`)

        interaction.message.edit({
          embeds: [mainHelpEmbed],
          components: [row]
        });
      } else {
        interaction.reply({ 
          content: `This is not your help menu. Use \`.help\` to generate your own help menu.`, 
          ephemeral: true 
        });
      }
    }
  } else if (interaction.isSelectMenu) {
    // await interaction.deferUpdate();
    interaction.reply({
      ephemeral: true,
      content: `Your interaction has been processed, however our menus have not been fully setup yet. Please try again later.`
    });
    return;
  }
}


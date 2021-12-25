const ytSearch = require('yt-search');
const ytdl = require('ytdl-core');
const Discord = require('discord.js')

const config = require("../../config.json");
const configuration = require('../../configuration/configuration.json')
const guildConf = configuration.guild
const tickets = configuration.tickets
const colors = configuration.colors
const activityCycle = configuration.activityCycle
const filter = require('../../configuration/chatFilter.json');

module.exports = {
  name: 'play',
  aliases: [],
  permissions: [],
  cooldown: null,
  //argsreq: 1,
  usage: 'play <song>',
  description: 'Play music',
  category: 'music',
  dev: true,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    const videoFinder = async (query) => {
      const videoResult = await ytSearch(query);

      return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
    }

    if(message.content.includes('https')) {
      return new MsgError(`**${message.author.tag}**, URL search queries are currently not supported.`)
    }

    const video = await videoFinder(args.join(' ')); 

    const voiceDiscord = require('@discordjs/voice');

    let stream;
    
    try {
      stream = ytdl(video.url, { filter: 'audioonly' })
    } catch(err) {
      new MsgError('There was an error')
    }

    const channel = message.member.voice.channel;

    if(!channel){
      return new MsgError(`**${message.author.tag}**, you must be in a voice channel to play music!`)
    }

    const player = voiceDiscord.createAudioPlayer();
    const resource = voiceDiscord.createAudioResource(stream);

    const connection = voiceDiscord.joinVoiceChannel({
      channelId: channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });
    
    player.play(resource)
    connection.subscribe(player);

    player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
      connection.destroy();
    });

    let embed = new Discord.MessageEmbed()
      .setTitle(`Playing Music`)
      .setDescription(`[${video.title}](${video.url})`)
      .setThumbnail(video.thumbnail)
      .setColor(colors.success)
      .setTimestamp()
      .setFooter(`Added by ${message.author.tag}`, `${message.author.avatarURL()}`)

    message.channel.send({ 
      content: `<a:verified:921528187278741514> **${video.title}** is now playing!`,
      embeds: [embed] 
    });
  }
};
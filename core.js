const { Client, Collection, Intents } = require(`discord.js`);
// const database = require('@replit/database');
const sqlite = require('sqlite3').verbose();
let db = new sqlite.Database('./database/database.db');
const Discord = require('discord.js')
const express = require('express')
const path = require('path');
const port = 3000
const app = express()
const index = ('./web/index.html')
const config = require("./config.json");
// const guildConf = require("./configuration/guild.json");
// const tickets = require("./configuration/tickets.json");
// const colors = require("./configuration/colors.json");
const configuration = require('./configuration/configuration.json')
const guildConf = configuration.guild
const tickets = configuration.tickets
const colors = configuration.colors
const activityCycle = configuration.activityCycle
const filter = require('./configuration/chatFilter.json');

const client = new Discord.Client({ intents: 32767 })
client.commands = new Collection();
client.aliases = new Collection();
client.author = ['']

app.use('/', express.static(path.join(__dirname, '/web')));

app.get('/', (req, res) => {
  //res.send('SpukaBot Is Online!')
  res.sendFile(__dirname + "/web/index.html");
})

app.listen(port, () => {
 console.log(`Listening at http://localhost:${port}`)
})

const handlers = ['command_handler', 'event_handler'].forEach(handler =>{
  require(`./handlers/${handler}`)(client, Discord);
});


client.login(process.env.token)
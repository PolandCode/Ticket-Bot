const { readdirSync } = require('fs');

module.exports = (client, Discord) => {
  for(let dir of readdirSync('./commands/')) {
    for(let command of readdirSync(`./commands/${dir}`)) {
      const cmd = require(`../commands/${dir}/${command}`)
      // if(cmd.argsreq && cmd.argsreq !== null && (!cmd.usage || cmd.usage == '')) return console.log(`COMMANDS USAGE REQ: ${command}`);

      if(cmd.name) {
        client.commands.set(cmd.name.toLowerCase(), cmd);
        console.log(`[Command]`, `{${cmd.category}}`, `(${cmd.name}) Loaded!`)
      } else {
        //console.log(`${command}`)
      }
      if(cmd.aliases?.length) {
        for(let i of cmd.aliases) {
          client.aliases.set(i, cmd);
        }
      }
    }
  }
}
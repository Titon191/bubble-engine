const { MessageEmbed } = require("discord.js")

module.exports = {
    name:"ping",
    description:"Ping!",
    category: "bot",
    
    run(msg) {
      const embed = new MessageEmbed()
      .setTitle('🏓 Pong!')
      .addField('Bot ping', `\`${client.ws.ping}ms\``)
      .setColor('#00ff59')
      .setTimestamp()
      msg.channel.send(embed)
     
  }
    

    
}

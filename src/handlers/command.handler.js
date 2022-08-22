//////////////////////////////////////
//  ____        _     _     _       //
// |  _ \      | |   | |   | |      //
// | |_) |_   _| |__ | |__ | | ___  //
// |  _ <| | | | '_ \| '_ \| |/ _ \ //
// | |_) | |_| | |_) | |_) | |  __/ //
// |____/ \__,_|_.__/|_.__/|_|\___| //
//////////////////////////////////////
//      BUBBLE ENGINE v.1.1.3       //
//////////////////////////////////////
//     AUTHOR: TITON, DIAXMANPL     //
////////////////////////////////////// 
                                 

const { MessageEmbed, MessageAttachment } = require('discord.js');
const { readdirSync } = require("fs")
const { Collection } = require("discord.js")
const ascii = require("ascii-table")

const table = new ascii().setHeading("Command","Status", "Warnings")
const f = require(__dirname + "/../functions.js")
const { textPermissions } = f
const { type } = require('os');
const parse = require("parse-ms")

bubble = require("../../bubble-config");;
var dir = bubble.PROJECT_DIR;
client.config = require(dir + "/src/config/config.js")
const { admins } = client.config
// const { Database } = require("quickmongo");
// const { Player } = require("discord-music-player");

// ============================== //
//         Bot modules            //
// ============================== //


// Database
// client.db = new Database(process.env.mongoUrl)

// Definiuje wersję silnika Bubble
client.engine = "Bubble Engine"
client.engine.version = "1.1.3"

  // Komendy - odpowiada za wykonywanie komend
client.commands = new Collection()

  // musicPlayer
// client.musicPlayer = new Player(client, {
//  leaveOnEmpty: false, 
// })

module.exports = (client) => {


    // skraca client.db na db
  let db = client.db

    // Szuka plików z komendami (.cmd.js)
    const commandFiles = readdirSync(dir + "./src/cmds").filter(file => file.endsWith(".cmd.js"))

    for (const file of commandFiles) {
        const command = require(`${dir}./src/cmds/${file}`)
        const errors = []
        
        if (command.name) {
            client.commands.set(command.name, command)
            if (!command.description) errors.push("⚠ WARN: The command has no description")
            if (!command.category && !command.devlvl) errors.push("⚠ WARN: The command does not have a category")
       
            if (command.args && command.args > 0 && !command.ussage) errors.push("⚠ WARN: The command requires arguments and has no 'usage' value")
            if(!errors.length) errors.push("None")
            table.addRow(file,"✅", errors.join(", "))
        } else {
            table.addRow(file,"❌ - 'name' value is missing", "<---")
            continue
        }
    }
    
    // Wyświetla tabelę komend.
    console.log(table.toString())



// Powitania i autorole
    client.on('guildMemberAdd', async member => {
    
     // Tutaj wstaw kod, który wykona sie po dołączeniu
     // członka na serwer
     
  });

  // Pożegnania
  client.on('guildMemberRemove', async member => {

   // Tutaj wstaw kod, który wykona sie po wyjściu
   // członka z serwera
   
     });



    client.on("message", async (msg) => {
      
        const { author, guild, channel } = msg
        
        // Ustaw prefix bota (Możliwe jest pobranie prefixu z bazy danych - dowiedz się więcej w dokumentacji)
          let prefix = env.process.prefix
          if (!prefix) {
            console.log('The prefix has not been specified. Prefix set to "!"')
            prefix = "!";
          }
     
     
        // Sprawdza, czy użytkownik jest botem.
        if (author.bot) {
          return
        }
        

        // Anty-invite
        if (!msg.member.hasPermission('ADMINISTRATOR')) {

// Wpisz "nie", jeśli chcesz wyłączyc ten moduł. (Możliwe jest pobranie statusu antyinvite z bazy danych - dowiedz się więcej w dokumentacji)
       let antyinvite = "tak" 
       
       
          if (antyinvite == 'tak') {
           
            if (msg.content.includes("discord.gg/")) {
            
              msg.delete()
              const emb = new MessageEmbed()
              .setTitle('⛔ Anty-invite')
              .setColor('RED')
              .setFooter(msg.author.tag, msg.author.displayAvatarURL())
              .setDescription(`This server has active anty-invite module. All discord invites will be deleted.`)
              return msg.channel.send(emb);
  
            } 
          }
  
        }
       
        // Ignoruje wiadomości bez prefixu.
        if (!msg.content.startsWith(prefix)) {
          return;
        }
      
        
      
        // Zmienna z argumentami.
       const args = msg.content.slice(prefix.length).trim().split(/ +/g)
  

        // Zmienna z komendą.
        const cmdName = args.shift().toLowerCase()
        const cmd =
        client.commands.get(cmdName) ||
        client.commands.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(cmdName),
        )
  
        
      // Sprawdza, czy komenda istnieje
      if (!cmd) return

   
        
        if (cmd.guildOnly && !guild) {
            return msg.channel.send(":no: This command cannot be used in a private message.")
        }

        //===================================================
        //
        //              Sprawdza uprawnienia
        //
        //===================================================

        // Sprawdza uprawnienia bota
        if (cmd.botPermissions && cmd.botPermissions.length) {
          if (!guild.me.permissionsIn(channel).has(cmd.botPermissions)) {
            const noperm = new MessageEmbed()
            .setTitle('Bot does not have permission')
            .setColor('RED')
            .setDescription(`:no: Bot does not have permissions to execute this command.\nRequired permissions: **${f.textPermissions(cmd.userPermissions).toUpperCase()}**`)
            .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL())
            return channel.send(noperm)
          }
        }
        
        // Sprawdza uprawnienia użytkownika
        if (cmd.userPermissions && cmd.userPermissions.length) {
          if(!msg.member.permissionsIn(channel).has(cmd.userPermissions) && !admins.includes(msg.author.id)) {
            const noperm = new MessageEmbed()
            .setTitle('You dont\' have permissions')
            .setColor('RED')
            .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL())
            .setDescription(`:no: You do not have sufficient permissions to execute this command\nRequired permissions: **${f.textPermissions(cmd.userPermissions).toUpperCase()}**`)
            return channel.send(noperm)
          }
        }


        // Sprawdza, czy argumenty są wymagane i czy zostały podane
        if (cmd.args && args.length < cmd.args ) {
            let reply =  ":no: Please provide argument(s)."

            if (cmd.ussage) {
               if (typeof(cmd.ussage) === "string") {
                reply = reply + `\nCorrect ussage: \`${prefix}${cmdName} ${cmd.ussage}\``
               } else {
                reply += "\nCorrect ussage: " + cmd.ussage.map(u => `\`${prefix}${cmdName} ${u}\``).join(" lub ")
               }
               if (cmd.example) {
                   if (typeof(cmd.example) === "string") {
                   reply += `\nFor example: \`${prefix}${cmdName} ${cmd.example}`
                   } else {
                       reply += "\nFor example: " + cmd.example.map(e => `\`${prefix}${cmdName} ${e}\``).join(" lub ")
                   }
               }
            }
            
            const errembed = new MessageEmbed()
            .setTitle("Error occurred")
            .setDescription(reply)
            .setFooter('Check logs for more details')
            .setColor('#00ff77')
            return msg.channel.send(errembed)
            
        }
   
        try {
           cmd.run(msg, args, cmdName)
        } catch(error) {
          // Wysyła informacje o błędzie
            console.log(error)
         
            channel.send("An error occurred while executing the command. More information should be found in the console. Do you think it's a Bubble Engine bug? Report the issue on Github.")
         
            const embed = new MessageEmbed()
            .setColor()
            .setTitle("Error")
            .setDescription(`**Error type:** occurred while executing command. \n**Command:** ${cmd.name} \n**User:** <@${msg.author.id}> \n**Channel:** ${msg.channel.type === "text" ? "server" : "DM"}`)

            w.send(embed)
            channel.send("Unexpected error occurred.")
            
        }
           
        
      
    
      
      
        
        
      
              
              
               
      })
}
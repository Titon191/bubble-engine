const Discord = require('discord.js');
global.client = new Discord.Client({
	intents: new Discord.Intents(32767)
})
;

global.f = require("./functions.js")


// Command handler, eventHandler
const commandHandler = require("./handlers/command.handler")
const eventHandler = require("./handlers/event.handler")


var bubble = require("../bubble-config");
var dir = bubble.PROJECT_DIR; 
client.config = require(dir + "/src/config/config.js")
// Wczytuje commandHandler
commandHandler(client)
//Wczytuje eventHandler
eventHandler(client)
const { token } = client.config
// Logging with token from config.js
client.login(token)

// Client on ready actions
client.on("ready", () => {
   
  })

process.on('uncaughtException', err =>  console.log('Caught exception:' + err));
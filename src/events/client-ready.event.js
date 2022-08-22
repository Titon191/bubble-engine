const log = console.log
const chalk = require("chalk")
const { Collection } = require("discord.js")

module.exports = {
    name: "ready",

    run() {
 
 
        log(chalk.green(`Logged as`),chalk.blue(`${client.user.tag}`))
        log(chalk.gray('Successfully started Bubble Engine'))
        client.user.setActivity(`${client.guilds.cache.size} servers`, { type: "WATCHING" })
      
    }
}


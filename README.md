
# Bubble engine
**This package allows you to easily and quickly create bots based on the discord.js library.**
![Bubble logo](https://imgur.com/2PQuVwU.png)
## Features
- Built-in command & event handler
- Multifunctional and easy to use
- Simple configuration using terminal
- Transparent and reliable error return system
- The ability to import ready-made commands

## Installation
Paste the code snippet below into the terminal.
```js
npm i bubble-engine
```
After installation is complete, use the `bubble config` command to configure the bot.

### Very important
In your project's root path, create a file called `bubble-config.js` and paste the following code into it. If you do not do this, Bubble will not be able to read the commands and events you have created.
```js
module.exports = {
    PROJECT_DIR : __dirname
}
```

## Starting bot
To run the bot use the command `bubble start`.

If you are in the process of working on the bot, it is recommended to use the `bubble start --dev` command, thanks to which the bot will reset itself when it detects changes to any file.
## Creating commands
If the installation was successful, you should have an "src" and "cmds" folder in your project and a "ping.cmd.js" command file.
The "cmds" folder is where you should put your command files. To create an empty command, type `bubble cmdcreate` and fill in the details.
Example 'ping' command with bot response.
```js
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
  }}
```
## Importing commands
Except for creating commands, you can also import commands created by other users from Bubble Community.
To import command, use `bubble import <cmd>`. For example, `bubble import ping.cmd` 
## Publishing commands
To publish command please visit https://titondesign.pl/bubble/publish.php

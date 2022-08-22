#!/usr/bin/env node
const chalk = require('chalk');
const { Command } = require('commander');
const program = new Command();
program.addHelpCommand(false);
const fs = require('fs');
const { exit } = require('process')

global.bubble = require("./bubblecmd.js")

program
  .name(chalk.green.bold('bubble'))
  .description(chalk.greenBright('Bubble - Create discord.js bots easily'))
  .version('1.1.3');

program.command('start')
  .description('Start a bot')
  .option('--dev', 'Run using nodemon')
  .action((str, options) => {
    if (options.dev) {
    require("child_process").fork("nodemon ./src/index.js");
    console.log(chalk.blue('Starting bot in dev version (nodemon)'))
    } else {
    require("child_process").fork("./node_modules/bubble-engine/src/index.js");
    console.log(chalk.green('Starting bot...'))
    }
  });

program.command('config')
  .description('Set up bot configuration')
  .action((str, options) => {
    require("child_process").fork("./node_modules/bubble-engine/autoconfig.js");
  });

program.command('cmdcreate')
  .description('Create a command')
  .action((str, options) => {
    require("child_process").fork("./node_modules/bubble-engine/cmdcreate.js");
  });

program.command('import')
  .description('Import command from Bubble Community')
  .argument('<cmdlink>', 'cmd name, ex. ping.cmd')
  .action((link, options) => {
    const https = require('http');
    var request = require('request'); // include request module
    request(`http://vps.titondesign.pl/bubblecommunity/${link}.js`, function (err, resp) {
       if (resp.statusCode === 200) {
          const file1 = fs.createWriteStream(link + ".js");
          const request = https.get(`http://vps.titondesign.pl/bubblecommunity/${link}.js`, function(response) {
          response.pipe(file1);
      
          // after download completed close filestream
          file1.on("finish", () => {
             file1.close();
             console.log(chalk.green(`[Bubble Community] Downloaded: ${link}.js`));
             var oldPath = `${link}.js`
             var newPath = `src/cmds/${link}.js`

              fs.rename(oldPath, newPath, function (err) {
                if (err) throw err
            
              })
             console.log(chalk.blue(`[Bubble Community] The downloaded file is in the "cmds" folder`));
         });
      });
       }  else {
       // file does not exist
       console.log(chalk.red.bold(`Command ${link} not found in Bubble Community.`))
       exit();
       }
       
    });
  });
program.parse();
#!/usr/bin/env node
const chalk = require('chalk');
console.clear()
const fs = require('fs');
const { exit } = require('process');
console.log(chalk.bold.cyan.bgRgb(20, 30, 45)('<---    Command Import    --->'));
var bubble = require("./bubble-config");
var dir = bubble.PROJECT_DIR; 
const prompt = require("prompt-sync")({ sigint: true });
const https = require('https'); // or 'https' for https:// URLs

let link = prompt("> Enter cmd link (ex. ping.cmd): ");
if (!link) {
    console.log(chalk.red.bold("Link can't be empty. Import aborted."))
    exit()
}

    console.log(chalk.bold(`Searching cmd in Bubble Community...`))

 
var request = require('request'); // include request module
request(`https://vps.titondesign.pl/bubble/${link}.js`, function (err, resp) {
   if (resp.statusCode === 200) {
      const file1 = fs.createWriteStream(dir + "/src/cmds/" + link + ".js");
      const request = https.get(`https://vps.titondesign.pl/bubble/${link}.js`, function(response) {
      response.pipe(file1);
  
      // after download completed close filestream
      file1.on("finish", () => {
         file1.close();
         console.log(chalk.green(`[Bubble Community] Downloaded: ${link}.js`));
     });
  });
   } 
   // file does not exist
   console.log(chalk.red.bold(`Command ${link} not found in Bubble Community.`))
   exit();
   
});
#!/usr/bin/env node
const chalk = require('chalk');
console.clear()
const fs = require('fs');
const { exit } = require('process');
console.log(chalk.bold.cyan.bgRgb(20, 30, 45)('<---    Bubble Engine Configuration    --->'));

const prompt = require("prompt-sync")({ sigint: true });
const https = require('https'); // or 'https' for https:// URLs
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

let botname = prompt("> Bot name: ");
let botprefix = prompt("> Prefix: ");
let botauthor = prompt("> Author(s): ");
let bottoken = prompt("> Token: ");
if (!bottoken) {
    console.log(chalk.red.bold("Token can't be empty. Configuration aborted."))
    exit()
}
let configok = prompt(chalk.bold.cyan("Configuration ready. Apply changes? (Y/n): "));
if ((configok = "Y") || (configok = "y") || (configok = "")) {
    console.clear()

    var bubble = require("./bubble-config");
    var dir = bubble.PROJECT_DIR; 
console.log(dir)


if (!fs.existsSync(`${dir}/src`)) {
    fs.mkdirSync(dir + "/src", { recursive: true });
}

var dir2 = dir + "/src/config"

if (!fs.existsSync(dir2)){
    fs.mkdirSync(dir2);
}
var dir3 = dir + "/src/cmds"

if (!fs.existsSync(dir3)){
    fs.mkdirSync(dir3);
}
var dir4 = dir + "/src/events"

if (!fs.existsSync(dir4)){
    fs.mkdirSync(dir4);
}

    fs.createWriteStream(dir + "/src/config/config.js")
    

    function sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }

      async function env() {
        await sleep(300);
    fs.writeFileSync(`${dir}/src/config/config.js`, `module.exports = {\ntoken:"${bottoken}",\nprefix:"${botprefix}",\nadmins:[""] // enter bot admins discord id here - they will have full access to the bot \n}`);

      }
      env()

    console.log(chalk.bold.cyan(`Succesfully configured Bubble Engine for ${botname}`))
    console.log(chalk.bold.greenBright.bgHex("#102615")(`Starting file installation...`))
    console.log(chalk.gray('[Bubble Community] Importing from @Bubble/basic.preset'))

    const file1 = fs.createWriteStream(dir + "/src/cmds/ping.cmd.js");
    const request = https.get("https://titondesign.pl/bubble/ping.cmd.js", function(response) {
    response.pipe(file1);

    // after download completed close filestream
    file1.on("finish", () => {
       file1.close();
       console.log(chalk.green("[Bubble] Downloaded: ping.cmd.js"));
   });
});
}

const file2 = fs.createWriteStream(dir + "/src/events/ready.event.js");
    const request2 = https.get("https://titondesign.pl/bubble/client-ready.js", function(response2) {
    response2.pipe(file2);

    // after download completed close filestream
    file2.on("finish", () => {
       file2.close();
       console.log(chalk.green("[Bubble] Downloaded: client-ready.event.js"));
   });
});

const file3 = fs.createWriteStream(dir + "/src/config/.env");
console.log(chalk.green("[Bubble] Created config.js file"));

async function readyuse() {
    await sleep(350)
    console.log(chalk.bold.greenBright.bgHex("#102615")(`Bubble Engine is ready to use!\nWrite 'bubble start' to run bot.`))
}
readyuse();

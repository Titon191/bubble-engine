#!/usr/bin/env node
const chalk = require('chalk');
console.clear()
const fs = require('fs');
const { exit } = require('process');
console.log(chalk.bold.cyan.bgRgb(20, 30, 45)('<---    Command Creator    --->'));

const prompt = require("prompt-sync")({ sigint: true });
const https = require('https'); // or 'https' for https:// URLs
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
let commandname = prompt("> Command name: ");
let commandescription = prompt("> Description: ");
let commandcategory = prompt("> Category (ex. moderation): ");

if (!commandname) {
    console.log(chalk.red.bold("Command name can't be empty. Creation aborted."))
    exit()
}
//fs.createWriteStream(`src/cmds/${commandname}.cmd.js`);
console.log(chalk.bold.cyan("Command created!"));
async function writecmd() {
    await sleep(200)
    fs.writeFileSync(`src/cmds/${commandname}.cmd.js`, `module.exports = {\nname:"${commandname}",\ndescription:"${commandescription}",\ncategory:"${commandcategory}",\nrun(msg) {}}`);
}
writecmd()

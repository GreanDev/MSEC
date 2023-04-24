//Run Initial setup
const { read } = require('fs');
let config = require('./config.json');
const prompt = require('prompt-sync')();
const fs = require('fs');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function startSetup(){
    config.firstStart = false;
    
  const serverName = prompt('Enter Server Name: ');
  config.user.serverName = serverName;
  console.log(`Server Name is now: ${serverName}`);
  const welcomeMessage = prompt('Enter Server Message: ');
  config.user.welcomeMessage = welcomeMessage;
  console.log(`Server Message is now: ${welcomeMessage}`);
  saveToFile();
}

function saveToFile(){
    let data = JSON.stringify(config);
    fs.writeFileSync('./config.json', data);
}

module.exports = { startSetup }
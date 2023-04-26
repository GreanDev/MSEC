//Main script
const encrypt = require('./ed');
const connector = require('./connector');
const fs = require('fs');
const prompt = require('prompt-sync')();
const aprompt = require('prompt-async');
const ui = require('./ui');
let publicKey = '';
let privateKey = '';
let serverKey = '';
let serverIp = '';

function Init(){
    let ip = prompt("Enter server IP>");
    serverIp = ip;
    
    connectToServer(serverIp);
}

function readMessages(){
    connector.getServerChatHistory(serverIp, privateKey);
    ui.messages.content = fs.readFileSync('./localHistory.txt').toString();
    ui.setHistory("f");
}



function connectToServer(ip){
    
    encrypt.generateClientKeys();
    writeKeys()
    connector.sendServerLogon(ip, publicKey)
    writeServerKey();
    StartMsg();
    console.log(`Ready for messsages`);
    ui.giveUiData(serverIp);
}

function writeKeys(){
     publicKey = fs.readFileSync('./public_key.pem').toString();
     privateKey = fs.readFileSync('./private_key.pem').toString();
}
function writeServerKey(){
   serverKey = fs.readFileSync('./server_pub.pem');
}

Init();

function StartMsg(){
    setInterval(readMessages, 500);
}


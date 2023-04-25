//Main script
const encrypt = require('./ed');
const connector = require('./connector');
const fs = require('fs');
const prompt = require('prompt-sync');


function connectToServer(ip){
    
    encrypt.generateClientKeys();
    connector.sendServerLogon('127.0.0.1', fs.readFileSync('./public_key.pem').toString());
    connector.getServerChatHistory('127.0.0.1', fs.readFileSync('./public_key.pem').toString());
    connector.sendChatMessage('127.0.0.1', fs.readFileSync('./server_pub.pem'), 'Heilo')
}

connectToServer();

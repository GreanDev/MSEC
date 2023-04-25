//Main script
const encrypt = require('./ed');
const connector = require('./connector');
const prompt = require('prompt-sync');

function connectToServer(ip){
    encrypt.generateClientKeys();
}

connectToServer();

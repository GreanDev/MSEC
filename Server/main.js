//Main script
const config = require("./config.json");
const setup = require('./setup');
const connector = require('./connector');
const welcomer = require('./welcomer');
const encrypt = require('./ed');
const crypt = require('crypto');
const { fstat } = require("fs");



function checkForSetup(){
    if (config.firstStart){
        setup.startSetup();
        console.log("Setup Done! Please Restart the app");
    }
    else{
        startServer();
    }
}

function startServer(){
    encrypt.makeKeys();
    console.log(`${config.user.serverName} will now start with encrpytion key: ${config.encryption.token} and IV: ${config.encryption.iv.toString('hex')}`);
    let enc = encrypt.encryptMessage("Test Message");
    console.log(`Encryption test message: ${enc.toString('hex')}`);
    console.log(`Decodes to: ${encrypt.decryptMessage(enc)}`);
    console.log(`Starting on port 8080`);
    connector.listen();
}


checkForSetup();
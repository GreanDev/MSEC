//Main script
const config = require("./config.json");
const setup = require('./setup');
const connector = require('./connector');
const welcomer = require('./welcomer');
const encrypt = require('./ed');
const crypt = require('crypto');



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
    console.log(`${config.user.serverName} will now start with encrpytion key: ${config.encryption.token} and IV: ${config.encryption.iv.toString('hex')}`);
    console.log(`Encryption test message: ${encrypt.encryptMessage("Test Message", config.encryption.iv)}`);
}


checkForSetup();
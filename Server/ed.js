//Encrypt and Decrypt messages
const { buffer } = require('stream/consumers');
const config = require('./config.json');
const crypt = require('crypto');
const algorithm = 'aes-128-cbc';


function encryptMessage(message, iv){
    let cipher = crypt.createCipheriv(algorithm, Buffer.from(config.encryption.token), Buffer.from(config.encryption.iv));
    let encryptedMessage = cipher.update(message);
    encryptMessage = Buffer.concat([encryptedMessage, cipher.final()]);
    return encryptMessage.toString('base64');
}

module.exports = { encryptMessage };
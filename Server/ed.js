//Encrypt and Decrypt messages
const { buffer } = require('stream/consumers');
const config = require('./config.json');
const crypt = require('crypto');
const algorithm = 'aes-128-cbc';


function encryptMessage(message){
    let cipher = crypt.createCipheriv(algorithm, Buffer.from(config.encryption.token), Buffer.from(config.encryption.iv));
    let encryptedMessage = cipher.update(message);
    encryptedMessage = Buffer.concat([encryptedMessage, cipher.final()]);
    return encryptedMessage;
}

function decryptMessage(encryptedMessage){
    let decipher = crypt.createDecipheriv(algorithm, Buffer.from(config.encryption.token), Buffer.from(config.encryption.iv));
    let decryptedMessage =decipher.update(encryptedMessage);
    decryptedMessage = Buffer.concat([decryptedMessage, decipher.final()]);
    return decryptedMessage.toString();
}

function rsaEncryptMessage(message, pubKey){
    return crypt.publicEncrypt({
        key: pubKey,
        padding: crypt.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    }, Buffer.from(message)).toString('base64');
}

module.exports = { encryptMessage, decryptMessage, rsaEncryptMessage };
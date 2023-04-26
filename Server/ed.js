//Encrypt and Decrypt messages
const { buffer } = require('stream/consumers');
const config = require('./config.json');
const crypt = require('crypto');
const  fs = require('fs');
const algorithm = 'aes-128-cbc';

function makeKeys(){
    const { publicKey, privateKey } = crypt.generateKeyPairSync("rsa", {
        modulusLength: 2048,
    });

     privateString = privateKey.export({format: 'pem', 'type': 'pkcs1' });
     publicString = publicKey.export({format: 'pem', 'type': 'pkcs1' });

     fs.writeFileSync('./Keys/private_key.pem', privateString);
     fs.writeFileSync('./Keys/public_key.pem', publicString);
}

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
        padding: crypt.constants.RSA_PKCS1_PADDING,
        oaepHash: 'sha256'
    }, Buffer.from(message)).toString('base64');
}

function rsaDecryptMessage(message, privKey){
    return crypt.privateDecrypt({
        key: privKey,
        padding: crypt.constants.RSA_PKCS1_PADDING,
        oaepHash: 'sha256'
    }, Buffer.from(message, 'base64')).toString();
}

module.exports = { encryptMessage, decryptMessage, rsaEncryptMessage, rsaDecryptMessage, makeKeys };
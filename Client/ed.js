//Encryption And Decryption
const crypt = require('crypto');
const fs = require('fs');
let privateString
let publicString
function generateClientKeys(){
    const { publicKey, privateKey } = crypt.generateKeyPairSync("rsa", {
        modulusLength: 4096,
    });

     privateString = privateKey.export({format: 'pem', 'type': 'pkcs1' });
     publicString = publicKey.export({format: 'pem', 'type': 'pkcs1' });

    fs.writeFileSync('./private_key.pem', privateString);
    fs.writeFileSync('./public_key.pem', publicString);
}

function rsaDecryptMessage(message, privKey){
    return crypt.privateDecrypt({
        key: privKey,
        padding: crypt.constants.RSA_PKCS1_PADDING,
        oaepHash: 'sha256'
    }, Buffer.from(message, 'base64')).toString();
}

function rsaEncryptMessage(message, pubKey){
    return crypt.publicEncrypt({
        key: pubKey,
        padding: crypt.constants.RSA_PKCS1_PADDING,
        oaepHash: 'sha256'
    }, Buffer.from(message)).toString('base64');
}

module.exports = { generateClientKeys, privateString, publicString, rsaDecryptMessage, rsaEncryptMessage };
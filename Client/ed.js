//Encryption And Decryption
const crypt = require('crypto');
const fs = require('fs');

function generateClientKeys(){
    const { publicKey, privateKey } = crypt.generateKeyPairSync("rsa", {
        modulusLength: 2048,
    });

    let privateString = privateKey.export({format: 'pem', 'type': 'pkcs1' });
    let publicString = publicKey.export({format: 'pem', 'type': 'pkcs1' });

    fs.writeFileSync('./private_key.pem', privateString);
    fs.writeFileSync('./public_key.pem', publicString);
}

module.exports = { generateClientKeys };
//Connect to server
const request = require('request');
const encrypt = require('./ed')
const fs = require('fs');


function sendServerLogon(ip, key){
    request.post(
        `http://${ip}:8080/logon`,
        {json: { clientPubKey: key}},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {

                let serverKey = encrypt.rsaDecryptMessage(body, fs.readFileSync('./private_key.pem'));

                console.log(`Got server key: ${serverKey}`);
                fs.writeFileSync('server_pub.pem', serverKey);
            }
        }
    )
}

function sendChatMessage(ip, key, message){
    let eMessage = encrypt.rsaEncryptMessage(message, fs.readFileSync('./server_pub.pem'));
    request.post(
        `http://${ip}:8080/sendMessage`,
        {json: { clientPubKey: key, clientMessage: eMessage}},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(`Sent message: ${body}`);
            }
        }
    )
}

function getServerChatHistory(ip, key){
    request.post(
        `http://${ip}:8080/giveHistory`,
        {json: { clientPubKey: key}},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {

                let messageHistory = encrypt.rsaDecryptMessage(body, fs.readFileSync('./private_key.pem'));
                fs.writeFileSync('./localHistory.txt', messageHistory);
            }
        }
    )
}

module.exports = { sendServerLogon, getServerChatHistory, sendChatMessage };
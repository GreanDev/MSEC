//Connect clients
const express = require('express');
var bodyParser = require('body-parser');
const encrypt = require('./ed');
const fs = require('fs');
const config= require('./config.json');

var options = {
    inflate: true,
    limit: '100kb',
    type: 'application/octet-stream'
  };

var app = express();
app.use(bodyParser.json());


app.post('/sendMessage', function(req, res){

        let data = fs.readFileSync('./history.txt');
        let addTo =  data+`\nuser@server: ${encrypt.rsaDecryptMessage(req.body.clientMessage, fs.readFileSync('./Keys/private_key.pem'))}`;
        console.log(addTo);
        fs.writeFileSync('./history.txt', addTo);
        res.end();
    
});

app.post('/giveHistory', function(req, res){
        let data = fs.readFileSync('./history.txt');
        res.write(encrypt.rsaEncryptMessage(data, req.body.clientPubKey));
        res.end();
    }
);

app.post('/logon', function(req, res){
    console.log(req.body.clientPubKey);
    let pubkey = fs.readFileSync('./Keys/public_key.pem');
    res.write(encrypt.rsaEncryptMessage(pubkey, req.body.clientPubKey));
    res.end();
});

function listen(){
app.listen(8080);
}

module.exports = { listen };

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


app.post('/', function(req, res){
    req.rawBody = '';
    req.setEncoding('utf8');

    req.on('data', function(chunk){
        req.rawBody += chunk;
    });

    req.on('end', function(){
        console.log(req.rawBody);
        let data = fs.readFileSync('./history.txt');
        let addTo =  data+`\n${req.headers.displayname}@${config.user.serverName}: ${encrypt.decryptMessage(Buffer.from(req.rawBody, 'base64'))}`;
        console.log(addTo);
        fs.writeFileSync('./history.txt', addTo);
    });
    res.end();
    
});

app.get('/giveHistory', function(req, res){
    fs.readFile('./history.txt', 'utf8', function(err, data){
        res.write(encrypt.encryptMessage(data).toString('base64'));
        res.end();
    })
});

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

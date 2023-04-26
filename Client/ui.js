//Ui functions
var blessed = require('blessed');
const main = require('./main');
const connecter = require('./connector');
const fs = require('fs');

let messageHistory
let serverIp = '';




var screen = blessed.screen({
    smartCSR: true
});

screen.title = 'MSEC chat';


var messages = blessed.box({
    top: 'center',
    left: 'center',
    width: '80%',
    height: '80%',
    content: messageHistory,
    tags: true,
    border: {
        type: 'line'
    },
    style: {
        fs: 'white',
        border: {
            fg: 'green'
        },
    }
});

var inputBox = blessed.textbox({
    bottom: '0',
    left: 'center',
    width: '50%',
    mouse: true,
    height: '10%',
    content: 'Hello, Blessed',
    tags: true,
    border: {
        type: 'line'
    },
    style: {
        fg: 'white',
        border: {
            fg: 'green'
        },
        hover: {
        }
    }
})

screen.append(inputBox);
screen.append(messages);

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
});

function giveUiData(sip){
    serverIp = sip;
}

screen.key('space', function(ch, key){
    inputBox.focus();
    inputBox.readInput();
})

inputBox.addListener('submit', function(args){
   let serverKey = fs.readFileSync('./server_pub.pem');
   connecter.sendChatMessage(serverIp, serverKey, args);
})

function setHistory(setTo){
    screen.render();
}

inputBox.focus();
inputBox.readInput();
screen.render();

module.exports = { messages, setHistory, giveUiData };
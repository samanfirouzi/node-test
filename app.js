const WebSocket = require('ws');
var dispatcher = require('./Dispatcher');

const port = process.env.port || 3000;
const wss = new WebSocket.Server({ port: port });


wss.on('connection', function connection(ws) {
    console.log('new connection');

    ws.on('message', function incoming(message) {

        jsonMsg = JSON.parse(message);
        msgType = jsonMsg.t;
        console.log('received: %s', message);

        dispatcher.dispatchMessage(msgType, jsonMsg, ws, wss);

    });

    ws.isAlive = true;
    ws.on('pong', heartbeat);
});


function noop() { }

function heartbeat() {
    this.isAlive = true;
}

const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate();

        ws.isAlive = false;
        ws.ping(noop);
    });
}, 30000);

wss.on('close', function close() {
    clearInterval(interval);
});




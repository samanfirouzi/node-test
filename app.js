const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const port = process.env.port || 3000;
const wss = new WebSocket.Server({ port: port });

let cl = new Map();
let clr = new Map();
wss.on('connection', function connection(ws) {
    console.log('new connection');
    // uuid = uuidv4();
    // console.log(uuid);
    // cl[ws] = uuid;
    // clr[uuid] = ws;
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        // client !== ws &&
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.send('something from server');

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
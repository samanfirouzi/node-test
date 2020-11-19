const WebSocket = require('ws');
var constants = require('./Constant.js');

const port = process.env.port || 3000;
const wss = new WebSocket.Server({ port: port });

let cl = new Map();
let rooms = new Map();

rooms.set(1, { rid: 1, ju: 6, name: "mafia 1" });
rooms.set(2, { rid: 2, ju: 6, name: "mafia 2" });
rooms.set(3, { rid: 2, ju: 3, name: "mafia 3" });
rooms.set(4, { rid: 2, ju: 3, name: "mafia 4" });
rooms.set(5, { rid: 2, ju: 2, name: "mafia 5" });
rooms.set(6, { rid: 2, ju: 2, name: "mafia 6" });
rooms.set(7, { rid: 2, ju: 1, name: "mafia 7" });
rooms.set(8, { rid: 2, ju: 1, name: "mafia 8" });
wss.on('connection', function connection(ws) {
    console.log('new connection');

    ws.on('message', function incoming(message) {

        j = JSON.parse(message);
        msgType = j.t;
        console.log('received: %s', message);
        switch (msgType) {
            case constants.C_Hi:
                cl.set(j.s, "ws");

                msg = getRoomList();
                console.log(msg);
                send(constants.S_PublicRoomList, msg, ws)

                break;
            case constants.C_JoinToPublicRoom:
            case constants.C_RegisterPublicRoom:

            default:
                break;
        }

    });

    ws.isAlive = true;
    ws.on('pong', heartbeat);
});

function getRoomList() {
    var obj = {
        rms: []
    };

    rooms.forEach(function (value, key) {
        obj.rms.push(value);
    });

    console.log(obj);

    return (obj);
}

function send(msgType, msg, ws) {
    jmsg = {
        t: msgType,
        m: msg
    }
    console.log('ready msg is: %s', JSON.stringify(jmsg));

    ws.send(JSON.stringify(jmsg));
}

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




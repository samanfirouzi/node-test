let clients = new Map();
let rooms = new Map();

rooms.set(1, { rid: 1, ju: 6, name: "mafia 1" });
rooms.set(2, { rid: 2, ju: 6, name: "mafia 2" });

function registerNewPlayer(sesion, playerNme, ws) {
    userObj = {
        name: playerNme,
        ws: ws,
        inGame: 0,
        status: ""
    }
    clients.set(sesion, userObj);
}
function createPublicRoom(roomName) {
    return { rid: 1, ju: 6, name: "mafia 1" }
}

function getRoom(rid) {
    return { rid: 1, ju: 6, name: "mafia 1" }
}
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
    jmsg = makeJsonObj(msgType, msg)
    console.log('ready msg is: %s', JSON.stringify(jmsg));

    ws.send(jmsg);
}


function sendToAll(msgType, msg, wss) {
    jmsg = makeJsonObj(msgType, msg)
    console.log('ready msg is: %s', JSON.stringify(jmsg));

    // clients.forEach( {
    // client.send(msg);
    // });
}


module.exports = { send, getRoomList, getRoom, createPublicRoom, registerNewPlayer }

function makeJsonObj(msgType, msg) {
    return JSON.stringify({
        t: msgType,
        m: msg
    });
}

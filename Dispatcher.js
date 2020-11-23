var busSer = require('./Services');
var constants = require('./Constant.js');


function dispatchMessage(msgType, jsonMsg, ws, wss) {
    switch (msgType) {
        case constants.C_Hi:
            firstMeet(jsonMsg, ws);
            break;
        case constants.C_JoinToPublicRoom:
            joinToPublicRoom(jsonMsg, ws);
            break;
        case constants.C_RegisterPublicRoom:
            createPublicRoom(jsonMsg, ws, wss);
            break;
        case constants.C_SendChatMsg:
            sendChatMessage();
            break;
        default:
            break;
    }

}


module.exports = { dispatchMessage }

function sendChatMessage(jsonMsg) {
}
function findHisRoom(jsonMsg) {
}
function createPublicRoom(jsonMsg) {
    findHisRoom();
    roomDate = busSer.createPublicRoom(jsonMsg.m.rn);
    busSer.send(constants.S_RoomData, roomDate, ws);
}

function joinToPublicRoom(jsonMsg, ws) {
    msg = busSer.getRoom(jsonMsg.m.rid);
    busSer.send(constants.S_RoomData, msg, ws);
}

function firstMeet(jsonMsg, ws) {
    busSer.registerNewPlayer(jsonMsg.s, ws);

    msg = busSer.getRoomList();
    busSer.send(constants.S_PublicRoomList, msg, ws);
}

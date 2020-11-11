const msgConst = require("./constant/msgConst");
const express = require('express');
const app = express();
const socketio = require('socket.io');

const port = process.env.port || 3000;

app.use(express.static('public'));
server = app.listen(port, function () {
    console.log("salam");
});

var io = socketio(server);

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('joined', function (data) {
        console.log(data);
        socket.emit('acknowledge', 'Acknowledged');
    });
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        socket.emit('response message', msg + '  from server');
        //socket.broadcast.emit('response message', msg + '  from server');
    });
});
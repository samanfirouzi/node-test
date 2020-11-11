const msgConst = require("./constant/msgConst");
const express = require('express');
const app = express();
const io = require('socket.io-client');
const socket = io('http://127.0.0.1:3000');
socket.on('connect', function (data) {
    socket.emit('joined', 'Hello World from client');
});
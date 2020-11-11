const msgConst = require("./constant/msgConst");
const express = require('express');
const app = express();
const io = require('socket.io-client');
const socket = io('http://nodeawstest-env.eba-vjg2qn3w.us-east-2.elasticbeanstalk.com/');
// const socket = io('http://127.0.0.1:3000');
socket.on('connect', function (data) {
    console.log('connected');
    socket.emit('joined', 'Hello World from client');
});

socket.on('acknowledge', function (date) {
    console.log('server: ' + date);
});
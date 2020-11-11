const WebSocket = require('ws');

const ws = new WebSocket('ws://nodeawstest-env.eba-vjg2qn3w.us-east-2.elasticbeanstalk.com/');

ws.on('open', function open() {
    ws.send('something from client');
});

ws.on('message', function incoming(data) {
    console.log(data);
});
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("welcome to the node- AWS sample");
});

const port = process.nextTick.port || 3000;
app.listen(port, () => {
    console.log("salam");
});

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("welcome to the node- AWS sample");
});


app.listen(3000, () => {
    console.log("salam");
});

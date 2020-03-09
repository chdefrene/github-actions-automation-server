const express = require('express');
const ip = require("ip");
const {transferPlayback} = require("./helpers/player");
const {obtainAccessToken} = require("./helpers/authorize");

const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
    process.env.ACCESS_TOKEN = await obtainAccessToken()
        .catch(error => res.send(error));

    let message;
    switch (req.body.action) {
        case 'transfer':
            message = await transferPlayback()
                .catch(error => res.send(error));
            break;
        default:
            message = "😢";
    }

    console.log(message);
    res.send(message)
});

app.listen(80, ip.address());
console.log(`🚀 Server is up! Listening for connections...`);

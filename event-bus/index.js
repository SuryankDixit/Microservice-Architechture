const express = require("express");
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
    const event = req.body;
    console.log(event);
    // the downside is clearly visible here ,we are assuming that every post request will succeed eventually;
    axios.post("http://localhost:4000/events", event);
    axios.post("http://localhost:4001/events", event);
    axios.post("http://localhost:4002/events", event);
    axios.post("http://localhost:4003/events", event);

    res.send({ status: "OK" });
});

app.listen(4005, () => {
    console.log("Server is listening on port 4005");
});
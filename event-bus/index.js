const express = require("express");
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

// storing all the events that come to event bus for future references
const events = [];

app.post("/events", (req, res) => {
    const event = req.body; // whatever comes in our req body , take that in event

    events.push(event);

    console.log(event);
    // the downside is clearly visible here ,we are assuming that every post request will succeed eventually;
    axios.post("http://localhost:4000/events", event); // post
    axios.post("http://localhost:4001/events", event); // comment
    axios.post("http://localhost:4002/events", event); // query service
    axios.post("http://localhost:4003/events", event); // moderation service

    res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log("Server is listening on port 4005");
});
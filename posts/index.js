const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async(req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    console.log(title);

    posts[id] = {
        id: id,
        title
    };

    const event = {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    };

    await axios.post("http://localhost:4005/events", event);

    res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
    console.log(req.body.type);
    res.send({});
});

app.listen(4000, function() {
    console.log("Server started on port 4000");
});
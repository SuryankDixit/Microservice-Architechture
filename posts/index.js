const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
/*
    using bodyparser - depreceated;
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
*/

/*
    using express Middleware
*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    console.log(title);

    /* 
        shorter way to make objects
        posts[id] = {
            id, title
        };
    */

    posts[id] = {
        id: id,
        title: title
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
    console.log("Received Event in Posts", req.body.type);
    res.send({});
});

app.listen(4000, function () {
    console.log("Server started on port 4000");
});
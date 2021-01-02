const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const app = express();

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const posts = {};

app.get("/posts", (req, res) => {
    res.send(posts)
});

app.post("/posts", (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id: id,
        title: title
    };
    res.send(posts[id]);
});

app.listen(4000, function() {
    console.log("Server started on port 4000");
});
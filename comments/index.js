const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const app = express();

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
    const postId = req.params.id;
    res.send(commentsByPostId[postID] || []);
});

app.post("/posts/:id/comments", (req, res) => {
    const postID = req.params.id;
    const { comment } = req.body;
    const commentID = randomBytes(4).toString('hex');

    commentsByPostId[postID] = commentsByPostId[postID] || [];
    commentsByPostId[postID].push({
        id: commentID,
        comment
    });
    res.send(commentsByPostId[postID]);
});

app.listen(4001, function() {
    console.log("Server started on port 4001");
});
const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;                       // comment of user

    const comments = commentsByPostId[req.params.id] || [];     // if first term return undefined then give an empty array;

    comments.push({
        id: commentId,
        content: content,
        status: "pending"
    });

    commentsByPostId[req.params.id] = comments;

    const event = {
        type: "CommentCreated",
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: "pending"
        }
    };

    await axios.post("http://localhost:4005/events", event);
    res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
    console.log(req.body.type);

    const { type, data } = req.body;

    if (type === "CommentModerated") {
        const { postId, id, status, content } = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;

        await axios.post("http://localhost:4005/events", {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        });
        console.log(comment.content);
    }
    res.send({});
});

app.post("/events", (req, res) => {
    console.log("Received Event in Comments ", req.body.type);
    res.send({});
});

app.listen(4001, function () {
    console.log("Server started on port 4001");
});
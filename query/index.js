const express = require("express");
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

const posts = {};
/*
 {
     postId:{
         postId:postId,
         title:title,
         comments:[{
             id:commentId,
             content:content,
             postId:postId,
             status:status
         }
         ]
     }
 }
*/

function handleEvent(type, data) {
    if (type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;

        const post = posts[postId];
        post.comments.push({ id, content, status });
    }

    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;

        const post = posts[postId];
        const comment = post.comments.find(comment => {
            return comment.id === id;
        });

        comment.status = status;
        comment.content = content;
    }
    console.log(posts);
}

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    handleEvent(type, data);

    res.send({});
});

app.listen(4002, async () => {
    console.log('Listening on 4002');
    const res = await axios.get("http://localhost:4005/events");
    for (let event of res.data) {
        console.log('Procesing Event:', event.type);
        handleEvent(event.type, event.data);
    }
});

// app.listen(4002, async () => {
//     console.log("Listening on 4002");
//     try {
//         const res = await axios.get("http://localhost:4005/events");

//         for (let event of res.data) {
//             console.log("Processing event:", event.type);

//             handleEvent(event.type, event.data);
//         }
//     } catch (error) {
//         console.log(error.message);
//     }
// });
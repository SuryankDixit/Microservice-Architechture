const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/events", async (req, res) => {
    const { type, data } = req.body;
    if (type === 'CommentCreated') {
        const status = data.content.includes("fuck") ? "rejected" : "approved";

        const event = {
            type: "CommentModerated",
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        }
        console.log(event.data.status);
        await axios.post("http://localhost:4005/events", event);
    }
    res.send({});
});

app.listen(4003, function () {
    console.log("Server started on port 4003");
});
import React from 'react';

export default ({ comments }) => {

    const renderedComments = comments.map(comment => {

        let content;
        if (comment.status === 'approved') {
            content = comment.content;
        }

        if (comment.status === 'pending') {
            content = 'This content is awaiting moderation';
        }

        if (comment.status === 'rejected') {
            content = 'Marked as Spam';
        }

        return <li key={comment.id}> {content} </li>;
    });

    return <ul> {renderedComments} </ul>;
};

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const CommentList = ({ postId }) => {
//     const [comments, setComments] = useState([]);

//     const fetchData = async () => {
//         const res = await axios.get(
//             `http://localhost:4001/posts/${postId}/comments`
//         );

//         setComments(res.data);
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const renderedComments = comments.map((comment) => {
//         return <li key={comment.id}>{comment.content}</li>;
//     });

//     return <ul>{renderedComments}</ul>;
// };

// export default CommentList;
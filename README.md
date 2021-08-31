# Microservice-Architechture Updated

Microservices implementation from scratch

- npx create-react-app client
- mkdir posts
    - cd posts
    - npm init
    - npm install express cors axios nodemon
- mkdir comments
    - cd comments
    - npm init
    - npm install express cors axios nodemon
- Posts
    - GET  : /posts
    - POST : /posts
-Comments
    - GET  : /posts/:id/comments
    - POST : /posts/:id/comments - Create a comment associated with given Post ID

- Now, I want you to understand that this idea of a user making a change and not seeing that immediately reflected, that's something that's going to come up all the time in this idea of micro services.
Moderation Service being monitored by human.



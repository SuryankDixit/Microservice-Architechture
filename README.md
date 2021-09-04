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


- Namespacing: Isolating resources per process or group of processes.
- Control Groups (cgroups) : limit amount of resources used per processes

- container is a running process, along with a subset of physical resources on your computer are allocated to that process.
- an image is really kind of a snapshot of the file system, along with a very specific Start-Up


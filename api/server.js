const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const configureRoutes = require('../config/routes.js');
//const usersRouter = require('../users/users-router.js')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

//server.use('./api/users', usersRouter)
configureRoutes(server);


server.get('/', (req, res) => {
    res.send("It's alive!");
});

module.exports = server;

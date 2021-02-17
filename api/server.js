const express = require('express');
const middleware = require('./middleware/middleware')

const server = express();
server.use(express.json());
server.use(middleware.logger)
// remember express by default cannot parse JSON in request bodies

// global middlewares and routes need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;

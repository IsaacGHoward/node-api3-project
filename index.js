// require your server and launch it
const server = require('./api/server');

const port = 5000;

server.listen(port, () => {
  console.log("Server started @ localhost:5000")
})
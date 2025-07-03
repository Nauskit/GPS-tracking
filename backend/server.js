const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const { initSocket } = require("./socket");
const listenOverspeedAlert = require("./alertSubscriber");

initSocket(server);
listenOverspeedAlert();

server.listen(3000, () => {
  console.log("Server running on Port: http://localhost:3000");
});

var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var { Server } = require("socket.io");
var io = new Server(server);
var players = {};

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function (socket) {
  console.log("a user connected");
  // create a new player and add it to our players object
  players[socket.id] = {
    rotation: 0,
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
    playerId: socket.id,
    team: Math.floor(Math.random() * 2) == 0 ? "red" : "blue",
  };
  // send the players object to the new player
  socket.emit("currentPlayers", players);
  // update all other players of the new player
  socket.broadcast.emit("newPlayer", players[socket.id]);
  socket.on("disconnect", function () {
    console.log("user disconnected");
    delete players[socket.id];
    io.emit("playerDisconnected", socket.id);
  });
});

server.listen(8081, "0.0.0.0", () => {
  console.log(`Server is running at http://0.0.0.0:8081`);
});

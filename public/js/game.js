var config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
var game = new Phaser.Game(config);

function preload() {}

function create() {
  const socket = io("http://YOUR_SERVER_IP:8081");

  socket.on("connect", () => {
    console.log("connected to server");
  });

  socket.on("disconnect", () => {
    console.log("disconnected from server");
  });
}

function update() {}

$(document).ready(function() {
  var socket = null,
      socketId = null,
      gameId = null;

  function connectToSocketServer(serverUrl) {
    socket = new io("http://localhost:3000");

    socket.on("connect", function() {
      socketId = socket.io.engine.id;
    });
  }


})

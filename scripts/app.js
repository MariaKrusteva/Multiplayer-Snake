// we are configurating a specific path for jQuery
require.config({
  paths: {
    "jquery": "../bower_components/jquery/dist/jquery",
    "socket.io": "../bower_components/socket.io-client/socket.io",
    "handlebars": "../bower_components/handlebars/handlebars",
    "backbone": "../bower_components/backbone/backbone"
  },
  shim: {
    "socket.io": {
      exports: "io"
    },
    "handlebars": {
      exports: "Handlebars"
    }
  }
});

require(["jquery", "socket.io", "gamelobby", "form"], function($, io, lobby, form) {
  $(function() {
    var
      socket = null,
      socketId = null,
      gameId = null,
      serverUrl = "http://localhost:3000";

      socket = new io(serverUrl);

      socket.on("connect", function() {
        socketId = socket.io.engine.id;
        console.log("Socket connected");

        lobby.init({
          socketId: socketId,
          serviceUrl: serverUrl + "/games",
          serviceUrl2: serverUrl + "/joinGame",
          container: "#gameLobbyContainer",
          updateTime: 10000
        });
        lobby.render();

        form.init({
          servicerUrl: serverUrl + "/createGame",
          container: "#form",
          socketId: socketId,
          gameIdCallback: function(gid) {
            gameId = gid;
          }

        })




      });
  });
});

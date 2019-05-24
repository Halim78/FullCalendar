const express = require("express");
const nodemon = require("nodemon");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const path = require("path");
const port = process.env.PORT || 3003;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

server.listen(port, function() {
  console.log("listening on port = " + port);
});

//initialisation de socket Io
io.on("connection", function(socket) {
  //envoi des datas au front
  socket.emit(
    "events",
    (data = [
      {
        groupId: 998,
        title: "Repeating Event",
        start: "2019-04-07T16:00:00"
      },
      {
        groupId: 997,
        title: "Repeating Event",
        start: "2019-04-06T16:00:00"
      },
      {
        groupId: 999,
        title: "Repeating Event",
        start: "2019-04-03T16:00:00"
      }
    ])
  );

  //récupération de la data du front
  socket.on("events", data => {
    console.log("events from front", data);
  });
});

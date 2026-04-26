const express = require("express");
const socket = require("socket.io");

// App setup
const PORT = 3000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on  ${PORT}`);

});
//
// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server);

//we use a set to store users, sets objects are for unique values of any type
const activeUsers = new Set();


io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.username = "Anonymous";

  socket.on("new user", function (data) {
    const oldUsername = socket.username;
    socket.username = data || "Anonymous";
    activeUsers.delete(oldUsername);
    activeUsers.add(socket.username);
    //... is the the spread operator, adds to the set while retaining what was in there already
    io.emit("new user", [...activeUsers]);
  });

  socket.on("disconnect", function () {
      activeUsers.delete(socket.username);
      io.emit("user disconnected", socket.username);
    });

    socket.on("chat message", function (data) {
      io.emit("chat message", data);
  });

});

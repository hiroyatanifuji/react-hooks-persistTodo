const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {

  console.log("Client conneced");

  socket.on("SEND_TODO", (data) => {
    io.emit("RECEIVE_TODO", data);
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
});

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Server running on port ${port}`));


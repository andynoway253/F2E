import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:4200", "https://2019-f2e.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
    connectionStateRecovery: {},
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("add-message", (message) => {
    console.log("add message");
    io.emit("message", { type: "new-message", text: message });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("server running at https://f2e.onrender.com");
});

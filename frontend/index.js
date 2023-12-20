import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

// socket.emit — 用於發送事件

// socket.on — 用於監聽事件

// io.sockets.emit — Server對所有連接的Client發送事件

// socket.broadcast.emit — Client給自己以外的Client發送事件

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

const users = [];

io.on("connection", (socket) => {
  console.log("user connected");

  /*是否為新用戶*/
  let isNewPerson = true;
  /*當前登入用戶*/
  let userName = null;

  socket.on("disconnect", () => {
    console.log("user disconnected");


    users.splice(
      users.findIndex((item) => item === userName),
      1
    );

    io.emit("connectedUsersCount", users.length);

  });

  socket.on("login", (data) => {
    isNewPerson = users.findIndex((item) => item === data.userName);

    if (isNewPerson === -1) {
      userName = data.userName;

      users.push(data.userName);

      /*發送 登入成功 事件*/
      socket.emit("loginSuccess", data);

      /*向所有連接的用戶廣播事件*/
      io.emit("message", { type: "join", text: data.userName + "加入聊天" });

      io.emit("connectedUsersCount", users.length);
    } else {
      /*發送 登入失敗 事件*/
      socket.emit("loginFail", "");
    }
  });

  socket.on("logout", () => {
    console.log("logout");

    users.splice(
      users.findIndex((item) => item === userName),
      1
    );

    io.emit("message", { type: "leave", text: userName + "離開聊天" });

    io.emit("connectedUsersCount", users.length);
  });

  socket.on("sendMessage", (message) => {
    io.emit("message", {
      type: "message",
      text: message.userName + "說: " + message.text,
    });
  });
});

server.listen(3000, () => {
  console.log("server running at https://f2e.onrender.com");
});

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

    if (!userName) {
      return;
    }

    users.splice(
      users.findIndex((item) => item.userName === userName),
      1
    );

    socket.broadcast.emit("message", {
      type: "leave",
      userName: userName,
      text: "離開聊天",
    });

    io.emit("getOnlineInfo", {
      userCount: users.length,
      userList: users,
    });
  });

  socket.on("login", (data) => {
    userName = data.userName;
    isNewPerson = users.findIndex((item) => item === userName);

    if (isNewPerson === -1) {
      users.push({ userId: socket.id, userName });

      /*發送 登入成功 事件*/
      socket.emit("loginSuccess");

      // 只發事件給自己
      socket.emit("message", {
        type: "join",
        userName: "",
        text: "歡迎加入！可以開始聊天了",
      });

      /*向除了自己之外的，所有連接的用戶廣播事件*/
      socket.broadcast.emit("message", {
        type: "join",
        userName,
        text: "加入聊天",
      });

      io.emit("getOnlineInfo", {
        userCount: users.length,
        userList: users,
      });
    } else {
      /*發送 登入失敗 事件*/
      socket.emit("loginFail");
    }
  });

  socket.on("sendMessage", (message) => {
    const { roomId, receiverId, userId, userName, text } = message;

    if (receiverId) {

      if (socket.rooms.has(roomId)) {
        io.to(roomId).emit("message", {
          type: "message",
          userName,
          text,
        });
      } else {
        socket
          .to(receiverId)
          .emit("getNotify", { receiverId, userId, userName, text });
      }
      return;
    }

    io.to(roomId).emit("message", {
      type: "message",
      userName,
      text,
    });
  });

  socket.on("acceptPrivateMessage", (params) => {
    /* 回傳房間id，通知邀請者加入 */
    const roomId = params.roomId;
    socket
      .to(roomId.split("@")[0])
      .emit("getResponseForPrivateMessage", { accept: true, roomId });
  });

  socket.on("joinRoom", (params) => {
    socket.join(params.roomId);
  });
});

server.listen(3000, () => {
  console.log("server running at https://f2e.onrender.com");
});

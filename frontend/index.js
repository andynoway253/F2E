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

const public_io = io.of("public");

const private_io = io.of("private");

public_io.on("connection", (socket) => {
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

    public_io.emit("getOnlineInfo", {
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

      public_io.emit("getOnlineInfo", {
        userCount: users.length,
        userList: users,
      });
    } else {
      /*發送 登入失敗 事件*/
      socket.emit("loginFail");
    }
  });

  socket.on("sendMessage", (message) => {
    const { receiverId, userId, userName, userConnect, text } = message;

    if (receiverId) {
      // public_io.to(userId + "@" + receiverId).emit("message", {
      //   type: "message",
      //   userName,
      //   text,
      // });

      //  在 userConnect，找到相同 receiverId，表示已經有聊過天，不須再發送聊天邀請通知
      if (userConnect.some((id) => id === receiverId)) {
        socket.to(receiverId).emit("message", {
          type: "message",
          userName,
          text,
        });
      } else {
        socket.to(receiverId).emit("getNotify", message);
      }
      return;
    }

    public_io.emit("message", {
      type: "message",
      userName,
      text,
    });
  });

  socket.on("acceptPrivateMessage", (bothId) => {
    socket
      .to(bothId.userId)
      .emit("getResponseForPrivateMessage", { receiverId: bothId.receiverId });
  });

  // socket.on("createRoom", (roomId) => {
  //   socket.join(roomId);
  // });

  // socket.on("join", () => {});
});

private_io.on("connection", (socket) => {});

server.listen(3000, () => {
  console.log("server running at https://f2e.onrender.com");
});

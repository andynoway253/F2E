import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

// socket.on — 用於監聽事件

// socket.emit — 用於發送事件

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

    /* 大廳離開提示 */
    socket.broadcast.emit("message", {
      roomId: "lobby",
      type: "notify",
      userName: userName,
      text: "離開聊天",
    });

    /* 房間離開提示 */

    io.emit("getOnlineInfo", {
      userCount: users.length,
      userList: users,
    });
  });

  socket.on("login", (data) => {
    userName = data.userName;
    isNewPerson = users.findIndex((item) => item.userName === userName);

    if (isNewPerson === -1) {
      users.push({ userId: socket.id, userName });

      /*發送 登入成功 事件*/
      socket.emit("loginSuccess");

      // 只發事件給自己
      socket.emit("message", {
        roomId: "lobby",
        type: "notify",
        userName: "",
        text: "歡迎加入！可以開始聊天了",
      });

      /*向除了自己之外的，所有連接的用戶廣播事件*/
      socket.broadcast.emit("message", {
        roomId: "lobby",
        type: "notify",
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
    const { roomId, userName, text } = message;

    const receiverId = roomId.split("@")[1];
    if (receiverId) {
      //  如果連線已經在該房間裡，不須再發送聊天邀請通知
      if (socket.rooms.has(roomId)) {
        io.to(roomId).emit("message", {
          roomId,
          type: "message",
          userName,
          text,
        });
      }
      return;
    }

    io.emit("message", {
      roomId,
      type: "message",
      userName,
      text,
    });
  });

  socket.on("sendResponseForPrivateMessage", (params) => {
    /* 回傳房間id，通知「邀請者」加入 */

    const { roomId, receiverName, accept } = params;
    const userId = roomId.split("@")[0];

    socket.to(userId).emit("getResponseForPrivateMessage", { accept, roomId });

    socket.to(userId).emit("message", {
      roomId,
      type: "notify",
      userName: receiverName,
      text: accept ? "答應了你的邀請" : "拒絕了你的邀請",
    });
  });

  socket.on("sendInvitePrivateMessage", (params) => {
    const { roomId, receiverName } = params;
    const userId = roomId.split("@")[0];
    const receiverId = roomId.split("@")[1];

    socket.to(receiverId).emit("message", {
      roomId,
      type: "invite",
      userName,
      accept: "",
    });

    socket.emit("message", {
      roomId,
      type: "notify",
      userName: "",
      text: `向 ${receiverName} 發出邀請，請等候對方回應`,
    });
  });

  socket.on("joinRoom", (params) => {
    socket.join(params.roomId);
  });
});

server.listen(3000, () => {
  console.log("server running at https://f2e.onrender.com");
});

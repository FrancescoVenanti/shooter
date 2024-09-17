import { instrument } from "@socket.io/admin-ui";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { socketChannel } from "../lib/utils";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get("/ws", (req, res) => {
//   io.on("connection", (socket: Socket) => {
//     console.log("sdvsjdklnkj");
//     socket.on(socketChannel("chat", "send"), (data: any) => {
//       io.emit(socketChannel("chat", "send"), data);
//     });
//     socket.on("clientMsg", (data) => {
//       console.log(data);
//       if (data.room === "") {
//         io.sockets.emit("serverMsg", data);
//       } else {
//         socket.join(data.room);
//         io.to(data.room).emit("serverMsg", data);
//       }
//     });
//   });

//   res.send("socket started");
// });

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["*", "http://localhost:10001"],
    methods: ["GET", "POST"],
    credentials: false,
  },
});

instrument(io, {
  auth: false,
  mode: "development",
});

io.on("connection", (socket: Socket) => {
  socket.on(socketChannel("chat", "send"), (data: any) => {
    socket.emit(socketChannel("chat", "send"), data);
  });
  socket.on("clientMsg", (data) => {
    console.log(data);
    if (data.room === "") {
      io.sockets.emit("serverMsg", data);
    } else {
      socket.join(data.room);
      io.to(data.room).emit("serverMsg", data);
    }
  });
});

server.listen(3000, () => {
	console.log(`Server running ${3000}`);
});

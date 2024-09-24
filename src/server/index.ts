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

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["*", "http://localhost:10001"],
    methods: ["GET", "POST"],
    credentials: false,
  },
});

io.on("connection", (socket: Socket) => {
  socket.on(socketChannel("chat", "send"), (data: any) => {
    socket.emit(socketChannel("chat", "send"), data);
  });
  socket.on(socketChannel('room', 'move'), data => {
    socket.broadcast.emit(socketChannel('room', 'move'), data)
  })

  socket.on(socketChannel('attack', 'move'), data => {
    socket.broadcast.emit(socketChannel('attack', 'move'), data)
  })
});

server.listen(3000, () => {
	console.log(`Server running ${3000}`);
});

import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { z } from "zod";
import { SocketServer } from "./socket";
import { events } from "./utils";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = createServer(app);
type Enemies = Map<string, z.infer<(typeof events)["room"]["receiveEnemies"]>>;
const rooms: Map<string, Enemies> = new Map();

rooms.set("1", new Map());

const io = new Server(server, {
  cors: {
    origin: ["*", "http://localhost:10001"],
    methods: ["GET", "POST"],
    credentials: false,
  },
});

io.on("connection", (_: Socket) => {
  const socket = new SocketServer(_);
  socket.on("chat", "send", (data: any) => {
    socket.emit("chat", "send", data);
  });
  socket.on("room", "move", (data) => {
    socket.emit("room", "move", data);
  });

  socket.on("attack", "move", (data) => {
    socket.emit("attack", "move", data);
  });

  socket.on("room", "join", (data) => {
    //! TODO: da aggiungere la logica per assegnare la stanza in modo dinamico
    if (!rooms.has("1")) {
      return;
    }
    const room = rooms.get("1");
    if (!room.has(data.id)) {
      room.set(data.id, []);
    }
    socket.emit("room", "receiveEnemies", room.get(data.id));
    socket.emit("room", "join", data);
    rooms.get("1").get(data.id).push(data);
  });
});

server.listen(3000, () => {
	console.log(`Server running ${3000}`);
});

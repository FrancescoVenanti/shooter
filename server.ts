import * as http from "http";
import { Server } from "socket.io";

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connect", (socket) => {
  socket.on("connect", () =>
    socket.emit("clients", socket.rooms.values.length),
  );
  socket.on("disconnect", () => {
    socket.emit("user_disconnected");
  });
});

server.listen(8080, () => {
  console.log("✔️  Server listening on port 8080");
});

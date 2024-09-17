import { instrument } from "@socket.io/admin-ui";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { toSocketKey } from "../lib/utils";

const app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
})
const server = createServer(app);

const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000", "https://admin.socket.io"],
		methods: ["GET", "POST"],
		credentials: false,
	},
});

instrument(io, {
	auth: false,
	mode: "development",
});

io.on(
	"connection",
	(socket: Socket) => {
    socket.on(toSocketKey('client', 'chat', 'send'), (data: any) => {
      console.log(data)
    })
		socket.on("clientMsg", (data) => {
			console.log(data);
			if (data.room === "") {
				io.sockets.emit("serverMsg", data);
			} else {
				socket.join(data.room);
				io.to(data.room).emit("serverMsg", data);
			}
		});
	}
);

server.listen(3000, () => {
	console.log(`Server running ${3000}`);
});

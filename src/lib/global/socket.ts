import { io, Socket } from "socket.io-client";
import { z, ZodType } from "zod";
import { events } from "../../server/utils";
import { socketChannel } from "./utils";

class SocketClient {
  private socket: Socket;
  constructor(socket: Socket) {
    this.socket = socket;
    this.socket.connect();
    this.socket.on("connect", () => {
      console.log("connected");
    });
  }
  public on<
    TChannel extends keyof typeof events,
    TEvent extends keyof (typeof events)[TChannel],
    TData extends (typeof events)[TChannel][TEvent]
  >(
    channel: TChannel,
    event: TEvent extends string ? TEvent : never,
    data: (data: z.infer<TData extends ZodType ? TData : never>) => void
  ) {
    this.socket.on(socketChannel(channel, event), data);
  }
  public emit<
    TChannel extends keyof typeof events,
    TEvent extends keyof (typeof events)[TChannel],
    TData extends (typeof events)[TChannel][TEvent]
  >(
    channel: TChannel,
    event: TEvent extends string ? TEvent : never,
    data: z.infer<TData extends ZodType ? TData : never>
  ) {
    this.socket.emit(socketChannel(channel, event), data);
  }
  public to(room: string) {}
}

export const SOCKET = new SocketClient(
  io(process.env.SERVER_URL || "http://localhost:3000", {
    transports: ["websocket"],
  })
);

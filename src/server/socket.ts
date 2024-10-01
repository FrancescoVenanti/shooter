import { Socket } from "socket.io";
import { z, ZodType } from "zod";
import { socketChannel } from "../lib/global";
import { events } from "./utils";

class SocketServer {
  private socket: Socket;
  constructor(socket: Socket) {
    this.socket = socket;
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
    this.socket.broadcast.emit(socketChannel(channel, event), data);
  }
  public to(room: string) {
    return this.socket.to(room);
  }
  public join(room: string) {
    this.socket.join(room);
  }
}

export { SocketServer };

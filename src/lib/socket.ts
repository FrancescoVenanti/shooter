import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";
import { z, ZodType } from "zod";
import { events } from "../server/utils";
import { toSocketKey } from "./utils";

class SocketClient {
  private socket: Socket;
  constructor(uri: string, opts?: Partial<ManagerOptions & SocketOptions>) {
    this.socket = io(uri, opts);
  }
  public  on<
  TChannel extends keyof typeof events,
  TEvent extends keyof (typeof events)[TChannel],
  TData extends (typeof events)[TChannel][TEvent]
  >(
  channel: TChannel,
  event: TEvent extends string ? TEvent : never,
  data: (data: z.infer<TData extends ZodType ? TData : never>) => void,
) {
  this.socket.on(toSocketKey('client', channel, event), data);
};
public  emit<
TChannel extends keyof typeof events,
TEvent extends keyof (typeof events)[TChannel],
TData extends (typeof events)[TChannel][TEvent]
>(
channel: TChannel,
event: TEvent extends string ? TEvent : never,
data: z.infer<TData extends ZodType ? TData : never>
) {
this.socket.on(toSocketKey('client', channel, event), data);
};
public to(room: string) {

}
private
}

const socket = new SocketClient("http://localhost:8080", {
  transports: ["socketio"],
});
export { socket };

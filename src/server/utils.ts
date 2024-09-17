import type { Socket } from "socket.io";
import { io } from "socket.io-client";
import { z, type ZodType } from "zod";
import { UuidSchema } from "../types/zod";


export const events = {
  chat: {
    send: z.string(),
  },
  room: {
    join: z.object({
      id: z.string()
    }),
    leave: z.string(),
    create: z.string(),
  }
} as const

const onSocketServer = <
  TChannel extends keyof typeof events,
  TEvent extends keyof (typeof events)[TChannel],
  TData extends (typeof events)[TChannel][TEvent],
>(
  socket: Socket,
  channel: TChannel,
  event: TEvent extends string ? TEvent : never,
  data: (
    data: z.infer<TData extends ZodType ? TData : never> & {
      other?: any;
    },
  ) => void,
) => {
  socket.on(toSocketKey("server", channel, event), data);
};
const emitSocketServer = <
  TChannel extends keyof typeof events,
  TEvent extends keyof (typeof events)[TChannel],
  TData extends (typeof events)[TChannel][TEvent],
>(
  socket: Socket,
  channel: TChannel,
  event: TEvent extends string ? TEvent : never,
  data: z.infer<TData extends ZodType ? TData : never> & { other?: any },
  to?: UuidSchema,
) => {
  if (to) socket.to(to).emit(toSocketKey("client", channel, event), data);
  else socket.broadcast.emit(toSocketKey("client", channel, event), data);
};

const socketServerEvent = <
  TChannel extends keyof typeof events,
  TEvent extends keyof (typeof events)[TChannel],
>(
  socket: Socket,
  channel: TChannel,
  event: TEvent extends string ? TEvent : never,
  to?: UuidSchema,
) => {
  onSocketServer(socket, channel, event, (receivedData) =>
    emitSocketServer(socket, channel, event, receivedData, to),
  );
};

function toSocketKey<
  TChannel extends keyof typeof events,
  TEvent extends keyof (typeof events)[TChannel],
>(
  side: "server" | "client",
  channel: TChannel,
  event: TEvent extends string ? TEvent : never,
): string {
  return `${channel}__${side === "client"
    ? event
    : "on" + event.at(0)?.toUpperCase() + event.substring(1).toLowerCase()
    }`;
}



const ss = io("http://localhost:8080", {
  transports: ["socketio"],
});
const onSocket = <
  TChannel extends keyof typeof events,
  TEvent extends keyof (typeof events)[TChannel],
  TData extends (typeof events)[TChannel][TEvent]
>(
  channel: TChannel,
  event: TEvent extends string ? TEvent : never,
  data: (
    data: z.infer<TData extends ZodType ? TData : never> & {
      other?: any;
    }
  ) => void
) => {
  ss.on(toSocketKey("client", channel, event), data);
};
const emitSocket = <
  TChannel extends keyof typeof events,
  TEvent extends keyof (typeof events)[TChannel],
  TData extends (typeof events)[TChannel][TEvent]
>(
  channel: TChannel,
  event: TEvent extends string ? TEvent : never,
  data: z.infer<TData extends ZodType ? TData : never> & { other?: any }
) => {
  ss.emit(toSocketKey("server", channel, event), data);
};
const offSocket = <
  TChannel extends keyof typeof events,
  TEvent extends keyof (typeof events)[TChannel]
>(
  channel: TChannel,
  event: TEvent extends string ? TEvent : never
) => {
  ss.off(toSocketKey("client", channel, event));
};

function toSocketKeyClient<
  TChannel extends keyof typeof events,
  TEvent extends keyof (typeof events)[TChannel]
>(
  side: "server" | "client",
  channel: TChannel,
  event: TEvent extends string ? TEvent : never
): string {
  return `${channel}__${side === "client"
    ? event
    : "on" + event.at(0)?.toUpperCase() + event.substring(1).toLowerCase()
    }`;
}

export const socket = {
  on: onSocket,
  emit: emitSocket,
  off: offSocket,
  toSocketKey,
};
export { emitSocketServer, onSocketServer, socketServerEvent };

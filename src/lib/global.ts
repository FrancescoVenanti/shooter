import { io } from "socket.io-client";
import { SocketClient } from "./socket";

function random(length: number = 10) {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    .replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .slice(0, length);
}

const globals = {
  state: 0,
  node: 0,
};

function global<T extends keyof typeof globals>(
  provider: T,
  newValue:
    | (typeof globals)[T]
    | ((oldValue: (typeof globals)[T]) => (typeof globals)[T])
): number {
  if (typeof newValue === "function") {
    globals[provider] = newValue(globals[provider]);
  } else {
    globals[provider] = newValue;
  }
  return globals[provider];
}

const socket = new SocketClient(
  io(process.env.SERVER_URL || "http://localhost:3000", { transports: ["websocket"] })
);

const assets = {
  environment: {
    grassMiddle: {
      size: 16,
      width: 1,
      height: 1,
    },
    cliff: {
      size: 16,
      width: 3,
      height: 6,
    },
    farmLand: {
      size: 16,
      width: 3,
      height: 3,
    },
    path: {
      size: 16,
      width: 3,
      height: 6,
    },
    pathMiddle: {
      size: 16,
      width: 1,
      height: 1,
    },
    water: {
      size: 16,
      width: 3,
      height: 6,
    },
    waterMiddle: {
      size: 16,
      width: 1,
      height: 1,
    },
  },
  character: {
    placeholder: {
      idle: {
        size: 16,
        width: 4,
        height: 8,
      },
      run: {
        size: 16,
        width: 4,
        height: 8,
      },
    },
  },
} as const;

type Asset = typeof assets;

export { Asset, assets, global, random, socket };

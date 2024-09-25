import { io } from "socket.io-client";
import Enemy from "../entities/enemy";
import Player from "../entities/player";
import { SocketClient } from "./socket";

const idle = {
  size: 3,
  width: 64,
  height: 64
}
const attack = {
  size: 4,
  width: 64,
  height: 64
}

const run = {
  size: 4,
  width: 64,
  height: 64
}
const death = {
  size: 4,
  width: 64,
  height: 64
}

const ASSETS = {
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
    dwarf: {
      idle,
      attack,
      death,
      run
    },
    wizard: {
      idle,
      attack,
      death,
      run
    },
    slime: {
      idle,
      attack,
      death,
      run
    },
    shroom: {
      idle,
      attack,
      death,
      run
    },
    ghast: {
      idle,
      attack,
      death,
      run
    }
  },
} as const;

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
  DELTA: 0,
  FRAME: 0,
  CACHED_IMAGE: new Map<string, HTMLImageElement>(),
  KEY_PRESSED: new Map<string, boolean>(),
  ASSETS,
  ENEMIES: new Map<string, Enemy>(),
  FPS: 60,
  PLAYER: new Player('dwarf', "attack"),
};

function GLOBAL<T extends keyof typeof globals>(
  provider: T,
  newValue?:
    | (typeof globals)[T]
    | ((oldValue: (typeof globals)[T]) => (typeof globals)[T])
): (typeof globals)[T] {
  if (!newValue) return globals[provider];
  if (typeof newValue === "function") {
    globals[provider] = newValue(globals[provider]);
  } else {
    globals[provider] = newValue;
  }
  return globals[provider];
}

const SOCKET = new SocketClient(
  io(process.env.SERVER_URL || "http://localhost:3000", {
    transports: ["websocket"],
  })
);

type Asset = typeof ASSETS;

export { Asset, ASSETS, GLOBAL, random, SOCKET };

import { io } from "socket.io-client";
import Vector from "../core/vector";
import Enemy from "../entities/enemy";
import Player from "../entities/player";
import { SocketClient } from "./socket";

const TODO = new Proxy(
  {},
  {
    get(target, p, receiver) {
      throw new Error("TODO");
    },
  }
);

const idle = {
  size: 1,
  width: 60,
  height: 60,
  start: 0,
  directions: 4,
};
const attack = {
  size: 4,
  width: 60,
  height: 60,
  start: 2,
  directions: 4,
};
const run = {
  size: 4,
  width: 60,
  height: 60,
  start: 1,
  directions: 4,
};
const death = {
  size: 4,
  width: 60,
  height: 60,
  start: 3,
  directions: 1,
};

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
      run,
    },
    wizard: {
      idle,
      attack,
      death,
      run,
    },
    slime: {
      idle,
      attack,
      death,
      run,
    },
    shroom: {
      idle,
      attack,
      death,
      run,
    },
    ghast: {
      idle,
      attack,
      death,
      run,
    },
  },
} as const;

const WEAPON = {
  book: {
    size: 4,
    width: 60,
    height: 60,
    start: 3.25,
    directions: 1,
    image: "wizard",
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
  ZOOM: 1,
  POSITION: new Vector(0, 0),
  PLAYER: new Player("wizard", "idle"),
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

export { Asset, ASSETS, GLOBAL, random, SOCKET, TODO, WEAPON };

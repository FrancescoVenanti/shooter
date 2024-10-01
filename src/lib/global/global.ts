import Rect from "../../core/rect";
import Vector from "../../core/vector";
import Enemy from "../../entities/enemy";
import Player from "../../entities/player";
import Melee from "../../entities/weapons/melee";
import Ranged from "../../entities/weapons/ranged";
import { ASSETS } from "./assets";

const WEAPON = {
  dwarf: {
    weapon: new Melee({
      rect: new Rect(new Vector(0, 0), 60, 60),
      damage: 100,
      range: 50,
      speed: 1,
      rate: 1,
      reloadTime: 1,
      magazineSize: 1,
    }),
  },
  wizard: {
    weapon: new Ranged({
      projectileImage: {
        size: 4,
        width: 60,
        height: 60,
        start: 3.25,
        directions: 1,
        image: "wizard",
      },
      rect: new Rect(new Vector(0, 0), 60, 60),
      damage: 100,
      range: 100,
      speed: 1,
      rate: 1,
      reloadTime: 1,
      magazineSize: 1,
    }),
  },
  slime: {
    weapon: new Melee({
      rect: new Rect(new Vector(0, 0), 60, 60),
      damage: 100,
      range: 50,
      speed: 1,
      rate: 1,
      reloadTime: 1,
      magazineSize: 1,
    }),
  },
  shroom: {
    weapon: new Melee({
      rect: new Rect(new Vector(0, 0), 60, 60),
      damage: 100,
      range: 50,
      speed: 1,
      rate: 1,
      reloadTime: 1,
      magazineSize: 1,
    }),
  },
  ghast: {
    weapon: new Melee({
      rect: new Rect(new Vector(0, 0), 60, 60),
      damage: 100,
      range: 50,
      speed: 1,
      rate: 1,
      reloadTime: 1,
      magazineSize: 1,
    }),
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
  PLAYER: new Player("wizard", "idle", 5, 100),
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

export { GLOBAL, random, WEAPON };


import { Range } from "../types/zod";

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

// function asset<
//   T extends keyof typeof assets,
// >(
//   params: T extends "environment" ? EnvironmentType : CharacterType<T, any>,
// ) {}

// type EnvironmentType<T extends keyof (typeof assets)["environment"]> = {
//   variant: T;
//   x: Range<(typeof assets)["environment"][T]["width"]>;
//   y: Range<(typeof assets)["environment"][T]["height"]>;
//   width: Range<(typeof assets)["environment"][T]["width"]>;
//   height: Range<(typeof assets)["environment"][T]["width"]>;
// };
// type CharacterType<T extends keyof (typeof assets)["character"], Action extends keyof (typeof assets)['character'][T]> = {
//   variant: T;
//   action: Action;
//   x: Range<(typeof assets)["character"][T][Action]["width"]>;
//   y: Range<(typeof assets)["character"][T][Action]["height"]>;
//   width: Range<(typeof assets)["character"][T][Action]["width"]>;
//   height: Range<(typeof assets)["character"][T][Action]["width"]>;
// };

// asset("environment", "cliff", null, { x: 0, y: 0, width: 4, height: 8 });

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

export { global, random };

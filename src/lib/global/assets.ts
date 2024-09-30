type ImageRect = {
  size: number;
  width: number;
  height: number;
  start: number;
  directions: number;
  image?: keyof Asset["character"];
};

const idle: ImageRect = {
  size: 1,
  width: 60,
  height: 60,
  start: 0,
  directions: 4,
};
const attack: ImageRect = {
  size: 4,
  width: 60,
  height: 60,
  start: 2,
  directions: 4,
};
const run: ImageRect = {
  size: 4,
  width: 60,
  height: 60,
  start: 1,
  directions: 4,
};
const death: ImageRect = {
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

type Asset = typeof ASSETS;

export { ASSETS, Asset, ImageRect };

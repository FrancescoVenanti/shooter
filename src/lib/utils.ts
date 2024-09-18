import { events } from "../server/utils";

function socketChannel<TChannel extends keyof typeof events>(
  channel: TChannel,
  event: keyof (typeof events)[TChannel]
) {
  return `{${channel}}{${event as string}}`;
}
const keyPressed = new Map<string, boolean>();
// const cachedImage: HTMLImageElement[] = [];
const cachedImage: Map<string, HTMLImageElement> = new Map<
  string,
  HTMLImageElement
>();

const playerActions = {
  idle: 4,
  run: 4,
} as const;
const playerClass = ["placeholder"] as const;

function loadSprites() {
  for (const player of playerClass) {
    for (const action in playerActions) {
      const image = new Image();
      image.src = `./src/assets/Sprites/${player}/${action}.png`;
      cachedImage.set(`${player}/${action}.png`, image);
    }
  }
  const image = new Image();
  image.src = "./src/assets/Map/tiles.png";
  cachedImage.set("Map/tiles.png", image);
}

function absAngle(angle: number) {
  if (angle < 0) {
    return Math.PI - angle;
  }
  return angle;
}

export {
  absAngle,
  cachedImage,
  keyPressed,
  loadSprites,
  playerActions,
  playerClass,
  socketChannel,
};

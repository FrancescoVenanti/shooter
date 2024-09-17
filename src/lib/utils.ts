import { events } from "../server/utils";

function toSocketKey<
  TChannel extends keyof typeof events,
  TEvent extends keyof (typeof events)[TChannel]
>(
  side: "server" | "client",
  channel: TChannel,
  event: TEvent extends string ? TEvent : never
): string {
  return `${channel}__${
    side === "client"
      ? event
      : "on" + event.at(0)?.toUpperCase() + event.substring(1).toLowerCase()
  }`;
}
const keyPressed = new Map<string, boolean>();
// const cachedImage: HTMLImageElement[] = [];
const cachedImage: Map<string, HTMLImageElement> = new Map<string, HTMLImageElement>();

const playerActions = {
  idle: 4,
  run: 4,
} as const;
const playerClass = [
  "placeholder",
] as const;

function loadSprites() {
  for (const player of playerClass) {
    for (const action in playerActions) {
        const image = new Image();
        image.src = `./src/assets/Sprites/${player}/${action}.png`;
        cachedImage.set(`${player}/${action}.png`, image);
    }
  }
}

function absAngle(angle: number){
  if (angle < 0){
    return Math.PI - angle;
  }
  return angle;
}

export {
  absAngle, cachedImage,
  keyPressed,
  loadSprites,
  playerActions,
  playerClass,
  toSocketKey
};

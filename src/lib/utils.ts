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
const cachedImage: HTMLImageElement[] = [];

const playerActions = {
  deadGround: 4,
  deadHit: 6,
  fall: 2,
  ground: 3,
  hit: 7,
  idle: 26,
  jump: 4,
  jumpAnticipation: 1,
  run: 12,
} as const;
const playerClass = [
  "bomb",
  "bald",
  "bigGuy",
  "captain",
  "cucumber",
  "whale",
] as const;

function loadSprites() {
  for (const player of playerClass) {
    for (const action in playerActions) {
      for (let i = 1; i <= playerActions[action]; i++) {
        const image = new Image();
        image.src = `./src/assets/Sprites/${player}/${action}/${i}.png`;

        cachedImage.push(image);
      }
    }
  }
}

export {
  cachedImage,
  keyPressed,
  loadSprites,
  playerActions,
  playerClass,
  toSocketKey,
};

import { events } from "../server/utils";
import { ASSETS, GLOBAL } from "./global";

function socketChannel<TChannel extends keyof typeof events>(
  channel: TChannel,
  event: keyof (typeof events)[TChannel]
) {
  return `{${channel}}{${event as string}}`;
}

function inBetween(value: number, start: number, end: number): boolean {
  if(value >= start && value <= end) {
    return true;
  }
  return false;
}

function loadSprites() {
  for (const player in ASSETS["character"]) {
    for (const action in ASSETS["character"][player]) {
      const image = new Image();
      image.src = `/assets/character/${player}/${player}.png`;
      GLOBAL("CACHED_IMAGE").set(`${player}/${player}.png`, image);
    }
  }
  for (const tile in ASSETS["environment"]) {
    const image = new Image();
    image.src = `/assets/environment/${tile}.png`;
    GLOBAL("CACHED_IMAGE").set(`environment/${tile}.png`, image);
  }
}

export { inBetween, loadSprites, socketChannel };

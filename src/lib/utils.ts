import { events } from "../server/utils";
import { assets } from "./global";

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


function loadSprites() {
  for (const player in assets['character']) {
    for (const action in assets['character'][player]) {
      const image = new Image();
      image.src = `/assets/character/${player}/${action}.png`;
      cachedImage.set(`${player}/${action}.png`, image);
    }
  }
  for(const tile in assets['environment']) {
    const image = new Image();
    image.src = `/assets/environment/${tile}.png`;
    cachedImage.set(`environment/${tile}.png`, image);
  }
}




export {
  cachedImage,
  keyPressed,
  loadSprites,
  socketChannel
};

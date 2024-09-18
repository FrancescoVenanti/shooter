import { Canvas } from "./core/canvas";
import { Environment } from "./core/environment";
import listeners from "./core/listeners";
import { Sprite } from "./core/sprite";
import Vector from "./core/vector";
import { socket } from "./lib/socket";
import { cachedImage, keyPressed, loadSprites } from "./lib/utils";

export let FRAME = 1;
export const MAX_FRAME = 60;
export const SPRITE_SIZE = 16;
export let DELTA = 0;
const player = new Sprite("placeholder", "idle", 0.3, new Vector(0, 0));

(function main() {
  socket.on("chat", "send", (data) => {
    console.log(data);
  });
  socket.emit("chat", "send", "hello");
  listeners(player);
  loadSprites();
  Canvas.init();
  Promise.all(
    Array.from(cachedImage.values()).map(
      (img) => new Promise((resolve) => (img.onload = resolve))
    )
  ).then(() => loop());
})();
let count = 0;
let delay1 = 0;
let delay2 = 0;
function loop(delay?: number) {
  delay2 = delay1;
  delay1 = delay;
  Canvas.ctx.clearRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);
  new Environment().drawMap([
    ["grass", "grass", "grass"],
    ["grass", "grass", "grass"],
  ]);
  let dx = 0;
  let dy = 0;
  DELTA = delay1 - delay2;

  if (FRAME == 59) {
    console.log("totale " + count);
    count = 0;
  } else {
    count += player.angle * DELTA;
  }

  if (keyPressed.has("w")) dy -= 1;
  if (keyPressed.has("s")) dy += 1;
  if (keyPressed.has("a")) dx -= 1;
  if (keyPressed.has("d")) dx += 1;

  if (dx !== 0 || dy !== 0) {
    const angle = Math.atan2(dy, dx);
    player.move(angle);
  }

  if (keyPressed.has(" ")) {
    console.log("space");
  }
  player.animate();
  FRAME = (FRAME + 1) % MAX_FRAME;
  requestAnimationFrame(loop);
}

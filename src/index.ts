import { Canvas } from "./core/canvas";
import listeners from "./core/listeners";
import { Sprite } from "./core/sprite";
import Vector from "./core/vector";
import { cachedImage, keyPressed, loadSprites } from "./lib/utils";
// import { socket } from "./lib/socket";

// socket.emit('chat', 'send', 'ljfndlkfjndfgb');
export let frame = 1;
export const MAX_FRAME = 60;
const player = new Sprite('whale', 'idle', 2.5, new Vector(0, 0));

(function main() {
  listeners(player);
  loadSprites();
  Canvas.init();
  Promise.all(
    Array.from(cachedImage.values()).map((img) => new Promise((resolve) => (img.onload = resolve)))
  ).then(() => loop());
})();
function loop(delay?: number) {
  Canvas.ctx.clearRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);
  if (keyPressed.has("s")) {
    player.move(Math.PI / 2);
  }
  if (keyPressed.has("d")) {
    player.move(0);
  }
  if (keyPressed.has("a")) {
    player.move(Math.PI);
  }
  if (keyPressed.has("w")) {
    player.move(-Math.PI / 2);
  }
  if (keyPressed.has(" ")) {
    console.log("space");
  }
  player.animate();
  frame = (frame + 1) % MAX_FRAME;
  requestAnimationFrame(loop);
}

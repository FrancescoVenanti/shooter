import { Canvas } from "./core/canvas";
import listeners from "./core/listeners";
import { Sprite } from "./core/sprite";
import Vector from "./core/vector";
import { cachedImage, keyPressed, loadSprites } from "./lib/utils";
// import { socket } from "./lib/socket";

// socket.emit('chat', 'send', 'ljfndlkfjndfgb');
export let frame = 1;
export const MAX_FRAME = 60;
export const SPRITE_SIZE = 16;
const player = new Sprite('placeholder', 'idle', 2.5, new Vector(0, 0));

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
  let dx = 0;
  let dy = 0;

  if (keyPressed.has("w")) dy -= 1;  // Moving up
  if (keyPressed.has("s")) dy += 1;  // Moving down
  if (keyPressed.has("a")) dx -= 1;  // Moving left
  if (keyPressed.has("d")) dx += 1;  // Moving right

  // Calculate movement direction only if there's input
  if (dx !== 0 || dy !== 0) {
    const angle = Math.atan2(dy, dx); // Calculate angle from the x and y components
    player.move(angle);               // Move player in that direction
  }

  if (keyPressed.has(" ")) {
    console.log("space");
  }
  player.animate();
  frame = (frame + 1) % MAX_FRAME;
  requestAnimationFrame(loop);
}

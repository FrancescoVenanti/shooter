import { Canvas } from "./core/canvas";
import { Sprite } from "./core/sprite";
import Vector from "./core/vector";
// import { socket } from "./lib/socket";

// socket.emit('chat', 'send', 'ljfndlkfjndfgb');
export let frame = 1;
export const MAX_FRAME = 60;
const sprite = new Sprite("whale", "run");

(function main() {
  Canvas.init();
  loop(0);
})();
function loop(delay: number) {
  //sprite.animate();
  frame = (frame + 1) % MAX_FRAME;
  requestAnimationFrame(loop);
  Canvas.rect(new Vector(0, 0));
}

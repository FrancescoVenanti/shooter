import { Canvas } from "./core/canvas";
import listeners from "./core/listeners";
import { Sprite } from "./core/sprite";
import Vector from "./core/vector";
import { cachedImage, keyPressed, loadSprites } from "./lib/utils";
// import { socket } from "./lib/socket";

// socket.emit('chat', 'send', 'ljfndlkfjndfgb');
export let frame = 1;
export const MAX_FRAME = 60;
const player = new Sprite("whale", "run", 2.5, new Vector(0, 0));

(function main() {
  listeners();
  loadSprites();
  Canvas.init();
  setTimeout(() => {
    Promise.all(cachedImage.map(img => new Promise(resolve => img.onload = resolve)))
      .then(() => loop());
  }, 1000);
})();
 function loop(delay?: number) {
  // Canvas.ctx.clearRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);
  if(keyPressed.has('s')){
    player.move('down');
  }
  if(keyPressed.has('d')){
    player.move('right')
  }
  if(keyPressed.has('a')){
    player.move('left')
  }
  if(keyPressed.has('w')){
    player.move('up')
  }
  if(keyPressed.has(' ')){
    console.log('space')
  }
  player.animate();
  frame = (frame + 1) % MAX_FRAME;
  requestAnimationFrame(loop);
}

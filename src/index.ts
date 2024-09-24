import { Canvas } from "./core/canvas";
import { Environment } from "./core/environment";
import listeners from "./core/listeners";
import { GLOBAL } from "./lib/global";
import { loadSprites } from "./lib/utils";

const ENVIRONMENT = new Environment();
(function main() {
  Canvas.init();
  loadSprites();
  listeners();
  Promise.all(
    Array.from(GLOBAL("CACHED_IMAGE").values()).map(
      (img) => new Promise((resolve) => (img.onload = resolve))
    )
  ).then(() => loop());
})();

let delay1 = 0;
let delay2 = 0;
function loop(delay?: number) {
  delay2 = delay1;
  delay1 = delay;
  Canvas.ctx.clearRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);
  ENVIRONMENT.draw();

  for (const enemy of GLOBAL('ENEMIES').values()) {
    enemy.draw();
  }


  GLOBAL("DELTA", (delay1 - delay2) / 10);

  GLOBAL('PLAYER').update();

  GLOBAL("FPS", 100 / GLOBAL("DELTA"));
  GLOBAL("FRAME", (prev) => (prev + 1) % GLOBAL('FPS'));
  requestAnimationFrame(loop);
}

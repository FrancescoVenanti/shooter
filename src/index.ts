import { Canvas } from "./core/canvas";
import { Environment } from "./core/environment";
import listeners from "./core/listeners";
import Vector from "./core/vector";
import { GLOBAL, loadSprites } from "./lib/global";

const ENVIRONMENT = new Environment();
(function main() {
  Canvas.init();

  GLOBAL("PLAYER", (prev) => {
    prev.rect.position = new Vector(
      Canvas.canvas.width / 2 - prev.rect.width / 2,
      Canvas.canvas.height / 2 - prev.rect.height / 2
    );
    return prev;
  });
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
  if (GLOBAL("PLAYER").action === "idle") {
    Canvas.ctx.clearRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);
  }
  //ENVIRONMENT.draw();
  ENVIRONMENT.draw();

  for (const enemy of GLOBAL("ENEMIES").values()) {
    enemy.update();
  }

  GLOBAL("DELTA", (delay1 - delay2) / 10);

  GLOBAL("PLAYER").update();

  GLOBAL("FPS", 100 / GLOBAL("DELTA"));
  GLOBAL("FRAME", (prev) => (prev + 1) % GLOBAL("FPS"));
  requestAnimationFrame(loop);
}

import { Canvas } from "./core/canvas";
import { Environment } from "./core/environment";
import listeners from "./core/listeners";
import Vector from "./core/vector";
import Enemy from "./entities/enemy";
import Player from "./entities/player";
import { GLOBAL, SOCKET } from "./lib/global";
import { loadSprites } from "./lib/utils";

const PLAYER = new Player("placeholder", "idle");
const ENVIRONMENT = new Environment();
(function main() {
  SOCKET.on("room", "move", ({ x, y, id, angle }) => {
    if (GLOBAL('ENEMIES').has(id)) {
      GLOBAL('ENEMIES').get(id).changePosition(new Vector(x, y), angle);
    } else {
      GLOBAL('ENEMIES').set(id, new Enemy("placeholder", "idle", new Vector(x, y), 100));
    }
  });

  listeners(PLAYER);
  loadSprites();
  Canvas.init();
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

  PLAYER.update();

  GLOBAL("FPS", 100 / GLOBAL("DELTA"));
  GLOBAL("FRAME", (prev) => (prev + 1) % GLOBAL('FPS'));
  requestAnimationFrame(loop);
}

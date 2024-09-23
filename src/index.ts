/* import dotenv from 'dotenv'; */
import { Canvas } from "./core/canvas";
import { Environment } from "./core/environment";
import listeners from "./core/listeners";
import Vector from "./core/vector";
import Enemy from "./entities/enemy";
import Player from "./entities/player";
import { GLOBAL, MAX_FRAME, socket } from "./lib/global";
import { loadSprites } from "./lib/utils";

const player = new Player("placeholder", "idle");
const enemies: Map<string, Enemy> = new Map<string, Enemy>();
(function main() {
  console.log(process.env.SERVER_URL);
  socket.on("room", "move", ({ x, y, id, angle }) => {
    if (enemies.has(id)) {
      enemies.get(id).changePosition(new Vector(x, y), angle);
    } else {
      enemies.set(id, new Enemy("placeholder", "idle", new Vector(x, y), 100));
    }
  });
  listeners(player);
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
  new Environment().draw();

  for (const enemy of enemies.values()) {
    enemy.draw();
  }

  let dx = 0;
  let dy = 0;
  GLOBAL("DELTA", (delay1 - delay2) / 10);

  if (GLOBAL("KEY_PRESSED").has("w")) dy -= 1;
  if (GLOBAL("KEY_PRESSED").has("s")) dy += 1;
  if (GLOBAL("KEY_PRESSED").has("a")) dx -= 1;
  if (GLOBAL("KEY_PRESSED").has("d")) dx += 1;
  if (GLOBAL("KEY_PRESSED").has(" ")) {
    player.shot();
  }

  if (dx !== 0 || dy !== 0) {
    const angle = Math.atan2(dy, dx);
    player.move(angle, enemies);
  }

  if (GLOBAL("KEY_PRESSED").has(" ")) {
    player.shot();
  }
  player.draw();
  GLOBAL("FRAME", (prev) => (prev + 1) % MAX_FRAME);
  requestAnimationFrame(loop);
}

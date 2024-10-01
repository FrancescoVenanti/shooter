import Enemy from "../entities/enemy";
import { Asset, GLOBAL, SOCKET } from "../lib/global";

import { Canvas } from "./canvas";
import Vector from "./vector";

const PADDING = 20;

export default function listeners() {
  window.addEventListener("resize", (e) => {
    Canvas.canvas.width = window.innerWidth - PADDING;
    Canvas.canvas.height = window.innerHeight - PADDING;
    GLOBAL("ZOOM", window.devicePixelRatio);
  });

  window.addEventListener("DOMContentLoaded", (e) => {
    Canvas.canvas.width = window.innerWidth - PADDING;
    Canvas.canvas.height = window.innerHeight - PADDING;
  });
  window.addEventListener("keydown", (e) =>
    GLOBAL("KEY_PRESSED").set(e.key.toLowerCase(), true)
  );
  window.addEventListener("keyup", (e) => {
    GLOBAL("KEY_PRESSED").delete(e.key.toLowerCase());
  });

  SOCKET.on("room", "receiveEnemies", (enemies) => {
    for (const enemy of enemies) {
      GLOBAL("ENEMIES").set(
        enemy.id,
        new Enemy(
          enemy.character as keyof Asset["character"],
          "idle",
          new Vector(enemy.position.x, enemy.position.y),
          100,
          100
        )
      );
    }
  });

  SOCKET.on("room", "move", ({ x, y, id, angle }) => {
    if (GLOBAL("ENEMIES").has(id)) {
      GLOBAL("ENEMIES").get(id).changePosition(new Vector(x, y), angle);
    } else {
      GLOBAL("ENEMIES").set(
        id,
        new Enemy("wizard", "run", new Vector(x, y), 100, 100)
      );
    }
  });

  SOCKET.on("attack", "move", ({ id, angle, position: { x, y } }) => {
    console.log("mio id", GLOBAL("PLAYER").id);
    if (GLOBAL("ENEMIES").has(id)) {
      console.log(id, angle, x, y);
      GLOBAL("ENEMIES").get(id).attack(GLOBAL("POSITION"));
    }
  });
}

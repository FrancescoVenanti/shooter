import Enemy from "../entities/enemy";
import { GLOBAL, SOCKET } from "../lib/global";

import { Canvas } from "./canvas";
import Rect from "./rect";
import Vector from "./vector";

export default function listeners() {
  window.addEventListener("resize", (e) => {
    Canvas.canvas.width = window.innerWidth;
    Canvas.canvas.height = window.innerHeight;
  });

  window.addEventListener("DOMContentLoaded", (e) => {
    Canvas.canvas.width = window.innerWidth;
    Canvas.canvas.height = window.innerHeight;
  });
  window.addEventListener("keydown", (e) =>
    GLOBAL("KEY_PRESSED").set(e.key.toLowerCase(), true)
  );
  window.addEventListener("keyup", (e) => {
    GLOBAL("KEY_PRESSED").delete(e.key.toLowerCase());
  });

  SOCKET.on("room", "move", ({ x, y, id, angle }) => {
    if (GLOBAL('ENEMIES').has(id)) {
      GLOBAL('ENEMIES').get(id).changePosition(new Vector(x, y), angle);
    } else {
      GLOBAL('ENEMIES').set(id, new Enemy('shroom', "idle", new Vector(x, y), 100));
    }
  });

  SOCKET.on('attack', 'move', ({id, angle, position: { x, y }}) => {
    Canvas.ctx.strokeStyle = 'red';
    Canvas.ctx.fillStyle = 'red';
    console.log(Canvas.ctx.strokeStyle)
    Canvas.fillRect(new Rect(new Vector(100, 100), 100, 100))
    Canvas.fillRect(new Rect(new Vector(x, y), 10, 10))
  })
}

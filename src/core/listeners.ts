import { Character } from "../entities/character";
import { GLOBAL } from "../lib/global";

import { Canvas } from "./canvas";

export default function listeners(player: Character) {
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
}

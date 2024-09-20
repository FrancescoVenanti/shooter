import { Character } from "../entities/character";
import { keyPressed } from "../lib/utils";
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
    keyPressed.set(e.key.toLowerCase(), true)
  );
  window.addEventListener("keyup", (e) => {
    keyPressed.delete(e.key.toLowerCase());
    /* if (
      keyPressed.has("a") ||
      keyPressed.has("d") ||
      keyPressed.has("s") ||
      keyPressed.has("w")
    ) {
      player.action = "run";
    } else {
      player.action = "idle";
    } */
  });
}

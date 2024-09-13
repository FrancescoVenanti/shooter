import { Canvas } from "./src/core/canvas";
import Vector from "./src/core/vector";
export const canvas = document.createElement("canvas");

function main() {
  Canvas.init(canvas);
  Canvas.line(
    {
      start: new Vector(0, 0),
      start: new Vector(1, 0),
      color: "red",
      width: 5,
    },
    {
      point2: new Vector(200, 200),
      color: "blue",
    }
  );
  Canvas.circle(100, 100, 50);
  Canvas.rect(100, 100, 200, 200);
  Canvas.text("Hello World!", 100, 100);
  Canvas.image("./src/images/cat.png", 1000, 100);

  requestAnimationFrame(main);
}

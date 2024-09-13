import { Canvas } from "./src/canvas";
export const canvas = document.createElement("canvas");

(() => {
  // listeners()

  Canvas.init(canvas);
  Canvas.line(
    {
      point1: [0, 0],
      point2: [100, 100],
      color: "red",
      width: 5,
    },
    {
      point1: [120, 60],
      point2: [200, 200],
      color: "blue",
    }
  );
  Canvas.circle(100, 100, 50);
  Canvas.rect(100, 100, 200, 200);
  Canvas.text("Hello World!", 100, 100);
  Canvas.image("./src/images/cat.png", 1000, 100);
  Canvas.clear()
})();

import { Canvas } from "./core/canvas";

export const canvas = document.createElement("canvas");

function main() {
  Canvas.init(canvas);
  requestAnimationFrame(main);
}

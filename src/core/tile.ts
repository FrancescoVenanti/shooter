import { Asset, ASSETS } from "../lib/global";
import type { Range } from "../types/zod";
import { Canvas } from "./canvas";
import Entity from "./entity";
import Rect from "./rect";
import Vector from "./vector";

class Tile extends Entity {
  constructor(
    tile: keyof Asset["environment"],
    rect: Rect,
    col: Range<Asset["environment"][typeof tile]["width"]>,
    row: Range<Asset["environment"][typeof tile]["height"]>,
    widthImage: number = rect.width,
    heightImage: number = rect.height
  ) {
    super(`/assets/environment/${tile}.png`, rect);
  }
  public draw() {
    const { width, height } = ASSETS["environment"][this.image];
    Canvas.imageRect(
      this.image,
      new Rect(new Vector(0, 0), width, height),
      this.rect
    );
  }
}

export { Tile };

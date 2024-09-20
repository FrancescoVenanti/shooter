import { Asset } from "../lib/global";
import type { Range } from "../types/zod";
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
    super(
      rect.position,
      `/assets/environment/${tile}.png`,
      rect.width,
      rect.height
    );
  }
  public draw() {}
}

export { Tile };

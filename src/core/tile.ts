import { Asset } from "../lib/global";
import type { Range } from "../types/zod";
import Vector from "./vector";

class Tile {
  constructor(tile: keyof Asset['environment'],
    position: Vector,
    width: number,
    height: number,
    col: Range<Asset['environment'][typeof tile]['width']>,
    row: Range<Asset['environment'][typeof tile]['height']>,
    widthImage: number = width,
    heightImage: number = height) {
  }
  public draw() {

  }
}

export { Tile };

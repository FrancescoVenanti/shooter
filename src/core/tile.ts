import { Asset } from "../lib/global";
import type { Range } from "../types/zod";
import { Sprite } from "./sprite";
import Vector from "./vector";

class Tile extends Sprite<'environment'> {
  constructor(tile: keyof Asset['environment'],
    position: Vector,
    width: number,
    height: number,
    col: Range<Asset['environment'][typeof tile]['width']>,
    row: Range<Asset['environment'][typeof tile]['height']>,
    widthImage: number = width,
    heightImage: number = height) {
    super(`/assets/environment/${tile}.png`, position, width, height, new Vector(col * width, row * height), widthImage, heightImage);
  }
  public draw() {

  }
}

export { Tile };

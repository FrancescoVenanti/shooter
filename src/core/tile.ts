import { Asset, ASSETS, GLOBAL } from "../lib/global";
import type { Range } from "../types/zod";
import { Canvas } from "./canvas";
import Entity from "./entity";
import Rect from "./rect";
import Vector from "./vector";

class Tile extends Entity {
  public tile: keyof Asset["environment"];
  constructor(
    tile: keyof Asset["environment"],
    rect: Rect,
    col: Range<Asset["environment"][typeof tile]["width"]>,
    row: Range<Asset["environment"][typeof tile]["height"]>,
    widthImage: number = rect.width,
    heightImage: number = rect.height
  ) {
    super(`environment/${tile}.png`, rect), (this.tile = tile);
  }
  public draw() {
    const { width, height } = ASSETS["environment"][this.tile];
    Canvas.imageRect(
      this.image,
      new Rect(new Vector(0, 0), width, height),
      new Rect(
        new Vector(
          this.rect.position.x - GLOBAL("POSITION").x,
          this.rect.position.y - GLOBAL("POSITION").y
        ),
        this.rect.width * GLOBAL("ZOOM"),
        this.rect.height * GLOBAL("ZOOM")
      )
    );
  }
}

export { Tile };


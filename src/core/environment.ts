import { env } from "bun";
import { Canvas } from "./canvas";
import Vector from "./vector";

export class Environment {
  static height: number = 24;
  static width: number = 32;
  static tileGrowth: number = 3;
  constructor() {}
  public drawTile(tile: TileType, drawPoint: Vector) {
    // Draw the tile
    Canvas.imageRect(
      "./src/assets/Map/tiles.png",
      tiles[tile].vect,
      Environment.width,
      Environment.height,
      drawPoint,
      Environment.width * Environment.tileGrowth,
      Environment.height * Environment.tileGrowth
    );
  }
  public drawMap(map: TileType[][]) {
    for (
      let y = 0;
      y < Canvas.canvas.height / Environment.height / Environment.tileGrowth;
      y++
    ) {
      for (
        let x = 0;
        x < Canvas.canvas.width / Environment.width / Environment.tileGrowth;
        x++
      ) {
        this.drawTile(
          "rock",
          new Vector(
            x * Environment.width * Environment.tileGrowth -
              (Environment.width * Environment.tileGrowth) / 2,
            y * Environment.height * Environment.tileGrowth -
              (Environment.height * Environment.tileGrowth) / 2 -
              8 * (y + 1)
          )
        );
      }
      for (
        let x = 0;
        x < Canvas.canvas.width / Environment.width / Environment.tileGrowth;
        x++
      ) {
        this.drawTile(
          "rock",
          new Vector(
            x * Environment.width * Environment.tileGrowth,
            y * Environment.height * Environment.tileGrowth - 8 * (y + 2)
          )
        );
      }
    }
  }
}

const tiles = {
  grass: {
    vect: new Vector(72, 8),
  },
  water: {
    vect: new Vector(72, 8),
  },
  sand: {
    vect: new Vector(72, 8),
  },
  rock: {
    vect: new Vector(Environment.width * 3 + 8, 5 * 8),
  },
} as const;
export type TileType = keyof typeof tiles;

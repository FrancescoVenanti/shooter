import { type Range } from "../types/zod";
import { Canvas } from "./canvas";
import Vector from "./vector";

class Environment {
  static SIZE: number = 16;
  static tileGrowth: number = 3;
  constructor() {}
  public drawTile<T extends TileType>(tile: T, col: Range<(typeof tiles)[T]['width']>, row: Range<(typeof tiles)[T]['height']>, drawPoint: Vector) {
    // Draw the tile
    Canvas.imageRect(
      `../assets/Map/${tile}.png`,
      new Vector(col * tiles[tile].size, row * tiles[tile].size),
      Environment.SIZE,
      Environment.SIZE,
      drawPoint,
      Environment.SIZE * Environment.tileGrowth,
      Environment.SIZE * Environment.tileGrowth
    );
  }
  public drawMap() {
    for (
      let y = 0;
      y < Canvas.canvas.height / Environment.SIZE / Environment.tileGrowth;
      y++
    ) {
      for (
        let x = 0;
        x < Canvas.canvas.width / Environment.SIZE / Environment.tileGrowth;
        x++
      ) {
        this.drawTile(
          'farmLand',
          1, 1,
          new Vector(
            x * Environment.SIZE * Environment.tileGrowth,
            y * Environment.SIZE * Environment.tileGrowth
          )
        );
      }
    }
  }
}

const tiles = {
  grassMiddle: {
    size: 16,
    width: 1,
    height: 1,
  },
  cliff: {
    size: 16,
    width: 3,
    height: 6,
  },
  farmLand: {
    size: 16,
    width: 3,
    height: 3,
  },
  path: {
    size: 16,
    width: 3,
    height: 6,
  },
  pathMiddle: {
    size: 16,
    width: 1,
    height: 1,
  },
  water: {
    size: 16,
    width: 3,
    height: 6,
  },
  waterMiddle: {
    size: 16,
    width: 1,
    height: 1,
  },
} as const;
type TileType = keyof typeof tiles;


export { Environment, tiles, TileType };


function pickInRange<N extends number>(value: Range<N>) {
  console.log(value);
}

import { type Range } from "../types/zod";
import { Canvas } from "./canvas";
import Rect from "./rect";
import { Tile } from "./tile";
import Vector from "./vector";

class Environment {
  static SIZE: number = 16;
  static get COLS() {
    return 50;
  }
  static get ROWS() {
    return 50;
  }
  static get TILE_GROWTH() {
    return 3;
  }
  static get width() {
    return Environment.COLS * Environment.SIZE * Environment.TILE_GROWTH;
  }
  static get height() {
    return Environment.ROWS * Environment.SIZE * Environment.TILE_GROWTH;
  }
  private tiles: Tile[][] = [];
  constructor() {
    this.generateEnvironment();
  }
  public drawTile<T extends TileType>(
    tile: T,
    col: Range<(typeof tiles)[T]["width"]>,
    row: Range<(typeof tiles)[T]["height"]>,
    drawPoint: Vector
  ) {
    // Draw the tile
    Canvas.imageRect(
      `/assets/environment/${tile}.png`,
      new Rect(
        new Vector(col * tiles[tile].size, row * tiles[tile].size),
        Environment.SIZE,
        Environment.SIZE
      ),
      new Rect(
        drawPoint,
        Environment.SIZE * Environment.TILE_GROWTH,
        Environment.SIZE * Environment.TILE_GROWTH
      )
    );
  }
  public generateEnvironment() {
    for (let y = 0; y < Environment.ROWS; y++) {
      this.tiles.push([]);
      for (let x = 0; x < Environment.COLS; x++) {
        this.tiles[y].push(
          new Tile(
            (["grassMiddle", "waterMiddle", "pathMiddle"] as const)[
              Math.floor(Math.random() * 3)
            ],
            new Rect(
              new Vector(
                Environment.SIZE * Environment.TILE_GROWTH * x,
                Environment.SIZE * Environment.TILE_GROWTH * y
              ),
              Environment.SIZE * Environment.TILE_GROWTH,
              Environment.SIZE * Environment.TILE_GROWTH
            ),
            0,
            0
          )
        );
      }
    }
  }

  public draw() {
    /* for (
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
          "farmLand",
          1,
          1,
          new Vector(
            x * Environment.SIZE * Environment.tileGrowth,
            y * Environment.SIZE * Environment.tileGrowth
          )
        );
      }
    } */
    this.tiles.forEach((row) => row.forEach((tile) => tile.draw()));
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


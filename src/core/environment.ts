import { GLOBAL } from "../lib/global";
import { type Range } from "../types/zod";
import { Canvas } from "./canvas";
import Entity from "./entity";
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

  /* public drawMap() {
    console.log(this.tiles.length);
    if (GLOBAL("PLAYER").action ===  "run") {
    this.tiles.forEach((row) => row.forEach((tile) => tile.draw()));
    }

} */

  public draw() {
    this.tiles.forEach((row) => row.forEach((tile) => tile.draw()));
    return;
  }

  public getBusyTiles(entities: Entity[]) {
    const busyTiles = [];
    entities.forEach((entity) => {
      const entityPosition = entity.rect.position;

      const busyX = Math.floor(
        (GLOBAL("POSITION").x + entityPosition.x) /
          (Environment.SIZE * Environment.TILE_GROWTH)
      );
      const busyY = Math.floor(
        (GLOBAL("POSITION").y + entityPosition.y) /
          (Environment.SIZE * Environment.TILE_GROWTH)
      );

      const entityWidth =
        entity.rect.width / Environment.SIZE / Environment.TILE_GROWTH;
      const entityHeight =
        entity.rect.height / Environment.SIZE / Environment.TILE_GROWTH;

      for (let y = busyY; y <= busyY + entityWidth; y++) {
        for (let x = busyX; x <= busyX + entityHeight; x++) {
          if (y < 0 || y >= Environment.ROWS || x < 0 || x >= Environment.COLS)
            continue;
          busyTiles.push(this.tiles[y][x]);
        }
      }
    });

    return busyTiles;
  }

  public clearBusyTiles(tiles: Tile[]) {
    tiles.forEach((tile) =>
      Canvas.ctx.clearRect(
        tile.rect.position.x - GLOBAL("POSITION").x,
        tile.rect.position.y - GLOBAL("POSITION").y,
        tile.rect.width,
        tile.rect.height
      )
    );
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

import { GLOBAL } from "../lib/global";
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
  }

  protected getBusyTiles(entities: Entity[]) {
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

  protected clearBusyTiles(tiles: Tile[]) {
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

export { Environment };

import { TODO, inBetween } from "../lib/global";
import { Directions } from "../types/general";
import Rect from "./rect";
import Vector from "./vector";

class Entity {
  public rect: Rect;
  public image: string;
  public imageRect: Rect;
  constructor(image: string, rect: Rect, imageRect?: Rect) {
    this.rect = rect;
    this.image = image;
    if (imageRect) this.imageRect = imageRect;
  }

  public collide(entity: Entity, offset: Vector = new Vector(0, 0)) {
    const position = this.rect.position.clone().add(offset);
    let allowedDirections: Map<Directions, boolean> = new Map([
      ["up", true],
      ["down", true],
      ["left", true],
      ["right", true],
    ]);
    const isOverlapping = (
      axis: "x" | "y",
      playerPosition: Vector,
      enemyPosition: Vector
    ) => {
      if (axis === "x") {
        return Math.abs(playerPosition.x - enemyPosition.x) < this.rect.width;
      } else {
        return Math.abs(playerPosition.y - enemyPosition.y) < this.rect.height;
      }
    };
    if (isOverlapping("y", position, entity.rect.position)) {
      // LEFT
      if (
        position.x - (entity.rect.position.x + entity.rect.width) < 0 &&
        position.x - (entity.rect.position.x + entity.rect.width) >
          -this.rect.width
      ) {
        allowedDirections.set("left", false);
      }
      // RIGHT
      if (
        position.x - entity.rect.position.x > -this.rect.width &&
        position.x - entity.rect.position.x < 0
      ) {
        allowedDirections.set("right", false);
      }
    }
    if (isOverlapping("x", position, entity.rect.position)) {
      // UP
      if (
        position.y <= entity.rect.position.y + entity.rect.height &&
        position.y >= entity.rect.position.y
      ) {
        allowedDirections.set("up", false);
      }
      // DOWN
      if (
        position.y + this.rect.height > entity.rect.position.y &&
        position.y < entity.rect.position.y + entity.rect.height
      ) {
        allowedDirections.set("down", false);
      }
    }

    // console.log(allowedDirections);
    return allowedDirections;
  }

  public hasCollision({ rect: { position, width, height } }: Entity): boolean {
    if (
      inBetween(this.rect.position.x, position.x, position.x + width) &&
      inBetween(this.rect.position.y, position.y, position.y + height)
    )
      return true;
    return false;
  }
  public draw() {
    TODO;
  }
}

export default Entity;

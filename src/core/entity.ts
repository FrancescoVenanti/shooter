import Rect from "./rect";
import Vector from "./vector";

class Entity {
  public rect: Rect;
  protected image: string;
  constructor(position: Vector, image: string, width: number, height: number) {
    this.rect = new Rect(position, width, height);
    this.image = image;
  }

  public collide(entity: Entity) {
    let allowedDirections: Map<"up" | "down" | "left" | "right", boolean> =
      new Map([
        ["up", true],
        ["down", true],
        ["left", true],
        ["right", true],
      ]);
    // const distance = Math.sqrt(Math.pow(this.position.x - enemy.position.x, 2) + Math.pow(this.position.y - enemy.position.y, 2));
    // console.log(distance)
    const distance = new Vector(
      this.rect.position.x - entity.rect.position.x,
      this.rect.position.y - entity.rect.position.y
    );
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
    if (isOverlapping("y", this.rect.position, entity.rect.position)) {
      // LEFT
      if (
        this.rect.position.x - (entity.rect.position.x + entity.rect.width) <
          0 &&
        this.rect.position.x - (entity.rect.position.x + entity.rect.width) >
          -this.rect.width
      ) {
        allowedDirections.set("left", false);
      }
      // RIGHT
      if (
        this.rect.position.x - entity.rect.position.x > -this.rect.width &&
        this.rect.position.x - entity.rect.position.x < 0
      ) {
        allowedDirections.set("right", false);
      }
    }
    if (isOverlapping("x", this.rect.position, entity.rect.position)) {
      // UP
      if (
        this.rect.position.y <= entity.rect.position.y + entity.rect.height &&
        this.rect.position.y >= entity.rect.position.y
      ) {
        allowedDirections.set("up", false);
      }
      // DOWN
      if (
        this.rect.position.y + this.rect.height > entity.rect.position.y &&
        this.rect.position.y < entity.rect.position.y + entity.rect.height
      ) {
        allowedDirections.set("down", false);
      }
    }

    // console.log(allowedDirections);
    return allowedDirections;
  }
}

export default Entity;

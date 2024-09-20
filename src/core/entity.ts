import Vector from "./vector";

class Entity {
  public position: Vector;
  protected image: string;
  protected width: number;
  protected height: number;
  constructor(position: Vector, image: string, width: number, height: number) {
    this.position = position;
    this.image = image;
    this.width = width;
    this.height = height;
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
      this.position.x - entity.position.x,
      this.position.y - entity.position.y
    );
    const isOverlapping = (
      axis: "x" | "y",
      playerPosition: Vector,
      enemyPosition: Vector
    ) => {
      if (axis === "x") {
        return Math.abs(playerPosition.x - enemyPosition.x) < this.width;
      } else {
        return Math.abs(playerPosition.y - enemyPosition.y) < this.height;
      }
    };
    if (isOverlapping("y", this.position, entity.position)) {
      // LEFT
      if (
        this.position.x - (entity.position.x + entity.width) < 0 &&
        this.position.x - (entity.position.x + entity.width) > -this.width
      ) {
        allowedDirections.set("left", false);
      }
      // RIGHT
      if (
        this.position.x - entity.position.x > -this.width &&
        this.position.x - entity.position.x < 0
      ) {
        allowedDirections.set("right", false);
      }
    }
    if (isOverlapping("x", this.position, entity.position)) {
      // UP
      if (
        this.position.y <= entity.position.y + entity.height &&
        this.position.y >= entity.position.y
      ) {
        allowedDirections.set("up", false);
      }
      // DOWN
      if (
        this.position.y + this.height > entity.position.y &&
        this.position.y < entity.position.y + entity.height
      ) {
        allowedDirections.set("down", false);
      }
    }

    // console.log(allowedDirections);
    return allowedDirections;
  }
}

export default Entity;

import { Canvas } from "../core/canvas";
import Entity from "../core/entity";
import Rect from "../core/rect";

class Attack extends Entity {
  public damage: number;
  public range: number;
  public speed: number;
  constructor(
    image: string,
    rect: Rect,
    damage: number,
    range: number,
    speed: number
  ) {
    super(image, rect);
    this.damage = damage;
    this.range = range;
    this.speed = speed;
  }

  public fire(angle: number) {
    console.log("shot");

    this.rect.position.x += Math.cos(angle) * this.speed;
    this.rect.position.y += Math.sin(angle) * this.speed;
  }
}

export default Attack;

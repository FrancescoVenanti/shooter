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

  public shot(angle: number) {
    console.log("shot");
    while (
      (console.log(this.rect.position.x),
      this.rect.position.x < Canvas.canvas.width &&
        this.rect.position.x > 0 &&
        this.rect.position.y < Canvas.canvas.height &&
        this.rect.position.y > 0)
    ) {
      this.rect.position.x += Math.cos(angle) * this.speed;
      this.rect.position.y += Math.sin(angle) * this.speed;
    }
  }
}

export default Attack;

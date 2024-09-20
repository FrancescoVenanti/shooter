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
}

export default Attack;
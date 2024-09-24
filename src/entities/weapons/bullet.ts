import { Canvas } from "../../core/canvas";
import Entity from "../../core/entity";
import Rect from "../../core/rect";
import Vector from "../../core/vector";
import { GLOBAL } from "../../lib/global";

class Bullet extends Entity {
  public angle: number;
  public speed: number;
  constructor(position: Vector, angle: number, speed: number = 10) {
    super("bullet", new Rect(position, 10, 10));
    this.angle = angle;
    this.speed = speed;
  }
  public move() {
    const offset = new Vector(
      Math.cos(this.angle) * this.speed * GLOBAL("DELTA"),
      Math.sin(this.angle) * this.speed * GLOBAL("DELTA")
    );
    this.rect.position = new Vector(
      this.rect.position.x + offset.x,
      this.rect.position.y + offset.y
    );
    this.draw()
  }
  public draw() {
    Canvas.fillRect(this.rect);
  }
}
export default Bullet;

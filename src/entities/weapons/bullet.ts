import { Canvas } from "../../core/canvas";
import Entity from "../../core/entity";
import Rect from "../../core/rect";
import Vector from "../../core/vector";
import { GLOBAL, SOCKET } from "../../lib/global";
import { inBetween } from "../../lib/utils";

class Bullet extends Entity {
  public angle: number;
  public speed: number;
  public date: number = new Date().getTime();
  public active: boolean = true;
  constructor(position: Vector, angle: number, speed: number = 10) {
    super("bullet", new Rect(position, 10, 10));
    this.angle = angle;
    this.speed = speed;
  }
  public move() {
    for(let enemy of GLOBAL('ENEMIES').values()) {
      if(this.hasCollision(enemy)) {
        this.active = false;
        break;
      }
    }
    if(!inBetween(this.rect.position.x, 0, Canvas.canvas.width) || !inBetween(this.rect.position.y, 0, Canvas.canvas.height)) {
      this.active = false;
    }
    if (!this.active) return;

    const offset = new Vector(
      Math.cos(this.angle) * this.speed * GLOBAL("DELTA"),
      Math.sin(this.angle) * this.speed * GLOBAL("DELTA")
    );
    this.rect.position = new Vector(
      this.rect.position.x + offset.x,
      this.rect.position.y + offset.y
    );

    SOCKET.emit('attack', 'move', {
      id: GLOBAL('PLAYER').id,
      angle: this.angle,
      position: {
        x: this.rect.position.x,
        y: this.rect.position.y
      }
    })
    this.draw()
  }
  public draw() {
    Canvas.fillRect(this.rect);
  }
}
export default Bullet;

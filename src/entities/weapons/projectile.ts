import { Canvas } from "../../core/canvas";
import Entity from "../../core/entity";
import Rect from "../../core/rect";
import Vector from "../../core/vector";
import { GLOBAL, SOCKET, WEAPON } from "../../lib/global";
import { inBetween } from "../../lib/utils";

class Projectile extends Entity {
  public angle: number;
  public speed: number;
  public date: number = new Date().getTime();
  public active: boolean = true;

  constructor(
    image: keyof typeof WEAPON,
    position: Vector,
    angle: number,
    speed: number = 10
  ) {
    super(
      `../../assets/character/${WEAPON[image]["image"]}/${WEAPON[image]["image"]}.png`,
      new Rect(position, 10, 10)
    );
    this.angle = angle;
    this.speed = speed;
  }
  public move() {
    for (let enemy of GLOBAL("ENEMIES").values()) {
      if (this.hasCollision(enemy)) {
        this.active = false;
        break;
      }
    }
    if (
      !inBetween(this.rect.position.x, 0, Canvas.canvas.width) ||
      !inBetween(this.rect.position.y, 0, Canvas.canvas.height)
    ) {
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

    SOCKET.emit("attack", "move", {
      id: GLOBAL("PLAYER").id,
      angle: this.angle,
      position: {
        x: this.rect.position.x,
        y: this.rect.position.y,
      },
    });
    this.draw();
  }
  public draw() {
    const { width, height, size, start } = WEAPON["book"];
    const dy = (4 - Math.floor((this.angle / Math.PI) * 2)) % 4;
    Canvas.imageRect(
      this.image,
      new Rect(
        new Vector(
          Math.floor((GLOBAL("FRAME") / GLOBAL("FPS")) * size) * width,
          start * height * 4 + dy * height + height / 6
        ),
        width,
        height
      ),
      new Rect(
        this.rect.position,
        (width / GLOBAL("ZOOM")) * 1.2,
        (height / GLOBAL("ZOOM")) * 1.2
      )
    );
  }
}
export default Projectile;

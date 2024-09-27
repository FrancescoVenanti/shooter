import { Canvas } from "../../core/canvas";
import Entity from "../../core/entity";
import { Environment } from "../../core/environment";
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
    speed: number
  ) {
    super(
      `../../assets/character/${WEAPON[image]["image"]}/${WEAPON[image]["image"]}.png`,
      new Rect(position, 10, 10)
    );
    this.angle = angle;
    this.speed = speed;
  }
  public move() {
    if (!this.active) return;
    for (let enemy of GLOBAL("ENEMIES").values()) {
      if (this.hasCollision(enemy)) {
        this.active = false;
        break;
      }
    }
    if (
      !inBetween(
        this.rect.position.x,
        this.rect.width,
        Environment.width - this.rect.width
      ) ||
      !inBetween(
        this.rect.position.y,
        this.rect.height,
        Environment.height + this.rect.height
      )
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
        x: GLOBAL("POSITION").x + this.rect.position.x,
        y: GLOBAL("POSITION").y + this.rect.position.y,
      },
    });
    this.draw(GLOBAL("POSITION"));
  }
  public draw(offset: Vector = new Vector(0, 0)) {
    const { width, height, size, start } = WEAPON["book"];
    Canvas.imageRect(
      this.image,
      new Rect(
        new Vector(
          Math.floor((GLOBAL("FRAME") / GLOBAL("FPS")) * size) * width,
          start * height * 4 + 0 * height + height / 6
        ),
        width,
        height
      ),
      new Rect(
        new Vector(
          this.rect.position.x - offset.x,
          this.rect.position.y - offset.y
        ),
        (width / GLOBAL("ZOOM")) * 1.2,
        (height / GLOBAL("ZOOM")) * 1.2
      )
    );
  }
}
export default Projectile;

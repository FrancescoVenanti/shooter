import { Canvas } from "../../core/canvas";
import Entity from "../../core/entity";
import { Environment } from "../../core/environment";
import Rect from "../../core/rect";
import Vector from "../../core/vector";
import { Asset, GLOBAL, ImageRect, inBetween } from "../../lib/global";

class Projectile extends Entity {
  private projectileSprite: ImageRect;
  public angle: number;
  public speed: number;
  public date: number = new Date().getTime();
  public active: boolean = true;

  constructor(
    image: keyof Asset["character"],
    position: Vector,
    angle: number,
    speed: number,
    projectileSprite: ImageRect
  ) {
    super(
      `../../assets/character/${image}/${image}.png`,
      new Rect(position, 10, 10)
    );
    this.projectileSprite = projectileSprite;
    // console.log(image);

    this.angle = angle;
    this.speed = speed;
  }
  public move(offset: Vector = new Vector(0, 0)) {
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
    const ofst = new Vector(
      Math.cos(this.angle) * this.speed * GLOBAL("DELTA"),
      Math.sin(this.angle) * this.speed * GLOBAL("DELTA")
    );
    this.rect.position = new Vector(
      this.rect.position.x + ofst.x,
      this.rect.position.y + ofst.y
    );
    this.draw(offset);
  }
  public draw(offset: Vector = new Vector(0, 0)) {
    if (!this.active) return;
    const { width, height, size, start } = this.projectileSprite;
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

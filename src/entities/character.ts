import { Canvas } from "../core/canvas";
import Entity from "../core/entity";
import Rect from "../core/rect";
import Vector from "../core/vector";
import { Asset, ASSETS, GLOBAL, random } from "../lib/global";

class Character extends Entity {
  public angle: number = 0;
  public id: string;
  public life: number = 100;
  protected sprite: keyof Asset["character"];
  protected action: keyof Asset["character"][keyof Asset["character"]];
  constructor(
    sprite: keyof Asset["character"],
    action: keyof Asset["character"][keyof Asset["character"]],
    position: Vector = new Vector(0, 0),
    life: number = 100
  ) {
    super(
      `./src/assets/character/${sprite}/${sprite}.png`,
      new Rect(
        position,
        ASSETS["character"][sprite][action]["width"],
        ASSETS["character"][sprite][action]["height"]
      )
    );
    this.life = life;
    this.action = action;
    this.id = random(10);
    this.sprite = sprite;
  }

  public update() {

  }

  public draw() {
    const {width, height, size} = ASSETS['character'][this.sprite][this.action];
    Canvas.imageRect(
      this.image,
      new Rect(
        new Vector(Math.floor((GLOBAL("FRAME") / GLOBAL('FPS')) * size) * width + width / 4, 6 * height + height / 2),
        width - width / 4,
        height / 2
      ),
      this.rect
    );
  }

  public changePosition(newPosition: Vector, angle: number) {
    this.angle = angle;
    this.rect.position = newPosition;
  }

  public darkenPlayer() {
    /* for (let i = 0; i < this.life; i++) {
      Canvas.ctx.fillStyle = `rgba(0, 0, 0, ${1 - i / 100})`;
    } */
    Canvas.ctx.fillStyle = `rgba(0, 0, 0, 0.5)`;
    Canvas.fillRect(this.rect);
  }
}

export { Character };

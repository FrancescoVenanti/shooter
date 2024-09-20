import { FRAME, MAX_FRAME, SPRITE_SIZE } from "..";
import { Canvas } from "../core/canvas";
import Entity from "../core/entity";
import Rect from "../core/rect";
import Vector from "../core/vector";
import { Asset, assets, random } from "../lib/global";

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
      position,
      `./src/assets/character/${sprite}/${action}.png`,
      assets["character"]["placeholder"]["idle"]["width"] * 5,
      assets["character"]["placeholder"]["idle"]["height"] * 5
    );
    this.life = life;
    this.action = action;
    this.id = random(10);
    this.sprite = sprite;
  }

  public draw() {
    let dy = ((this.angle - Math.PI / 2) / Math.PI) * 4;
    if (dy < 0) {
      dy = 8 + dy;
    }
    Canvas.imageRect(
      this.image,
      new Rect(
        new Vector(Math.floor((FRAME / MAX_FRAME) * 4) * 16, dy * SPRITE_SIZE),
        SPRITE_SIZE,
        SPRITE_SIZE
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

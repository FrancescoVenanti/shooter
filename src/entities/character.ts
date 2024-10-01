import { Canvas } from "../core/canvas";
import Entity from "../core/entity";
import Rect from "../core/rect";
import Vector from "../core/vector";
import { Asset, ASSETS, GLOBAL, random, TODO, WEAPON } from "../lib/global";
import { Range } from "../types/zod";
import Weapon from "./weapons/weapon";

class Character extends Entity {
  public angle: number = 0;
  public id: string;
  public life: Range<101>;
  public sprite: keyof Asset["character"];
  public action: keyof Asset["character"][keyof Asset["character"]];
  public primaryWeapon: Weapon;
  constructor(
    sprite: keyof Asset["character"],
    action: keyof Asset["character"][keyof Asset["character"]],
    position: Vector = new Vector(0, 0),
    life: Range<101> = 100
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
    this.primaryWeapon = WEAPON[sprite]["weapon"];
  }

  public update() {
    TODO;
  }

  public draw(offset: Vector = new Vector(0, 0)) {
    const { width, height, size, start } =
      ASSETS["character"][this.sprite][this.action];
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
        new Vector(
          this.rect.position.x - offset.x,
          this.rect.position.y - offset.y
        ),
        (width / GLOBAL("ZOOM")) * 1.2,
        (height / GLOBAL("ZOOM")) * 1.2
      )
    );
    if (
      this.action === "attack" &&
      Math.floor((GLOBAL("FRAME") / GLOBAL("FPS")) * size) === size - 1
    ) {
      this.action = "idle";
    }
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
  public attack(offset: Vector = new Vector(0, 0)) {
    this.primaryWeapon.attack(
      this.angle,
      this.rect.position.clone().add(offset)
    );
  }

  public drawLife(
    offset: Vector = new Vector(0, 0),
    width: number = 80,
    height: number = 10
  ) {
    const padding = 2;
    Canvas.ctx.fillStyle = "black";
    Canvas.ctx.fillRect(
      this.rect.position.x - 10 - offset.x - padding,
      this.rect.position.y - 10 - offset.y - padding,
      width + padding * 2,
      height + padding * 2
    );
    Canvas.ctx.fillStyle = "red";
    Canvas.ctx.fillRect(
      this.rect.position.x - 10 - offset.x,
      this.rect.position.y - 10 - offset.y,
      width,
      height
    );
    if (this.life <= 0) return;
    Canvas.ctx.fillStyle = "green";
    Canvas.ctx.fillRect(
      this.rect.position.x - 10 - offset.x,
      this.rect.position.y - 10 - offset.y,
      (this.life / 100) * width,
      height
    );
  }

  public drawName(offset: Vector = new Vector(0, 0)) {
    Canvas.ctx.fillStyle = "black";
    Canvas.ctx.font = "bold 10px Monospace";
    Canvas.ctx.fillText(
      this.id,
      this.rect.position.x - offset.x,
      this.rect.position.y - 15 - offset.y
    );
  }
}

export default Character;

import Vector from "../core/vector";
import { Asset, GLOBAL } from "../lib/global";
import Character from "./character";

class Enemy extends Character {
  constructor(
    sprite: keyof Asset["character"],
    action: keyof Asset["character"][keyof Asset["character"]],
    position: Vector = new Vector(0, 0),
    angle: number = 0,
    life: number = 100
  ) {
    super(sprite, action, position, life);
    this.angle = angle;
  }

  public draw() {
    console.log(
      new Vector(
        this.rect.position.x - GLOBAL("POSITION").x,
        this.rect.position.y - GLOBAL("POSITION").y
      )
    );
    super.draw(new Vector(-GLOBAL("POSITION").x, -GLOBAL("POSITION").y));
  }
}

export default Enemy;

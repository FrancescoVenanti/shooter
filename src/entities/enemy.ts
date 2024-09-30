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

  public update() {
    this.draw();
    this.primaryWeapon.update();
  }

  public draw() {
    super.draw(GLOBAL("POSITION"));
    for (const projectile of this.primaryWeapon.bullets) {
      projectile.draw(GLOBAL("POSITION"));
    }
  }
  public attack(offset: Vector = new Vector(0, 0)) {
    this.primaryWeapon.attack(
      this.angle,
      this.rect.position.clone().add(offset)
    );
  }
}

export default Enemy;

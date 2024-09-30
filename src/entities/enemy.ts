import { Environment } from "../core/environment";
import Vector from "../core/vector";
import { Asset, GLOBAL } from "../lib/global";
import Character from "./character";
import Ranged from "./weapons/ranged";
import Weapon from "./weapons/weapon";

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
    super.draw(GLOBAL("POSITION"));
    for (const projectile of this.primaryWeapon.bullets) {
      projectile.draw();
    }
  }
}

export default Enemy;

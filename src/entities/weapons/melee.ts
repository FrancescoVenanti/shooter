import Rect from "../../core/rect";
import Vector from "../../core/vector";
import { GLOBAL } from "../../lib/global";
import { inBetween } from "../../lib/utils";
import Weapon from "./weapon";

class Melee extends Weapon {
  private lastShotTime: number = 0;
  private reloading: boolean = false;
  private reloadStartTime: number = 0;
  constructor(
    rect: Rect,
    damage: number,
    range: number = 50,
    speed: number,
    rate: number = 1,
    magazineSize: number = 1,
    reloadTime: number = 1
  ) {
    super(rect, damage, range, speed, rate, magazineSize, reloadTime);
  }

  public attack(angle: number, position: Vector) {
    const now = new Date().getTime();

    const timeSinceLastShot = (now - this.lastShotTime) / 1000;
    const minTimeBetweenShots = 1 / this.rate;

    if (timeSinceLastShot >= minTimeBetweenShots) {
      //todo
      GLOBAL("ENEMIES").forEach((enemy) => {
        if (this.rect.getDistance(enemy.rect)[1] < this.range) {
          console.log("hit");
        }
      });
    }
  }

  private startReloading(now: number) {
    this.reloading = true;
    this.reloadStartTime = now;
  }
}

export default Melee;

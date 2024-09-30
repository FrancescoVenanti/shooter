import Rect from "../../core/rect";
import Vector from "../../core/vector";
import { GLOBAL } from "../../lib/global";
import Weapon from "./weapon";

interface IMelee {
  rect: Rect;
  damage: number;
  range: number;
  speed: number;
  rate: number;
  magazineSize: number;
  reloadTime: number;
}

class Melee extends Weapon {
  private lastShotTime: number = 0;
  private reloading: boolean = false;
  private reloadStartTime: number = 0;
  constructor({
    rect,
    damage,
    range = 50,
    speed,
    rate = 1,
    magazineSize = 1,
    reloadTime = 1,
  }: IMelee) {
    super(rect, damage, range, speed, rate, magazineSize, reloadTime);
  }

  public attack(angle: number, position: Vector) {
    const now = new Date().getTime();

    const timeSinceLastShot = (now - this.lastShotTime) / 1000;
    const minTimeBetweenShots = 1 / this.rate;

    if (timeSinceLastShot >= minTimeBetweenShots) {
      //todo
      GLOBAL("ENEMIES").forEach((enemy) => {
        console.log(this.rect.getDistance(enemy.rect));
        console.log(this.range);
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

  public update() {
    // console.log("update");
  }
}

export default Melee;

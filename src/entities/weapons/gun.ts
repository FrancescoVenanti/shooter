import Rect from "../../core/rect";
import Vector from "../../core/vector";
import Bullet from "./bullet";
import Weapon from "./weapon";

class Gun extends Weapon {
  private remainingBullets: number = 0;
  private lastShotTime: number = 0;
  private reloading: boolean = false;
  private reloadStartTime: number = 0;

  constructor(
    image: string,
    rect: Rect,
    damage: number,
    range: number,
    speed: number,
    rate: number = 5,
    reloadTime: number = 3,
    magazineSize: number = 20
  ) {
    super(image, rect, damage, range, speed, rate, reloadTime, magazineSize);
    this.remainingBullets = magazineSize;
  }

  public attack(angle: number, position: Vector) {
    const now = new Date().getTime();

    if (this.reloading) {
      const reloadElapsed = (now - this.reloadStartTime) / 1000;
      if (reloadElapsed < this.reloadTime) return;
      this.remainingBullets = this.magazineSize;
      this.reloading = false;
    }

    const timeSinceLastShot = (now - this.lastShotTime) / 1000;
    const minTimeBetweenShots = 1 / this.rate;

    if (timeSinceLastShot >= minTimeBetweenShots && this.remainingBullets > 0) {
      this.bullets.push(new Bullet(position.clone(), angle));

      this.remainingBullets--;
      this.lastShotTime = now;
    }

    if (this.remainingBullets === 0) {
      this.startReloading(now);
    }
  }

  private startReloading(now: number) {
    this.reloading = true;
    this.reloadStartTime = now;
  }

  public update() {
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].move();
    }
  }
}

export default Gun;

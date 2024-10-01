import Rect from "../../core/rect";
import Vector from "../../core/vector";
import { GLOBAL, ImageRect, SOCKET } from "../../lib/global";
import Projectile from "./projectile";
import Weapon from "./weapon";

interface IRanged {
  projectileImage: ImageRect;
  rect: Rect;
  damage: number;
  range: number;
  speed: number;
  rate: number;
  reloadTime: number;
  magazineSize: number;
}

class Ranged extends Weapon {
  private remainingBullets: number = 0;
  private lastShotTime: number = 0;
  private reloading: boolean = false;
  private reloadStartTime: number = 0;
  private projectileImage: ImageRect;

  constructor({
    projectileImage,
    rect,
    damage = 100,
    range = 100,
    speed = 1,
    rate = 1,
    reloadTime = 1,
    magazineSize = 1,
  }: IRanged) {
    super(rect, damage, range, speed, rate, reloadTime, magazineSize);
    this.remainingBullets = magazineSize;
    this.projectileImage = projectileImage;
  }

  public attack(angle: number, position: Vector) {
    let canAttack = false;
    const now = new Date().getTime();
    // console.log("attack");

    if (this.reloading) {
      const reloadElapsed = (now - this.reloadStartTime) / 1000;
      if (reloadElapsed < this.reloadTime) return;
      this.remainingBullets = this.magazineSize;
      this.reloading = false;
    }

    const timeSinceLastShot = (now - this.lastShotTime) / 1000;
    const minTimeBetweenShots = 1 / this.rate;
    if (timeSinceLastShot >= minTimeBetweenShots && this.remainingBullets > 0) {
      canAttack = true;
      SOCKET.emit("attack", "move", {
        id: GLOBAL("PLAYER").id,
        angle: GLOBAL("PLAYER").angle,
        position: {
          x: GLOBAL("POSITION").x + this.rect.position.x,
          y: GLOBAL("POSITION").y + this.rect.position.y,
        },
      });
      this.bullets.push(
        new Projectile(
          this.projectileImage.image,
          position.clone(),
          angle,
          this.speed,
          this.projectileImage
        )
      );

      this.remainingBullets--;
      this.lastShotTime = now;
    }

    if (this.remainingBullets === 0) {
      this.startReloading(now);
    }
    return canAttack;
  }

  private startReloading(now: number) {
    this.reloading = true;
    this.reloadStartTime = now;
  }

  public update(offset: Vector = new Vector(0, 0)) {
    // const deadBullets: Set<number> = new Set<number>();
    for (let i = 0; i < this.bullets.length; i++) {
      // if (!this.bullets[i].active) deadBullets.add(i);
      this.bullets[i].move(offset);
    }
  }
}

export default Ranged;

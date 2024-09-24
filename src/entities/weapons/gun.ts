import Rect from "../../core/rect";
import Vector from "../../core/vector";
import Bullet from "./bullet";
import Weapon from "./weapon";

class Gun extends Weapon {
  public bullets: Bullet[] = [];
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
  }

  public attack(angle: number, position: Vector) {
    const now = new Date().getTime();
    const count = this.bullets.reduce((prev, curr) => {
      if (curr.date > now - 1000) {
        prev++;
      }
      return prev;
    }, 0);

    if (
      count < this.reloadTime &&
      (this.bullets.length === 0 ||
        this.bullets[this.bullets.length - 1].date <= now - this.rate)
    ) {
      this.bullets.push(new Bullet(position.clone(), angle));
    }
  }

  public update() {
    const toDelete = new Set<number>();
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].move();
    }
  }
}

export default Gun;

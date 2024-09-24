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
    speed: number
  ) {
    super(image, rect, damage, range, speed);
  }

  public attack(angle: number, position: Vector) {
    console.log(this.bullets.length);
    this.bullets.push(new Bullet(position.clone(), angle));
  }

  public update() {
    const toDelete = new Set<number>();
    for(let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].move();
    }
  }
}

export default Gun;

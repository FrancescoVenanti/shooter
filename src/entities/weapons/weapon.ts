import Rect from "../../core/rect";
import Vector from "../../core/vector";
import { TODO } from "../../lib/global";
import Bullet from "./projectile";

abstract class Weapon {
  public damage: number;
  public range: number;
  public speed: number;
  public rate: number; // rate of fire in seconds
  public reloadTime: number;
  public magazineSize: number;
  public bullets: Bullet[] = [];
  public rect: Rect;

  constructor(
    rect: Rect,
    damage: number,
    range: number,
    speed: number,
    rate: number = 1,
    reloadTime: number = 1,
    magazineSize: number = 1
  ) {
    this.rect = rect;
    this.damage = damage;
    this.range = range;
    this.speed = speed;
    this.rate = rate;
    this.reloadTime = reloadTime;
    this.magazineSize = magazineSize;
  }

  public attack(angle: number, position: Vector): boolean {
    TODO;
    return false;
  }
  public update(offset: Vector = new Vector(0, 0)) {
    TODO;
  }
}

export default Weapon;

// const worker = new Worker('../worker/shotWorker.ts');
// worker.addEventListener('message', (event) => {
//   const data = event.data;
//   console.log(data);
//   console.log('jxfjdshf');
// });
// worker.postMessage("icao")

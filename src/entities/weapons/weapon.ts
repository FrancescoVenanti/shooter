import Entity from "../../core/entity";
import Rect from "../../core/rect";
import Vector from "../../core/vector";

abstract class Weapon extends Entity {
  public damage: number;
  public range: number;
  public speed: number;
  public rate: number; // rate of fire in seconds
  public reloadTime: number;
  public magazineSize: number;

  constructor(
    image: string,
    rect: Rect,
    damage: number,
    range: number,
    speed: number,
    rate: number = 1,
    reloadTime: number = 1,
    magazineSize: number = 1
  ) {
    super(image, rect);
    this.damage = damage;
    this.range = range;
    this.speed = speed;
    this.rate = rate;
    this.reloadTime = reloadTime;
    this.magazineSize = magazineSize;
  }

  public attack(angle: number, position: Vector) {
    throw new Error("Method not implemented.");
  }
  public update() {
    throw new Error("Method not implemented.");
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

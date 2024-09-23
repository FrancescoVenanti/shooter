import Entity from '../core/entity';
import Rect from '../core/rect';
import ShotWorker from '../worker/shotWorker?worker'; // Adjusted for correct path




class Attack extends Entity {
  public damage: number;
  public range: number;
  public speed: number;

  constructor(
    image: string,
    rect: Rect,
    damage: number,
    range: number,
    speed: number
  ) {
    super(image, rect);
    this.damage = damage;
    this.range = range;
    this.speed = speed;
  }

  public fire(angle: number) {
    console.log('shot');

    const worker = new ShotWorker();

    // Pass shot data to the worker
    worker.postMessage({
      startX: this.rect.position.x,
      startY: this.rect.position.y,
      speed: this.speed,
      angle,
      range: this.range,
    });

    // Listen for worker's message (i.e., the result)
    worker.onmessage = (e) => {
      const { x, y } = e.data;
      console.log(`Shot ended at (${x}, ${y})`);
      // Handle the result in your game (e.g., place the shot, check collision, etc.)
    };
  }
}

export default Attack;

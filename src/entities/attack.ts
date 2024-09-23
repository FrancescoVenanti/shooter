import { Worker } from "worker_threads";
import path from "path";
import Entity from "../core/entity";
import Rect from "../core/rect";
import Vector from "../core/vector";

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
    console.log("shot");

    const worker = new Worker(
      path.resolve(__dirname, "../workers/shotWorker.ts")
    );

    // Pass shot data to the worker
    worker.postMessage({
      startX: this.rect.position.x,
      startY: this.rect.position.y,
      speed: this.speed,
      angle,
      range: this.range,
    });

    worker.on("message", (result) => {
      // Handle the result from the worker, e.g., move the projectile
      this.rect.position.x = result.endX;
      this.rect.position.y = result.endY;
      console.log("Shot finished, hit:", result.hit);

      // Optionally, handle collision or end the attack if range is completed
    });

    worker.on("error", (err) => {
      console.error("Worker error:", err);
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
      }
    });
  }
}

export default Attack;

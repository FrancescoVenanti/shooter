import { Canvas } from "../core/canvas";
import Entity from "../core/entity";
import Rect from "../core/rect";
import Vector from "../core/vector";
import { Asset, GLOBAL, socket } from "../lib/global";
import Attack from "./attack";
import { Character } from "./character";

class Player extends Character {
  public speed: number;
  public default: Attack;
  public special: Attack;
  constructor(
    sprite: keyof Asset["character"],
    action: keyof Asset["character"][keyof Asset["character"]],
    position: Vector = new Vector(0, 0),
    speed: number = 3,
    life: number = 100
  ) {
    super(sprite, action, position, life);
    this.speed = speed;
  }

  public move(angle: number, enemies: Map<String, Character>) {
    let allowedDirections = this.checkCollision(Array.from(enemies.values()));
    this.angle = angle;
    const offset = new Vector(
      Math.cos(this.angle) * this.speed * GLOBAL("DELTA"),
      Math.sin(this.angle) * this.speed * GLOBAL("DELTA")
    );
    if (offset.x > 0 && allowedDirections.get("right")) {
      if (this.rect.position.x + this.rect.width < Canvas.canvas.width) {
        this.rect.position.x += offset.x;
      }
    } else if (offset.x < 0 && allowedDirections.get("left")) {
      if (this.rect.position.x > 0) {
        this.rect.position.x += offset.x;
      }
    }

    if (offset.y > 0 && allowedDirections.get("down")) {
      if (this.rect.position.y + this.rect.height < Canvas.canvas.height) {
        this.rect.position.y += offset.y;
      }
    } else if (offset.y < 0 && allowedDirections.get("up")) {
      if (this.rect.position.y > 0) {
        this.rect.position.y += offset.y;
      }
    }

    socket.emit("room", "move", {
      x: this.rect.position.x,
      y: this.rect.position.y,
      id: this.id,
      angle,
    });
  }

  public checkCollision(entities: Entity[]) {
    const allowedDirections = new Map([
      ["up", true],
      ["down", true],
      ["left", true],
      ["right", true],
    ]);
    for (const entity of entities) {
      const allowedForEntity = this.collide(entity);
      (["up", "down", "left", "right"] as const).forEach((direction) => {
        allowedDirections.set(
          direction,
          allowedDirections.get(direction) && allowedForEntity.get(direction)
        );
      });
    }
    return allowedDirections;
  }

  public shot() {
    let rect = new Rect(
      new Vector(this.rect.position.x, this.rect.position.y),
      10,
      10
    );
    let attack = new Attack("placeholder", rect, 10, 100, 0.001);
    attack.fire(this.angle);
  }
}

export default Player;

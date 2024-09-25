import { Canvas } from "../core/canvas";
import Entity from "../core/entity";
import Rect from "../core/rect";
import Vector from "../core/vector";
import { Asset, GLOBAL, SOCKET } from "../lib/global";
import { Character } from "./character";
import Gun from "./weapons/gun";
import Weapon from "./weapons/weapon";

class Player extends Character {
  public speed: number;
  public primaryWeapon: Weapon;
  public specialWeapon: Weapon;
  constructor(
    sprite: keyof Asset["character"],
    action: keyof Asset["character"][keyof Asset["character"]],
    position: Vector = new Vector(0, 0),
    speed: number = 5,
    life: number = 100,
    primaryWeapon: Weapon = new Gun('', new Rect(new Vector(0, 0), 0, 0), 0, 0, 0),
  ) {
    super(sprite, action, position, life);
    this.speed = speed;
    this.primaryWeapon = primaryWeapon;
  }

  public update() {
    let dx = 0;
    let dy = 0;
    if (GLOBAL("KEY_PRESSED").has("w")) dy -= 1;
    if (GLOBAL("KEY_PRESSED").has("s")) dy += 1;
    if (GLOBAL("KEY_PRESSED").has("a")) dx -= 1;
    if (GLOBAL("KEY_PRESSED").has("d")) dx += 1;
    if (GLOBAL("KEY_PRESSED").has(" ")) {
      this.action = 'attack';
      this.attack();
    }

    if (dx !== 0 || dy !== 0) {
      const angle = Math.atan2(dy, dx);
      this.move(angle);
      SOCKET.emit("room", "move", {
        x: this.rect.position.x,
        y: this.rect.position.y,
        id: this.id,
        angle,
      });
    }
    this.draw();
    this.primaryWeapon.update();
  }

  public move(angle: number) {
    let allowedDirections = this.checkCollision(Array.from(GLOBAL('ENEMIES').values()));
    this.angle = angle;
    const offset = new Vector(
      Math.cos(this.angle) * this.speed * GLOBAL("DELTA") / GLOBAL("ZOOM"),
      Math.sin(this.angle) * this.speed * GLOBAL("DELTA") / GLOBAL("ZOOM")
    );
    if (offset.x > 0 && allowedDirections.get("right")) {
      if (this.rect.position.x + this.rect.width < Canvas.canvas.width) {
        this.rect.position.x += offset.x;
      }
    }
    if (offset.x < 0 && allowedDirections.get("left")) {
      if (this.rect.position.x > 0) {
        this.rect.position.x += offset.x;
      }
    }

    if (offset.y > 0 && allowedDirections.get("down")) {
      if (this.rect.position.y + this.rect.height < Canvas.canvas.height) {
        this.rect.position.y += offset.y;
      }
    }
    if (offset.y < 0 && allowedDirections.get("up")) {
      if (this.rect.position.y > 0) {
        this.rect.position.y += offset.y;
      }
    }
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

  public attack() {
    this.primaryWeapon.attack(this.angle, this.rect.position);
  }
}

export default Player;

import { Canvas } from "../core/canvas";
import Entity from "../core/entity";
import { Environment } from "../core/environment";
import Vector from "../core/vector";
import { Asset, GLOBAL, SOCKET } from "../lib/global";
import { inBetween } from "../lib/utils";
import Character from "./character";
import Melee from "./weapons/melee";
import Weapon from "./weapons/weapon";

class Player extends Character {
  public speed: number;
  public primaryWeapon: Weapon;
  public specialWeapon: Weapon;
  constructor(
    sprite: keyof Asset["character"],
    action: keyof Asset["character"][keyof Asset["character"]],
    speed: number = 5,
    life: number = 100
  ) {
    super(sprite, action, new Vector(0, 0), life);
    this.speed = speed;
    const primaryWeapon: Weapon = new Melee(this.rect, 50, 1000, 50);
    this.primaryWeapon = primaryWeapon;
  }

  public update() {
    let dx = 0;
    let dy = 0;
    if (this.action !== "attack") {
      if (GLOBAL("KEY_PRESSED").has("w")) dy -= 1;
      if (GLOBAL("KEY_PRESSED").has("s")) dy += 1;
      if (GLOBAL("KEY_PRESSED").has("a")) dx -= 1;
      if (GLOBAL("KEY_PRESSED").has("d")) dx += 1;
    }
    if (GLOBAL("KEY_PRESSED").has(" ")) {
      this.action = "attack";
      this.attack();
    }

    if (dx !== 0 || dy !== 0) {
      const angle = Math.atan2(dy, dx);
      this.move(angle);
      SOCKET.emit("room", "move", {
        x: GLOBAL("POSITION").x,
        y: GLOBAL('POSITION').y,
        id: this.id,
        angle,
      });
    }
    this.draw();
    this.primaryWeapon.update();
  }

  public move(angle: number) {
    let allowedDirections = this.checkCollision(
      Array.from(GLOBAL("ENEMIES").values())
    );
    this.angle = angle;
    const offset = new Vector(
      (Math.cos(this.angle) * this.speed * GLOBAL("DELTA")) / GLOBAL("ZOOM"),
      (Math.sin(this.angle) * this.speed * GLOBAL("DELTA")) / GLOBAL("ZOOM")
    );
    if(inBetween(GLOBAL('POSITION').x + offset.x, -this.rect.position.x, Environment.WIDTH * Environment.TILE_GROWTH * Environment.SIZE - this.rect.position.x - this.rect.width)) {

      if (offset.x > 0 && allowedDirections.get("right")) {
        if (this.rect.position.x + this.rect.width < Canvas.canvas.width) {
          GLOBAL("POSITION").x += offset.x;
          // this.rect.position.x += offset.x;
      }
    }
    if (offset.x < 0 && allowedDirections.get("left")) {
      if (this.rect.position.x > 0) {
        GLOBAL("POSITION").x += offset.x;
        // this.rect.position.x += offset.x;
      }
    }
  }
  if(inBetween(GLOBAL('POSITION').y + offset.y, -this.rect.position.y, Environment.HEIGHT * Environment.TILE_GROWTH * Environment.SIZE - this.rect.position.y - this.rect.height)) {
    if (offset.y > 0 && allowedDirections.get("down")) {
      if (this.rect.position.y + this.rect.height < Canvas.canvas.height) {
        GLOBAL("POSITION").y += offset.y;
        // this.rect.position.y += offset.y;
      }
    }
    if (offset.y < 0 && allowedDirections.get("up")) {
      if (this.rect.position.y > 0) {
        GLOBAL("POSITION").y += offset.y;
        // this.rect.position.y += offset.y;
      }
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

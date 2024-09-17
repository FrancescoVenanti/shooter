import { frame, MAX_FRAME, SPRITE_SIZE } from "..";
import { playerActions, playerClass } from "../lib/utils";
import { Canvas } from "./canvas";
import Vector from "./vector";

export class Sprite {
  public position: Vector;
  public size: number;
  public speed: number;
  public angle: number;
  public action: keyof typeof playerActions;
  protected character: (typeof playerClass)[number];
  constructor(
    character: (typeof playerClass)[number],
    action: keyof typeof playerActions,
    speed: number,
    position: Vector,
    size: number = SPRITE_SIZE * 4,
    angle: number = 0
  ) {
    this.action = action;
    this.character = character;
    this.position = position;
    this.speed = speed;
    this.angle = angle;
    this.size = size;
  }

  public animate() {
    let dy = ((this.angle - Math.PI / 2) / Math.PI) * 4;
    if (dy < 0) {
      dy = 8 + dy;
    }
    Canvas.imageRect(
      `./src/assets/Sprites/${this.character}/${this.action}.png`,
      new Vector(
        Math.floor((frame / MAX_FRAME) * playerActions[this.action]) *
          SPRITE_SIZE,
        dy * SPRITE_SIZE
      ),
      SPRITE_SIZE,
      SPRITE_SIZE,
      this.position,
      this.size,
      this.size
    );
  }
  public move(angle: number) {
    this.angle = angle;
    const offset = new Vector(
      Math.cos(this.angle) * this.speed,
      Math.sin(this.angle) * this.speed
    );
    if (
      (offset.x >= 0 && this.position.x <= Canvas.canvas.width - this.size) ||
      (offset.x < 0 && this.position.x > 0)
    ) {
      this.position.x += Math.cos(this.angle) * this.speed;
    }
    if (
      (offset.y <= 0 && this.position.y >= 0) ||
      (offset.y >= 0 && this.position.y <= Canvas.canvas.height - this.size)
    ) {
      this.position.y += Math.sin(this.angle) * this.speed;
    }
  }
}

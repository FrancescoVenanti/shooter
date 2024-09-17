import { frame, MAX_FRAME, SPRITE_SIZE } from "..";
import { absAngle, playerActions, playerClass } from "../lib/utils";
import { Canvas } from "./canvas";
import Vector from "./vector";

export class Sprite {
  public position: Vector;
  public speed: number;
  public angle: number;
  public action: keyof typeof playerActions;
  protected character: (typeof playerClass)[number];
  constructor(
    character: (typeof playerClass)[number],
    action: keyof typeof playerActions,
    speed: number,
    position: Vector,
    angle: number = 0
  ) {
    this.action = action;
    this.character = character;
    this.position = position;
    this.speed = speed;
    this.angle = angle;
  }

  public animate() {
    console.log(Math.floor(absAngle(3 / 2 * Math.PI - this.angle)), this.angle)
    Canvas.imageRect(`./src/assets/Sprites/${this.character}/${this.action}.png`,
      new Vector(Math.floor(frame / MAX_FRAME * playerActions[this.action]) * SPRITE_SIZE, Math.floor(absAngle(3 / 2 * Math.PI - this.angle)) * SPRITE_SIZE),
      SPRITE_SIZE,
      SPRITE_SIZE,
      this.position,
      SPRITE_SIZE * 5, SPRITE_SIZE * 5
    );
  }
  public move(angle: number) {
    this.angle = angle;
    this.position.x += Math.cos(this.angle) * this.speed;
    this.position.y += Math.sin(this.angle) * this.speed;
  }
}

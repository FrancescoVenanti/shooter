import { frame, MAX_FRAME } from "..";
import { playerActions, playerClass } from "../lib/utils";
import { Canvas } from "./canvas";
import Vector from "./vector";

export class Sprite {
  public position: Vector;
  public speed: number;
  public action: keyof typeof playerActions;
  protected character: (typeof playerClass)[number];
  constructor(
    character: (typeof playerClass)[number],
    action: keyof typeof playerActions,
    speed: number,
    position: Vector
  ) {
    this.action = action;
    this.character = character;
    this.position = position;
    this.speed = speed;
  }

  public animate() {
    Canvas.image(
      "./src/assets/Sprites/" +
        this.character +
        "/" +
        this.action +
        "/" +
        (Math.floor((frame / MAX_FRAME) * playerActions[this.action]) + 1) +
        ".png",
      this.position,
    );
  }
  public move(angle: number) {
    this.position.x += Math.cos(angle) * this.speed;
    this.position.y += Math.sin(angle) * this.speed;
  }
}

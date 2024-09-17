import { frame, MAX_FRAME } from "..";
import { playerActions, playerClass } from "../lib/utils";
import { Canvas } from "./canvas";
import Vector from "./vector";

export class Sprite {
  public position: Vector;
  public speed: number;
  protected action: keyof typeof playerActions;
  protected modelName: (typeof playerClass)[number];
  constructor(
    modelName: (typeof playerClass)[number],
    action: keyof typeof playerActions,
    speed: number,
    position: Vector
  ) {
    this.action = action;
    this.modelName = modelName;
    this.position = position;
    this.speed = speed;
  }

  public animate() {
    Canvas.image(
      "./src/assets/Sprites/" +
        this.modelName +
        "/" +
        this.action +
        "/" +
        (Math.floor((frame / MAX_FRAME) * playerActions[this.action]) + 1) +
        ".png",
      this.position,
    );
  }
  public move(direction: 'left' | 'right' | 'up' | 'down') {
    if(direction === 'left'){
      this.position.x -= this.speed
    }
    if(direction === 'right'){
      this.position.x += this.speed
    }
    if(direction === 'up'){
      this.position.y -= this.speed
    }
    if(direction === 'down'){
      this.position.y += this.speed
    }
  }
}

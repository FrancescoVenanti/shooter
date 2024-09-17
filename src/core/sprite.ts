import * as fs from "fs";
import * as path from "path";
import { frame, MAX_FRAME } from "..";
import { Canvas } from "./canvas";
import Vector from "./vector";

export class Sprite {
  protected action: keyof typeof playerActions;
  protected modelName: (typeof playerClass)[number];
  constructor(
    modelName: (typeof playerClass)[number],
    action: keyof typeof playerActions
  ) {
    this.action = action;
    this.modelName = modelName;
  }

  public animate() {
    console.log(Math.floor((frame / MAX_FRAME) * playerActions[this.action]));
    Canvas.image(
      "./src/assets/Sprites/" +
        this.modelName +
        "/" +
        this.action +
        "/" +
        (Math.floor((frame / MAX_FRAME) * playerActions[this.action]) + 1) +
        ".png",
      new Vector(0, 0),
      0,
      0
    );
  }
}

const playerActions = {
  deadGround: 4,
  deadHit: 6,
  doorIn: 16,
  doorOut: 16,
  fall: 2,
  ground: 3,
  hit: 8,
  idle: 26,
  jump: 4,
  jumpAnticipation: 1,
  run: 14,
} as const;
const playerClass = [
  "bomb",
  "bald",
  "bigGuy",
  "captain",
  "cucumber",
  "whale",
] as const;

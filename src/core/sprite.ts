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
    const angleInRadians = (this.angle + 2 * Math.PI) % (2 * Math.PI); // Normalize angle within 0 to 2π
    const segmentSize = (2 * Math.PI) / 8; // 8 directions, so 45 degrees per segment

    let directionIndex =
      Math.floor((angleInRadians + segmentSize / 2) / segmentSize) % 8; // Add offset to center angles

    // Shift directionIndex by -2 to align correctly with your spritesheet
    directionIndex = (directionIndex - 2 + 8) % 8; // Ensure it wraps around using +8

    const currentFrame = Math.floor(
      (frame / MAX_FRAME) * playerActions[this.action]
    ); // Handle animation frame

    Canvas.imageRect(
      `./src/assets/Sprites/${this.character}/${this.action}.png`,
      new Vector(currentFrame * SPRITE_SIZE, directionIndex * SPRITE_SIZE), // X for animation frame, Y for direction
      SPRITE_SIZE,
      SPRITE_SIZE,
      this.position,
      SPRITE_SIZE * 5,
      SPRITE_SIZE * 5
    );
  }

  public move(angle: number) {
    this.angle = angle;
    this.position.x += Math.cos(this.angle) * this.speed;
    this.position.y += Math.sin(this.angle) * this.speed;
  }
}

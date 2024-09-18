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
    /*     //funziona diocan non provare ad eliminarlo o ti ammazzo
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
      SPRITE_SIZE * 5 */
    //il tuo invece non funziona sfigato del cazzo
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

    // X-axis movement constraint
    if (
      (offset.x > 0 && this.position.x + this.size < Canvas.canvas.width) || // Moving right and inside bounds
      (offset.x < 0 && this.position.x > 0) // Moving left and inside bounds
    ) {
      this.position.x += offset.x; // Move by calculated offset
    }

    // Y-axis movement constraint
    if (
      (offset.y > 0 && this.position.y + this.size < Canvas.canvas.height) || // Moving down and inside bounds
      (offset.y < 0 && this.position.y > 0) // Moving up and inside bounds
    ) {
      this.position.y += offset.y; // Move by calculated offset
    }
  }
}

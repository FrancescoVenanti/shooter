import { DELTA, FRAME, MAX_FRAME, SPRITE_SIZE } from "..";
import { random } from "../lib/global";
import { socket } from "../lib/socket";
import { playerActions, playerClass } from "../lib/utils";
import { Canvas } from "./canvas";
import Vector from "./vector";

export class Sprite {
  public position: Vector;
  public size: number;
  public speed: number;
  public angle: number;
  public id: string;
  public life: number = 100;
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
    if(!localStorage.getItem('id')){
      localStorage.setItem('id', random(10));
    }
    this.id = localStorage.getItem('id') as string;
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
        Math.floor((FRAME / MAX_FRAME) * playerActions[this.action]) *
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
      Math.cos(this.angle) * this.speed * DELTA,
      Math.sin(this.angle) * this.speed * DELTA
    );
    if (
      (offset.x > 0 && this.position.x + this.size < Canvas.canvas.width) ||
      (offset.x < 0 && this.position.x > 0)
    ) {
      this.position.x += offset.x;
    }

    if (
      (offset.y > 0 && this.position.y + this.size < Canvas.canvas.height) ||
      (offset.y < 0 && this.position.y > 0)
    ) {
      this.position.y += offset.y;
    }
    socket.emit('room', 'move', {x: this.position.x, y: this.position.y, id: this.id});
  }
  public changePosition(newPosition: Vector){
    this.position = newPosition
  }
}

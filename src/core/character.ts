import { DELTA, FRAME, MAX_FRAME, SPRITE_SIZE } from "..";
import { Asset, assets, random } from "../lib/global";
import { socket } from "../lib/socket";
import { Canvas } from "./canvas";
import Vector from "./vector";

class Character {
  public position: Vector;
  public speed: number;
  public angle: number = 0;
  public id: string;
  public life: number = 100;
  protected character: keyof Asset['character'];
  protected action: keyof Asset['character'][keyof Asset['character']];
  protected width: number = assets['character']['placeholder']['idle']['width'] * 5;
  protected height: number = assets['character']['placeholder']['idle']['height'] * 5;
  constructor(
    character: keyof Asset['character'],
    action: keyof Asset['character'][keyof Asset['character']],
    position: Vector = new Vector(0, 0),
    speed: number = 3,
    life: number = 100
  ) {
    this.life = life;
    this.action = action;
    this.id = random(10);
    this.character = character;
    this.position = position;
    this.speed = speed;
  }

  public draw() {
    let dy = ((this.angle - Math.PI / 2) / Math.PI) * 4;
    if (dy < 0) {
      dy = 8 + dy;
    }
    Canvas.imageRect(
      `./src/assets/character/${this.character}/${this.action}.png`,
      new Vector(
        Math.floor((FRAME / MAX_FRAME) * 4) *
          16,
        dy * SPRITE_SIZE
      ),
      SPRITE_SIZE,
      SPRITE_SIZE,
      this.position,
      this.width,
      this.height
    );
    this.darkenPlayer();
  }

  public move(angle: number) {
    this.angle = angle;
    const offset = new Vector(
      Math.cos(this.angle) * this.speed * DELTA,
      Math.sin(this.angle) * this.speed * DELTA
    );
    if (
      (offset.x > 0 && this.position.x + this.width < Canvas.canvas.width) ||
      (offset.x < 0 && this.position.x > 0)
    ) {
      this.position.x += offset.x;
    }

    if (
      (offset.y > 0 && this.position.y + this.height < Canvas.canvas.height) ||
      (offset.y < 0 && this.position.y > 0)
    ) {
      this.position.y += offset.y;
    }
    socket.emit("room", "move", {
      x: this.position.x,
      y: this.position.y,
      id: this.id,
    });
  }
  public changePosition(newPosition: Vector) {
    this.position = newPosition;
  }

  public darkenPlayer() {
    for (let i = 0; i < this.life; i++) {
      Canvas.ctx.fillStyle = `rgba(0, 0, 0, ${1 - i / 100})`;
    }
    Canvas.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  public checkCollision(character: Character, enemies: Character[]) {
    let possibleDirections: Map<string, boolean> = new Map([
      ["up", true],
      ["down", true],
      ["left", true],
      ["right", true],
    ]);
    for (const enemy of enemies) {
      if (
        this.position.x + this.width > enemy.position.x &&
        this.position.x < enemy.position.x + enemy.width
      ) {
        if (
          this.position.y + this.height > enemy.position.y &&
          this.position.y < enemy.position.y + enemy.height
        ) {
          if (this.position.x + this.width > enemy.position.x) {
            possibleDirections.set("right", false);
          }
          if (this.position.x < enemy.position.x + enemy.width) {
            possibleDirections.set("left", false);
          }
          if (this.position.y + this.height > enemy.position.y) {
            possibleDirections.set("down", false);
          }
          if (this.position.y < enemy.position.y + enemy.height) {
            possibleDirections.set("up", false);
          }
        }
      }
    }
    return possibleDirections;
  }
}


export { Character };

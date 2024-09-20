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
  protected character: keyof Asset["character"];
  protected action: keyof Asset["character"][keyof Asset["character"]];
  protected width: number =
    assets["character"]["placeholder"]["idle"]["width"] * 5;
  protected height: number =
    assets["character"]["placeholder"]["idle"]["height"] * 5;
  constructor(
    character: keyof Asset["character"],
    action: keyof Asset["character"][keyof Asset["character"]],
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
      new Vector(Math.floor((FRAME / MAX_FRAME) * 4) * 16, dy * SPRITE_SIZE),
      SPRITE_SIZE,
      SPRITE_SIZE,
      this.position,
      this.width,
      this.height
    );
    this.darkenPlayer();
  }

  public move(angle: number, enemies: Map<String, Character>) {
    let allowedDirections = this.checkCollision(
      this,
      Array.from(enemies.values() || [])
    );
    this.angle = angle;
    const offset = new Vector(
      Math.cos(this.angle) * this.speed * DELTA,
      Math.sin(this.angle) * this.speed * DELTA
    );
    if (offset.x > 0 && allowedDirections.get("right")) {
      if (this.position.x + this.width < Canvas.canvas.width) {
        this.position.x += offset.x;
      }
    } else if (offset.x < 0 && allowedDirections.get("left")) {
      if (this.position.x > 0) {
        this.position.x += offset.x;
      }
    }

    if (offset.y > 0 && allowedDirections.get("down")) {
      if (this.position.y + this.height < Canvas.canvas.height) {
        this.position.y += offset.y;
      }
    } else if (offset.y < 0 && allowedDirections.get("up")) {
      if (this.position.y > 0) {
        this.position.y += offset.y;
      }
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
    Canvas.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  public checkCollision(character: Character, enemies: Character[]) {
    let allowedDirections: Map<'up' | 'down' | 'left' | 'right', boolean> = new Map([
      ["up", true],
      ["down", true],
      ["left", true],
      ["right", true],
    ]);
    if (enemies.length === 0) return allowedDirections;
    for (const enemy of enemies) {
      // const distance = Math.sqrt(Math.pow(this.position.x - enemy.position.x, 2) + Math.pow(this.position.y - enemy.position.y, 2));
      // console.log(distance)
      const distance = new Vector(this.position.x - enemy.position.x, this.position.y - enemy.position.y);
      const isOverlapping = (axis: 'x' | 'y', playerPosition: Vector, enemyPosition: Vector) => {
        if(axis === 'x'){
          return Math.abs(playerPosition.x - enemyPosition.x) < this.width;
        }
        else{
        return Math.abs(playerPosition.y - enemyPosition.y) < this.height;
      }
      };
      if (isOverlapping('y', this.position, enemy.position)) {
        // LEFT
        if(this.position.x - (enemy.position.x + enemy.width) < 0 && this.position.x - (enemy.position.x + enemy.width) > -this.width) {
          allowedDirections.set('left', false);
        }
        // RIGHT
        if(this.position.x - enemy.position.x > -this.width && this.position.x - enemy.position.x < 0) {
          allowedDirections.set('right', false);
        }
      }
      if(isOverlapping('x', this.position, enemy.position)){
          // UP
          if(this.position.y <= (enemy.position.y + enemy.height) && this.position.y >= enemy.position.y) {
            allowedDirections.set('up', false);
          }
          // DOWN
          if(this.position.y + this.height > enemy.position.y && this.position.y < enemy.position.y + enemy.height) {
            allowedDirections.set('down', false);
          }
        }
      }
      // console.log(allowedDirections);
    return allowedDirections;
  }
}

export { Character };

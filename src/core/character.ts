import { DELTA, FRAME, MAX_FRAME, SPRITE_SIZE } from "..";
import { Asset, assets, random, socket } from "../lib/global";
import { Canvas } from "./canvas";
import Entity from "./entity";
import Vector from "./vector";
import Rect from "./rect";

class Character extends Entity {
  public speed: number;
  public angle: number = 0;
  public id: string;
  public life: number = 100;
  protected character: keyof Asset["character"];
  protected action: keyof Asset["character"][keyof Asset["character"]];
  constructor(
    character: keyof Asset["character"],
    action: keyof Asset["character"][keyof Asset["character"]],
    position: Vector = new Vector(0, 0),
    speed: number = 3,
    life: number = 100
  ) {
    super(
      position,
      `./src/assets/character/${character}/${action}.png`,
      assets["character"]["placeholder"]["idle"]["width"] * 5,
      assets["character"]["placeholder"]["idle"]["height"] * 5
    );
    this.life = life;
    this.action = action;
    this.id = random(10);
    this.character = character;
    this.speed = speed;
  }

  public draw() {
    let dy = ((this.angle - Math.PI / 2) / Math.PI) * 4;
    if (dy < 0) {
      dy = 8 + dy;
    }
    Canvas.imageRect(
      this.image,
      new Rect(
        new Vector(Math.floor((FRAME / MAX_FRAME) * 4) * 16, dy * SPRITE_SIZE),
        SPRITE_SIZE,
        SPRITE_SIZE
      ),
      this.rect
    );
  }

  public move(angle: number, enemies: Map<String, Character>) {
    let allowedDirections = this.checkCollision(Array.from(enemies.values()));
    this.angle = angle;
    const offset = new Vector(
      Math.cos(this.angle) * this.speed * DELTA,
      Math.sin(this.angle) * this.speed * DELTA
    );
    if (offset.x > 0 && allowedDirections.get("right")) {
      if (this.rect.position.x + this.rect.width < Canvas.canvas.width) {
        this.rect.position.x += offset.x;
      }
    } else if (offset.x < 0 && allowedDirections.get("left")) {
      if (this.rect.position.x > 0) {
        this.rect.position.x += offset.x;
      }
    }

    if (offset.y > 0 && allowedDirections.get("down")) {
      if (this.rect.position.y + this.rect.height < Canvas.canvas.height) {
        this.rect.position.y += offset.y;
      }
    } else if (offset.y < 0 && allowedDirections.get("up")) {
      if (this.rect.position.y > 0) {
        this.rect.position.y += offset.y;
      }
    }

    socket.emit("room", "move", {
      x: this.rect.position.x,
      y: this.rect.position.y,
      id: this.id,
    });
  }

  public changePosition(newPosition: Vector) {
    this.rect.position = newPosition;
  }

  public darkenPlayer() {
    for (let i = 0; i < this.life; i++) {
      Canvas.ctx.fillStyle = `rgba(0, 0, 0, ${1 - i / 100})`;
    }
    Canvas.fillRect(this.rect);
  }

  public checkCollision(entities: Entity[]) {
    const allowedDirections = new Map([
      ["up", true],
      ["down", true],
      ["left", true],
      ["right", true],
    ]);
    for (const entity of entities) {
      const allowedForEntity = this.collide(entity);
      allowedDirections.set(
        "up",
        allowedDirections.get("up") && allowedForEntity.get("up")
      );
      allowedDirections.set(
        "down",
        allowedDirections.get("down") && allowedForEntity.get("down")
      );
      allowedDirections.set(
        "left",
        allowedDirections.get("left") && allowedForEntity.get("left")
      );
      allowedDirections.set(
        "right",
        allowedDirections.get("right") && allowedForEntity.get("right")
      );
    }
    return allowedDirections;
  }
}

export { Character };

import Vector from "../core/vector";
import { Asset } from "../lib/global";
import { Character } from "./character";

class Enemy extends Character {

  constructor(sprite: keyof Asset["character"], action: keyof Asset["character"][keyof Asset["character"]], position: Vector = new Vector(0, 0), angle: number = 0,  life: number = 100) {
    super(sprite, action, position, life);
    this.angle = angle;
  }

  public draw() {
    super.draw();
    this.darkenPlayer();
  }
}

export default Enemy

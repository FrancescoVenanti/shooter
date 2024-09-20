import Entity from "../core/entity";
import Vector from "../core/vector";

class Attack extends Entity {
  public damage: number;
  public range: number;
  public speed: number;
  constructor(position: Vector, image: string, width: number, height: number) {
    super(position, image, width, height);
  }
}

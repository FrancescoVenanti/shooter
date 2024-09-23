import Vector from "./vector";

class Rect {
  public position: Vector;
  public width: number;
  public height: number;
  constructor(position: Vector, width: number, height: number) {
    this.position = position;
    this.width = width;
    this.height = height;
  }

  public clone(): Rect {
    return new Rect(
      new Vector(this.position.x, this.position.y),
      this.width,
      this.height
    );
  }
}

export default Rect;

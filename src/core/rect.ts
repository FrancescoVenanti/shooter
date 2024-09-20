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
}

export default Rect;

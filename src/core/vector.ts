class Vector {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public add(v: Vector) {
    this.x += v.x;
    this.y += v.y;
  }

  public sub(v: Vector) {
    this.x -= v.x;
    this.y -= v.y;
  }

  public mul(v: Vector) {
    this.x *= v.x;
    this.y *= v.y;
  }

  public div(v: Vector) {
    this.x /= v.x;
    this.y /= v.y;
  }

  public dot(v: Vector) {
    return this.x * v.x + this.y * v.y;
  }

  public length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public normalize() {
    const length = this.length();
    if (length > 0) {
      this.x /= length;
      this.y /= length;
    }
  }

  public clone() {
    return new Vector(this.x, this.y);
  }

  public equals(v: Vector) {
    return this.x === v.x && this.y === v.y;
  }

  public toString() {
    return `(${this.x}, ${this.y})`;
  }

  public angle(vector: Vector) {
    return Math.atan2(vector.y - this.y, vector.x - this.x);
  }

  public static add(v1: Vector, v2: Vector) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  }
}

export default Vector;

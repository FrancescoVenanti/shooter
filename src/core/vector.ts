class Vector {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public add(v: Vector): Vector {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  public sub(v: Vector): Vector {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  public mul(v: Vector): Vector {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }

  public div(v: Vector): Vector {
    this.x /= v.x;
    this.y /= v.y;
    return this;
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

  public distance(v: Vector) {
    return Math.sqrt((v.x - this.x) ** 2 + (v.y - this.y) ** 2);
  }
}

export default Vector;

import { inBetween } from "../lib/global";
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

  public getCenter(): Vector {
    return new Vector(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );
  }

  public collide(rect: Rect): boolean {
    return (
      this.position.x < rect.position.x + rect.width &&
      this.position.x + this.width > rect.position.x &&
      this.position.y < rect.position.y + rect.height &&
      this.position.y + this.height > rect.position.y
    );
  }

  public getClosestPoint(r: Rect): Vector {
    const center = this.getCenter();
    if (inBetween(center.x, r.position.x, r.position.x + r.width)) {
      return new Vector(center.x, r.position.y);
    }
    if (inBetween(center.y, r.position.y, r.position.y + r.height)) {
      return new Vector(r.position.x, center.y);
    }
    const closestX = Math.min(
      this.position.distance(r.position),
      this.position.distance(new Vector(r.position.x + r.width, r.position.y))
    );

    const closestY = Math.min(
      this.position.distance(r.position),
      this.position.distance(new Vector(r.position.x, r.position.y + r.height))
    );

    return new Vector(closestX, closestY);
  }

  public getDistance(rect: Rect): [number, number] {
    const center = this.getCenter();
    const closestPoint = this.getClosestPoint(rect);
    const distance = closestPoint.distance(center);
    const angle = center.angle(closestPoint);
    return [angle, distance];
  }
}

export default Rect;

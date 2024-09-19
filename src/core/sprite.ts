import Vector from "./vector";

abstract class Sprite {
  public image: HTMLImageElement;
  public width: number;
  public height: number;
  public position: Vector;

  constructor(
    image: HTMLImageElement,
    position: Vector,
    width: number,
    height: number){
      this.image = image;
      this.position = position;
      this.width = width;
      this.height = height;
    }
}

export { Sprite };

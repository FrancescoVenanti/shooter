import { Asset } from "../lib/global";
import { Canvas } from "./canvas";
import Vector from "./vector";

abstract class Sprite<T extends keyof Asset> {
  protected image: string;
  public width: number;
  public height: number;
  public position: Vector;
  public widthImage: number;
  public heightImage: number;
  public positionImage: Vector;
  constructor(
    image: string,
    position: Vector,
    width: number,
    height: number,
    positionImage: Vector = new Vector(0, 0),
    widthImage: number = width,
    heightImage: number = height){
      this.image = image;
      this.position = position;
      this.width = width;
      this.height = height;
      this.positionImage = positionImage;
      this.widthImage = widthImage;
      this.heightImage = heightImage;
    }

  public draw(): void {
    Canvas.imageRect(this.image, this.position, this.width, this.height, this.positionImage, this.widthImage, this.heightImage);
  }
}

export { Sprite };

/* || */
import { GLOBAL } from "../lib/global";
import Rect from "./rect";
import Vector from "./vector";

interface CanvasLinesProps {
  start?: Vector;
  end: Vector;
}

export class Canvas {
  public static canvas: HTMLCanvasElement;
  public static ctx: CanvasRenderingContext2D;

  static init(): void {
    const canvas = document.createElement("canvas");
    const container = document.getElementById("container");
    container?.appendChild(canvas);
    Canvas.canvas = canvas;
    Canvas.ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.ctx.imageSmoothingEnabled = true;
  }

  static line(
    color?: string,
    width?: number,
    ...properties: CanvasLinesProps[]
  ): void {
    let nextStart: Vector = new Vector(0, 0);
    properties.forEach(({ start, end }) => {
      Canvas.ctx.beginPath();
      Canvas.ctx.moveTo(
        start ? start : nextStart[0],
        start ? start[1] : nextStart[1]
      );
      Canvas.ctx.lineTo(end[0], end[1]);
      nextStart = end.clone();
      Canvas.ctx.strokeStyle = color ?? "black";
      Canvas.ctx.lineWidth = width ?? 1;
      Canvas.ctx.stroke();
    });
  }
  static circle({ x, y }: Vector, r: number): void {
    Canvas.ctx.beginPath();
    Canvas.ctx.arc(x, y, r, 0, 2 * Math.PI);
    Canvas.ctx.stroke();
  }
  static rect({ position: { x, y }, width: w, height: h }: Rect): void {
    // Canvas.ctx.beginPath();
    Canvas.ctx.rect(x, y, w || this.canvas.width, h || this.canvas.height);
    // Canvas.ctx.stroke();
  }
  static fillRect({ position: { x, y }, width: w, height: h }: Rect): void {
    // Canvas.ctx.beginPath();
    Canvas.ctx.fillRect(x, y, w || this.canvas.width, h || this.canvas.height);
    // Canvas.ctx.stroke();
  }
  static text(text: string, { x, y }: Vector): void {
    Canvas.ctx.font = "30px Arial";
    Canvas.ctx.fillText(text, x, y);
  }
  static image(
    image: string,
    { position: { x, y }, width: w, height: h }: Rect
  ): void {
    let currentImage: HTMLImageElement | undefined = undefined;
    const imagePath = image.split("/").slice(-2).join("/");
    if (GLOBAL("CACHED_IMAGE").has(imagePath)) {
      currentImage = GLOBAL("CACHED_IMAGE").get(imagePath)!;
    }
    if (w && h) Canvas.ctx.drawImage(currentImage, x, y, w, h);
    else Canvas.ctx.drawImage(currentImage, x, y, 100, 100);
  }
  static imageRect(
    image: string,
    { position: { x: sx, y: sy }, width: sw, height: sh }: Rect,
    { position: { x: dx, y: dy }, width: dw, height: dh }: Rect
  ) {
    let currentImage: HTMLImageElement | undefined = undefined;
    const imagePath = image.split("/").slice(-2).join("/");
    if (GLOBAL("CACHED_IMAGE").has(imagePath)) {
      currentImage = GLOBAL("CACHED_IMAGE").get(imagePath)!;
    }
    Canvas.ctx.drawImage(currentImage, sx, sy, sw, sh, dx, dy, dw, dh);
  }
  static clear(
    { x, y }: Vector = new Vector(0, 0),
    w: number = Canvas.canvas.width,
    h: number = Canvas.canvas.height
  ): void {
    setTimeout(() => {
      Canvas.ctx.clearRect(x, y, w, h);
    }, 1);
  }
}

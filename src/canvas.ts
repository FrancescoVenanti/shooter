import { TupleType } from "typescript";

/* || */

interface CanvasLinesProps {
  point1?: [number, number];
  point2: [number, number];
  color?: string;
  width?: number;
}

export class Canvas {
  private static canvas: HTMLCanvasElement;
  private static ctx: CanvasRenderingContext2D;

  static init(canvas: HTMLCanvasElement): void {
    Canvas.canvas = canvas;
    Canvas.ctx = canvas.getContext("2d")!;
  }

  static line(...properties: CanvasLinesProps[]) {
    let nextStart: [number, number] = [0, 0];
    properties.forEach(({ point1, point2, color, width }) => {
      Canvas.ctx.beginPath();
      Canvas.ctx.moveTo(
        point1 ? point1[0] : nextStart[0],
        point1 ? point1[1] : nextStart[1]
      );
      Canvas.ctx.lineTo(point2[0], point2[1]);
      nextStart = point2;
      Canvas.ctx.strokeStyle = color ?? "black";
      Canvas.ctx.lineWidth = width ?? 1;
      Canvas.ctx.stroke();
    });
  }
  static circle(x: number, y: number, r: number): void {
    Canvas.ctx.beginPath();
    Canvas.ctx.arc(x, y, r, 0, 2 * Math.PI);
    Canvas.ctx.stroke();
  }
  static rect(side1: number, side2: number, x: number, y: number): void {
    Canvas.ctx.beginPath();
    Canvas.ctx.rect(x, y, side1, side2);
    Canvas.ctx.stroke();
  }
  static text(text: string, x: number, y: number): void {
    Canvas.ctx.font = "30px Arial";
    Canvas.ctx.fillText(text, x, y);
  }
  static image(image: File, x: number, y: number): void {
    const img = new Image();
    img.src = URL.createObjectURL(image);
    img.onload = () => {
      Canvas.ctx.drawImage(img, x, y);
    };
  }
  static clear(): void {}
}

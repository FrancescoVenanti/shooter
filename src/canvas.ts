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
  static circle(): void {}
  static rect(): void {}
  static text(): void {}
  static image(): void {}
  static clear(): void {}
}

class Canvas {
  private static canvas: HTMLCanvasElement;
  private static ctx: CanvasRenderingContext2D;

  static init(canvas: HTMLCanvasElement): void {
    Canvas.canvas = canvas;
    Canvas.ctx = canvas.getContext("2d")!;
  }

  static line(n1: number, n2: number): void {
    Canvas.ctx.beginPath();
    Canvas.ctx.moveTo(0, 0);
    Canvas.ctx.lineTo(n1, n2);
    Canvas.ctx.stroke();
  }
  static circle(): void {}
  static rect(): void {}
  static text(): void {}
  static image(): void {}
  static clear(): void {}
}

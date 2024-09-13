class Canvas{

  private static canvas: HTMLCanvasElement;
  private static ctx: CanvasRenderingContext2D;

  static init(canvas: HTMLCanvasElement): void{
    Canvas.canvas = canvas;
    Canvas.ctx = canvas.getContext('2d')!;
  }

  static line(): void {

  }
  static circle(): void {

  }
  static rect():void{
  }
  static text(): void{

  }
  static image():void {

  }
  static clear():void {

  }

}

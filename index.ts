(() => {
  const container = document.getElementById("container");
  const canvas = document.createElement("canvas");
  container?.appendChild(canvas);
  Canvas.init(canvas);
  Canvas.line(100, 100);
})();

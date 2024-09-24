// src/workers/shotWorker.ts
self.onmessage = (event) => {
  console.log('event.data');
  const { startX, startY, speed, angle, range } = event.data;
  let x = startX;
  let y = startY;
  const dx = Math.cos(angle) * speed;
  const dy = Math.sin(angle) * speed;
  let distanceTraveled = 0;

  while (distanceTraveled < range) {
    x += dx;
    y += dy;
    distanceTraveled += speed;
  }

  self.postMessage({ x, y });
};

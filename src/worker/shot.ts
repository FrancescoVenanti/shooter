self.onmessage = (e) => {
  const { startX, startY, speed, angle, range } = e.data;

  // Example logic for moving a shot
  let x = startX;
  let y = startY;
  const dx = Math.cos(angle) * speed;
  const dy = Math.sin(angle) * speed;
  let distanceTraveled = 0;

  // Simulate the shot movement
  while (distanceTraveled < range) {
    x += dx;
    y += dy;
    distanceTraveled += speed;

    // Simulate heavy computation for shot movement
    // or any game logic here
  }

  // Send the result back to the main thread
  self.postMessage({ x, y });
};

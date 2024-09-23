import { parentPort } from "worker_threads";
import Rect from "../core/rect";
import Vector from "../core/vector";

interface ShotData {
  startX: number;
  startY: number;
  speed: number;
  angle: number;
  range: number;
}

parentPort?.on("message", (data: ShotData) => {
  const result = calculateShot(data);
  parentPort?.postMessage(result);
});

function calculateShot(data: ShotData) {
  const { startX, startY, speed, angle, range } = data;

  const offsetX = Math.cos(angle) * speed;
  const offsetY = Math.sin(angle) * speed;

  const endX = startX + offsetX * range;
  const endY = startY + offsetY * range;

  // Simple linear movement calculation, more complex logic can be added
  return {
    endX,
    endY,
    hit: checkCollision(endX, endY), // Simulate some collision detection
  };
}

function checkCollision(x: number, y: number): boolean {
  // This function should check whether the shot hit an enemy or obstacle
  // For now, we'll just return `false` as an example
  return false;
}

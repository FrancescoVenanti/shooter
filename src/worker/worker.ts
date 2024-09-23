// worker.ts
self.onmessage = (e) => {
  const { data } = e;
  // Perform some heavy computation or task
  const result = data * 2; // Just an example task
  self.postMessage(result); // Send result back to the main thread
};

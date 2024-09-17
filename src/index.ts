import { Canvas } from "./core/canvas";
// import { socket } from "./lib/socket";

// socket.emit('chat', 'send', 'ljfndlkfjndfgb');

(function main(){
  Canvas.init()
  loop(0)
})()

function loop(delay: number) {
  requestAnimationFrame(loop);
}

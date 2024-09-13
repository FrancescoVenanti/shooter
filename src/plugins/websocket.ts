import { Server } from "socket.io";

function socketIOPlugin() {
  let io: Server;

  return {
    name: 'socket-io-server',
    buildStart() {
      // Create the HTTP server and Socket.IO server
      const httpServer = require('http').createServer();
      io = new Server(httpServer, { cors: { origin: '*' } });

      io.on('connection', (socket) => {
        console.log('A client connected');

        socket.on('message', (msg) => {
          console.log('Message from client: ', msg);
          socket.emit('message', `Echo from server: ${msg}`);
        });

        socket.on('disconnect', () => {
          console.log('Client disconnected');
        });
      });

      httpServer.listen(8080, () => {
        console.log('Socket.IO server is running on http://localhost:8080');
      });
    },
    closeBundle() {
      // Close the Socket.IO server when the build process is done
      io.close();
      console.log('Socket.IO server closed');
    }
  };
}

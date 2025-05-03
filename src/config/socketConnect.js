import { Server as SocketServer } from 'socket.io';
import app from '../app.js';

export const socketConnect = (server) => {
  const io = new SocketServer(server, {
    connectionStateRecovery: {
      maxDisconnectionDuration: 2 * 60 * 1000,
      skipMiddlewares: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  });

  app.set('io', io);

  io.on('connection', (socket) => {
    console.log(`socket connected ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`socket disconnected ${socket.id}`);
    });
  });
};

import { io } from 'socket.io-client';

const socket = io(`http://localhost:5400`, {
  reconnectionAttempts: 5,
  reconnectionDelay: 10000,
});

socket.on('connect', () => {
  console.log(`Connected to server socket ${socket.id}`);
});

socket.on('disconnect', () => {
  console.log(`Disconnected from server`);
});

socket.on('reconnect_attempt', () => {
  console.log(`Trying to reconnect... ${socket.id}`);
});

socket.on('taskCreated', (task) => {
  console.log(`New task received`, task);
});

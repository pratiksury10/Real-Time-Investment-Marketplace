const socketIo = require('socket.io');

module.exports = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
};

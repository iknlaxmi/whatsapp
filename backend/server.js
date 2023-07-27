const http = require('http');
const { Server } = require('socket.io');

const httpServer = http.createServer();

const PORT = 8080,
  HOST = 'localhost';
const clients = {};
const io = new Server(httpServer, {
  cors: {
    origin: '*', // or a list of origins you want to allow, e.g. ["http://localhost:3000"]
    credentials: true,
  },
});

io.on('connection', (socket) => {
  clients[socket.id] = socket;
  console.log(socket.id);
  // console.log(clients);
  socket.on('message', (data) => {
    console.log(`Received message: ${data}`);
    // socket.emit('message', message);

    console.log(clients);
    console.log(data);
    const { to, message } = data;
    const receiver = clients[to];
    if (receiver) {
      receiver.emit('message', { from: socket.id, message });
    } else {
      console.log('User is not connected');
    }
  });
});

httpServer.listen(PORT, HOST, () => {
  console.log('Server running on port:', PORT);
});

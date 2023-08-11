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
  // Extract session ID from the request's query parameters
  console.log(socket.handshake.query.session_id);
  // const url = new URL(req.url, 'http://localhost');

  const sessionId = socket.handshake.query.session_id;
  if (!sessionId) {
    io.close(4000, 'Session Id not provided');
    return;
  }

  clients[sessionId] = socket;
  // console.log(sessionId);
  // console.log(clients);
  socket.on('message', (data) => {
    console.log(`Received message: ${data}`);
    // socket.emit('message', message);

    // console.log(clients);
    console.log(data);
    const { to, message } = data;

    console.log(to);
    const receiver = clients[to];
    console.log(receiver);
    if (receiver) {
      receiver.emit('message', {
        from: socket.handshake.query.session_id,
        message,
      });
    } else {
      console.log('User is not connected');
    }
  });
});

httpServer.listen(PORT, HOST, () => {
  console.log('Server running on port:', PORT);
});

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const morgan = require('morgan');

const { ExpressPeerServer } = require('peer');

const app = express();
const server = http.createServer(app);

app.use(express.json());

const customGenerator = () =>
  (Math.random().toString(36) + '00000000000000000').substring(2, 16);

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/',
  generateClientId: customGenerator,
});

app.use('/peer', peerServer);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Listening on port ${port}`));

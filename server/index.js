const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);

const io = socketio(server);

const messages = [];

io.on('connection', socket => {
  socket.on('new_message', message => {
    messages.unshift(message);

    socket.broadcast.emit('new_message', message);
  });
});

app.use(express.static(`${__dirname}/../app`));
app.use('/modules', express.static(`${__dirname}/../node_modules`));

server.listen(8000, () => console.log('Photo Message running on http://localhost:8000'));

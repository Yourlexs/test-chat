import http  from 'http'
import express from 'express'
import { Server } from 'socket.io'
const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

import formatMessage  from './handlers/messageHandlers.js'
import {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} from './handlers/userHandlers.js'

const botName = 'Chat Bot';

io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    console.log('connect')

    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    socket.emit('message', formatMessage(botName, 'Welcome to Chat!'));

    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  socket.on('getMessages', () => {
    io.to(socket.id).emit('messages')
  })
  socket.on('disconnect', () => {
    console.log('disconect')
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
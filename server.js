import http  from 'http'
import express from 'express'
import { Server } from 'socket.io'
import moment from 'moment'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});
// import {formatMessage} from './utils/messages'
// import {
//   userJoin,
//   getCurrentUser,
//   userLeave,
//   getRoomUsers
// } from './utils/users'

const botName = 'Chat Bot';

//

let users = [];

function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}

function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

//
function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}
//

io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
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

  socket.on('disconnect', () => {
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
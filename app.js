const express = require('express');
const socketio = require('socket.io');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index')
})

const PORT = process.env.PORT || 3000;
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`server is running on port ${PORT}`);
});

// initializing socket.io from the express server connection and then we set up an event
// using io.on() which will be triggered every time a new connection to the socket gets established.
const io = socketio(server)

io.on('connection', socket => {
  console.log("New user connected")

  socket.username = "Anonymous";

  socket.on('change_username', data => {
    socket.username = data.username;
  })

  // handles new message sent and it emits a receive_message event
  // to the connected clients with data about the new message
  socket.on('new_message', data => {
    console.log("new message");
    io.sockets.emit('receive_message', {message: data.message, username: socket.username})
  })

  // handles the 'is typing' functionality
  // When we use broadcast, every user except the one who is typing
  // the message receives the typing event from the server
  socket.on('typing', data => {
    socket.broadcast.emit('typing', {username: socket.username})
  })

});

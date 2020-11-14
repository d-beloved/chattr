const express = require('express');
const socketio = require('socket.io');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index')
})

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`server is running on port ${PORT}`);
});

// initializing socket.io from the express server connection and then we set up an event
// using io.on() which will be triggered every time a new connection to the socket gets established.
const io = socketio(server)

io.on('connection', socket => {
  console.log("New user connected")
});

(function connect(){
  let socket = io.connect('http://localhost:3000')

  // changes username of the user
  let username = document.querySelector('#username')
  let usernameBtn = document.querySelector('#usernameBtn')
  let currentUsername = document.querySelector('.card-header')

  usernameBtn.addEventListener('click', e => {
    console.log(username.value);
    socket.emit('change_username', {username: username.value})
    currentUsername.textContent = username.value;
    username.value = ''
  })

  // sends a new message to other users connected to the server
  let message = document.querySelector('#message')
  let messageBtn = document.querySelector('#messageBtn')
  let messageList = document.querySelector('#message-list')

  messageBtn.addEventListener('click', e => {
    console.log(message.value);
    socket.emit('new_message', {message: message.value})
    message.value = ''
  })

  // receives messages from other users
  socket.on('receive_message', data => {
    console.log(data);
    let listItem = document.createElement('li')
    listItem.textContent = data.username + ': ' + data.message;
    listItem.classList.add('list-group-item');
    messageList.appendChild(listItem);
  })

})()

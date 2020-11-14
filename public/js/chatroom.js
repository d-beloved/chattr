(function connect(){
  let socket = io.connect('http://localhost:3000')

  let username = document.querySelector('#username')
  let usernameBtn = document.querySelector('#usernameBtn')
  let currentUsername = document.querySelector('.card-header')

  usernameBtn.addEventListener('click', e => {
    console.log(username.value);
    socket.emit('change_username', {username: username.value})
    currentUsername.textContent = username.value;
    username.value = ''
  })
})()

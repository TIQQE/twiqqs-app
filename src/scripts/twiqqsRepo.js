export const getTwiqqs = async () => {
  const response = await fetch(
    `https://pbkh6aqm1e.execute-api.eu-west-1.amazonaws.com/test/twiqqs/${location.hash.substring(1)}`, {
      headers: {
        'authorization': JSON.parse(localStorage.getItem('jwt')).id_token
      }
    })
  const data = await response.json()
  return data
}

export const getTopics = async () => {
  const response = await fetch('https://pbkh6aqm1e.execute-api.eu-west-1.amazonaws.com/test/topics', {
    headers: {
      'authorization': JSON.parse(localStorage.getItem('jwt')).id_token
    }
  })
  const data = await response.json()
  return data
}

export const createWebSocketConnection = () => {
  let jwt = JSON.parse(localStorage.getItem('jwt'));
  if (!jwt || !jwt.access_token) { return }

  // Create WebSocket connection.
  const socket = new WebSocket(`wss://us9g1zlouc.execute-api.eu-west-1.amazonaws.com/test?access_token=${jwt.access_token}`);

  // Connection opened
  socket.addEventListener('open', (event) => {
    console.log('Open!')
  });

  document.addEventListener("sendMessage", (e) => {
    socket.send(`{"topic":"${location.hash.substring(1).trim()}", "message": "${e.detail}"}`)
  });

  // Error
  socket.addEventListener('error', (event) => {
    localStorage.removeItem('jwt')
    document.querySelector('tq-login').render()
  });

  // Listen for messages
  socket.addEventListener('message', (event) => {
    console.log('Message from server ', event.data);
    let messageList = document.querySelector('tq-message-list');
    if (!Array.isArray(messageList.data)) { messageList.data = []; }
    let clone = JSON.parse(JSON.stringify(messageList.data))

    // Todo validate that it is a message
    let message = JSON.parse(event.data);
    clone.push(message);

    messageList.data = clone;
  });
}

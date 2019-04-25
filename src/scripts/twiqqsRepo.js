export const getTwiqqs = async () => {
  const response = await fetch('https://pbkh6aqm1e.execute-api.eu-west-1.amazonaws.com/test/twiqqs/something')
  const data = await response.json()
  return data
}

export const getTopics = async () => {
  const response = await fetch('https://pbkh6aqm1e.execute-api.eu-west-1.amazonaws.com/test/topics')
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
    socket.send(`{"action":"Parse me.", "message": "Just do it!"}`);
  });

  // Listen for messages
  socket.addEventListener('message', (event) => {
    console.log('Message from server ', event.data);
  });
}

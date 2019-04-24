export const getTwiqqs = async () => {
  const response = await fetch('https://3882ls4880.execute-api.eu-west-1.amazonaws.com/test/twiqqs/something')
  const data = await response.json()
  return data
}

export const getTopics = async () => {
  const response = await fetch('https://3882ls4880.execute-api.eu-west-1.amazonaws.com/test/topics')
  const data = await response.json()
  return data
}

export const createWebSocketConnection = () => {
  // Create WebSocket connection.
  const socket = new WebSocket('ws://localhost:8080');

  // Connection opened
  socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
  });

  // Listen for messages
  socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
  });
}

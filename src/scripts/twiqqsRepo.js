import { env } from './env.js'
import { displayNotification } from './serviceWorkerHelper.js'

export const updateLoginStatus = () => {
  localStorage.removeItem('jwt')
  document.querySelector('tq-login').render()
}

export const getJwt = () => {
  const jwt = JSON.parse(localStorage.getItem('jwt'))
  return jwt
}

export const getIdToken = () => {
  const jwt = getJwt()
  if (jwt) {
    return jwt.id_token
  } else {
    return null
  }
}

export const getAccessToken = () => {
  const jwt = getJwt()
  if (jwt) {
    return jwt.access_token
  } else {
    return null
  }
}

export const getTwiqqs = async () => {
  let idToken = getIdToken()
  if (!idToken) { return Promise.reject(401) }
  const response = await fetch(
    `${env.twiqqsApi}/twiqqs/${location.hash.substring(1)}`, {
      headers: {
        'authorization': idToken
      }
    })
  const data = await response.json()
  return data
}

export const getTopics = async () => {
  let idToken = getIdToken()
  if (!idToken) { return Promise.reject(401) }
  const response = await fetch(`${env.twiqqsApi}/topics`, {
    headers: {
      'authorization': idToken
    }
  })
  const data = await response.json()
  return data
}

export const getUsers = async () => {
  let idToken = getIdToken()
  if (!idToken) { return Promise.reject(401) }
  const response = await fetch(`${env.twiqqsApi}/connections`, {
    headers: {
      'authorization': idToken
    }
  })
  const data = await response.json()
  return data
}

const showNewMessageNotification = (message) => {
  try {
    let tokenInfo = JSON.parse(atob(getAccessToken().split('.')[1]))
    //if (message.messageId.indexOf(tokenInfo.email) !== -1) { return }
    displayNotification(`New message in ${message.topic}`, {
      body: message.message,
      icon: 'images/icons/icon-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: new Date(message.messageId.split('#')[0]),
        message
      }
    });
  } catch (ex) {
    console.log(ex)
  }
}

export const createWebSocketConnection = () => {
  let accessToken = getAccessToken()
  if (!accessToken) { return }

  // Create WebSocket connection.
  const socket = new WebSocket(`${env.webSockets}?access_token=${accessToken}`);

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
    let data = event.data;
    console.log('Message from server ', data);
    let messageList = document.querySelector('tq-message-list');
    if (!Array.isArray(messageList.data)) { messageList.data = []; }
    let clone = JSON.parse(JSON.stringify(messageList.data))

    // Todo validate that it is a message
    let message = JSON.parse(data);
    showNewMessageNotification(message);
    clone.push(message);

    messageList.data = clone;
  });
}
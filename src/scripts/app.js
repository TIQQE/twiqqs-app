import { } from '../components/tq-navigation.js';
import { } from '../components/tq-message-list.js';
import { getTopics, getTwiqqs } from './twiqqsRepo.js';
import { displayNotification, registerServiceWorker, initPush } from './serviceWorkerHelper.js';

let hash = window.location.hash;
if (hash.indexOf('access_token') !== -1) {
  debugger;
  let parts = location.hash.substring(1).split('&')
  let id_token = parts[0].split('=')[1]
  let access_token = parts[1].split('=')[1]
  let expires_in = parts[2].split('=')[1]
  let token_type = parts[3].split('=')[1]
  let jwt = { id_token, access_token, expires_in, token_type }

  localStorage.setItem('jwt', JSON.stringify(jwt))
  location.hash = 'random'
} else {
  console.log(JSON.parse(localStorage.getItem('jwt')))
}

registerServiceWorker()
  .then(async () => {
    let sub = await initPush();
    displayNotification('My Title', {
      body: 'Here is a notification body!',
      icon: 'images/icons/icon-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'explore', title: 'Explore this new world',
          icon: 'images/icons/icon-72x72.png'
        },
        {
          action: 'close', title: 'Close notification',
          icon: 'images/icons/icon-72x72.png'
        },
      ]
    });
  });

getTwiqqs()
  .then(data => document.querySelector('tq-message-list').data = data);

getTopics()
  .then(data => document.querySelector('tq-nav').data = data);
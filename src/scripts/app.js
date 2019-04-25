import { } from '../components/tq-navigation.js';
import { } from '../components/tq-message-list.js';
import { } from '../components/tq-login.js';
import { } from '../components/tq-send.js';
import { getTopics, getTwiqqs, createWebSocketConnection } from './twiqqsRepo.js';
import { displayNotification, registerServiceWorker, initPush } from './serviceWorkerHelper.js';

registerServiceWorker()
  .then(async () => {
    let sub = await initPush();
    // displayNotification('My Title', {
    //   body: 'Here is a notification body!',
    //   icon: 'images/icons/icon-192x192.png',
    //   vibrate: [100, 50, 100],
    //   data: {
    //     dateOfArrival: Date.now(),
    //     primaryKey: 1
    //   },
    //   actions: [
    //     {
    //       action: 'explore', title: 'Explore this new world',
    //       icon: 'images/icons/icon-72x72.png'
    //     },
    //     {
    //       action: 'close', title: 'Close notification',
    //       icon: 'images/icons/icon-72x72.png'
    //     },
    //   ]
    // });
  });

createWebSocketConnection();

getTopics()
  .then(data => document.querySelector('tq-nav').data = data);
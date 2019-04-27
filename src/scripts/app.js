import { } from '../components/tq-topbar.js';
import { } from '../components/tq-navigation.js';
import { } from '../components/tq-message-list.js';
import { } from '../components/tq-send.js';
import { } from '../components/tq-modal.js';
import { createWebSocketConnection } from './twiqqsRepo.js';
import { displayNotification, registerServiceWorker, initPush } from './serviceWorkerHelper.js';

let classNames = [];
if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) classNames.push('ios');
if (navigator.userAgent.match(/android/i)) classNames.push('android');

let html = document.getElementsByTagName('html')[0];

if (classNames.length) classNames.push('on-device');
if (html.classList) html.classList.add.apply(html.classList, classNames);

/* Update viewport height - mostly hack for mobile phones that doesn't respect the 100vh in a good way.  */
const contentContainer = document.getElementById('content-container')
const updateHeight = () => {
  contentContainer.style.height = `${window.innerHeight}px`
}
updateHeight()
window.addEventListener('resize', updateHeight)

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
import { } from '../components/tq-navigation.js';
import { } from '../components/tq-message-list.js';
import { getTopics, getTwiqqs } from './twiqqsRepo.js';

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('./service-worker.js');
    console.log('Service Worker Registered');
  }
}
registerServiceWorker();

getTwiqqs()
  .then(data => document.querySelector('tq-message-list').data = data);

getTopics()
  .then(data => document.querySelector('tq-nav').data = data);
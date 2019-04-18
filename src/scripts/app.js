import { } from '../components/tq-modal.js';
import { } from '../components/tq-navigation.js';

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('./service-worker.js');
    console.log('Service Worker Registered');
  }
}
registerServiceWorker();

const getTwiqqs = async () => {
  const response = await fetch('https://3882ls4880.execute-api.eu-west-1.amazonaws.com/test/twiqqs/something');
  const data = await response.json();
  return data;
}

const getTopics = async () => {
  // const response = await fetch('https://3882ls4880.execute-api.eu-west-1.amazonaws.com/test/topics');
  // const data = await response.json();
  // return data;
  return await Promise.resolve([{ name: 'Serverless' }, { name: 'General' }]);
}

getTwiqqs()
  .then(data => console.log(data));

getTopics()
  .then(items => {
    let tqNav = document.querySelector('tq-nav');
    tqNav.updateUi(items, tqNav);
  });
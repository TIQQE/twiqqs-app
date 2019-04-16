'use strict';

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('./service-worker.js');
    console.log('Service Worker Registered');
  }
}
registerServiceWorker();

const getTwiqqs = async () => {
  const response = await fetch('https://3882ls4880.execute-api.eu-west-1.amazonaws.com/test/twiqqs/something');
  const json = await JSON.stringify(response.json());
  console.log(json);
}

getTwiqqs();
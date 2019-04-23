let swReg = null;

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    return await navigator.serviceWorker.register('./sw.js')
      .then(reg => { swReg = reg; });
  }
}

export const displayNotification = (title, options) => {
  if (Notification.permission == 'granted') {
    swReg.showNotification(title, options);
  }
}

export const initPush = async () => {
  if (!swReg) { throw new Error('Service worker is not registered!') };
  const sub = await swReg.pushManager.getSubscription();
  if (sub === null) {
    // Update UI to ask user to register for Push
    console.log('Not subscribed to push service!');
    return await subscribePush();
  } else {
    // We have a subscription, update the database
    console.log('Subscription object: ', sub);
    return sub;
  }
};

export const subscribePush = async () => {
  if (!swReg) { throw new Error('Service worker is not registered!') };
  try {
    const sub = await swReg.pushManager.subscribe({ userVisibleOnly: true });
    console.log('Endpoint URL: ', sub.endpoint);
    return sub;
  } catch (e) {
    if (Notification.permission === 'denied') {
      console.warn('Permission for notifications was denied');
    } else {
      console.error('Unable to subscribe to push', e);
    }
  };
}

// TODO clean this up
export const sendSubscriptionToBackEnd = (subscription) => {
  return fetch('/api/save-subscription/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subscription)
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Bad status code from server.');
      }

      return response.json();
    })
    .then(function (responseData) {
      if (!(responseData.data && responseData.data.success)) {
        throw new Error('Bad response from server.');
      }
    });
}

export const requestPushPermission = () => {
  if ('Notification' in window && navigator.serviceWorker) {
    Notification.requestPermission(function (status) {
      console.log('Notification permission status:', status);
    });
  }
}

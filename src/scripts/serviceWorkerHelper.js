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

export const requestPushPermission = () => {
  if ('Notification' in window && navigator.serviceWorker) {
    Notification.requestPermission(function (status) {
      console.log('Notification permission status:', status);
    });
  }
}

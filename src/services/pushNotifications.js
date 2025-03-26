export const initializePushNotifications = async () => {
    if (!('Notification' in window)) return
    
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') return
  
    const swRegistration = await navigator.serviceWorker.ready
    const subscription = await swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY
    })
  
    // Send subscription to backend
    await fetch('/api/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscription)
    })
  }
  
  export const showLocalNotification = (title, options) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options)
    }
  }
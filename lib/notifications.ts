// Push notification utilities for PWA support
interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: any;
  requireInteraction?: boolean;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
}

// Check if push notifications are supported
export const isPushNotificationSupported = (): boolean => {
  return 'serviceWorker' in navigator &&
         'PushManager' in window &&
         'Notification' in window;
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!isPushNotificationSupported()) {
    throw new Error('Push notifications are not supported in this browser');
  }

  const permission = await Notification.requestPermission();
  return permission;
};

// Get current permission status
export const getNotificationPermission = (): NotificationPermission => {
  if (!isPushNotificationSupported()) {
    return 'denied';
  }
  return Notification.permission;
};

// Register service worker
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration> => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service workers are not supported');
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered successfully:', registration);
    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    throw error;
  }
};

// Get service worker registration
export const getServiceWorkerRegistration = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!('serviceWorker' in navigator)) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    return registration;
  } catch (error) {
    console.error('Error getting service worker registration:', error);
    return null;
  }
};

// Subscribe to push notifications
export const subscribeToPushNotifications = async (): Promise<PushSubscription | null> => {
  if (!isPushNotificationSupported()) {
    throw new Error('Push notifications are not supported');
  }

  const permission = await requestNotificationPermission();
  if (permission !== 'granted') {
    throw new Error('Notification permission denied');
  }

  const registration = await getServiceWorkerRegistration();
  if (!registration) {
    throw new Error('No service worker registration found');
  }

  try {
    // Get the public key from the server
    const response = await fetch('/api/notifications/vapid-public-key');
    const { publicKey } = await response.json();

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey) as any,
    });

    // Send subscription to server
    await fetch('/api/notifications/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    });

    return subscription;
  } catch (error) {
    console.error('Error subscribing to push notifications:', error);
    throw error;
  }
};

// Unsubscribe from push notifications
export const unsubscribeFromPushNotifications = async (): Promise<void> => {
  const registration = await getServiceWorkerRegistration();
  if (!registration) {
    throw new Error('No service worker registration found');
  }

  const subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    throw new Error('No push subscription found');
  }

  try {
    await subscription.unsubscribe();

    // Notify server about unsubscription
    await fetch('/api/notifications/unsubscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint: subscription.endpoint,
      }),
    });
  } catch (error) {
    console.error('Error unsubscribing from push notifications:', error);
    throw error;
  }
};

// Check if user is subscribed
export const isSubscribedToPushNotifications = async (): Promise<boolean> => {
  const registration = await getServiceWorkerRegistration();
  if (!registration) {
    return false;
  }

  const subscription = await registration.pushManager.getSubscription();
  return subscription !== null;
};

// Show local notification
export const showLocalNotification = async (options: NotificationOptions): Promise<void> => {
  if (getNotificationPermission() !== 'granted') {
    throw new Error('Notification permission not granted');
  }

  const registration = await getServiceWorkerRegistration();
  if (!registration) {
    // Fallback to regular notification if no service worker
    new Notification(options.title, options);
    return;
  }

  await registration.showNotification(options.title, {
    body: options.body,
    icon: options.icon || '/icon-192x192.png',
    badge: options.badge || '/icon-72x72.png',
    tag: options.tag,
    data: options.data,
    requireInteraction: options.requireInteraction,
    actions: (options as any).actions,
  } as any);
};

// Notification templates
export const notificationTemplates = {
  newEvent: (eventName: string, date: string): NotificationOptions => ({
    title: 'New Event Added',
    body: `${eventName} on ${date}. Tap to RSVP!`,
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    tag: 'new-event',
    requireInteraction: false,
    actions: [
      { action: 'rsvp', title: 'RSVP Now' },
      { action: 'details', title: 'View Details' },
    ],
  }),

  prayerRequest: (requesterName: string): NotificationOptions => ({
    title: 'New Prayer Request',
    body: `${requesterName} has submitted a prayer request. Remember them in your prayers.`,
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    tag: 'prayer-request',
    requireInteraction: false,
    actions: [
      { action: 'pray', title: 'Pray Now' },
      { action: 'view', title: 'View Request' },
    ],
  }),

  volunteerReminder: (shiftName: string, time: string): NotificationOptions => ({
    title: 'Volunteer Reminder',
    body: `Don't forget: You're scheduled for ${shiftName} at ${time}`,
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    tag: 'volunteer-reminder',
    requireInteraction: true,
    actions: [
      { action: 'confirm', title: 'Confirm Attendance' },
      { action: 'cancel', title: 'Cancel' },
    ],
  }),

  sundayService: (): NotificationOptions => ({
    title: 'Sunday Service Starting Soon',
    body: 'Join us for worship at 10:00 AM. Live stream available!',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    tag: 'sunday-service',
    requireInteraction: false,
    actions: [
      { action: 'watch', title: 'Watch Live' },
      { action: 'directions', title: 'Get Directions' },
    ],
  }),

  donationThankYou: (amount: string): NotificationOptions => ({
    title: 'Thank You for Your Donation',
    body: `Your donation of ${amount} has been received. God bless you!`,
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    tag: 'donation-thank-you',
    requireInteraction: false,
  }),

  birthdayReminder: (name: string): NotificationOptions => ({
    title: 'Birthday Reminder',
    body: `Today is ${name}'s birthday! Send them your wishes.`,
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    tag: 'birthday-reminder',
    requireInteraction: false,
    actions: [
      { action: 'message', title: 'Send Message' },
    ],
  }),
};

// Schedule notification (requires backend support)
export const scheduleNotification = async (
  options: NotificationOptions,
  scheduledTime: Date
): Promise<void> => {
  try {
    await fetch('/api/notifications/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notification: options,
        scheduledTime: scheduledTime.toISOString(),
      }),
    });
  } catch (error) {
    console.error('Error scheduling notification:', error);
    throw error;
  }
};

// Update notification preferences
export const updateNotificationPreferences = async (preferences: {
  events?: boolean;
  prayers?: boolean;
  volunteers?: boolean;
  services?: boolean;
  birthdays?: boolean;
  newsletters?: boolean;
}): Promise<void> => {
  try {
    await fetch('/api/notifications/preferences', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferences),
    });
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    throw error;
  }
};

// Get notification history
export const getNotificationHistory = async (limit: number = 20): Promise<any[]> => {
  try {
    const response = await fetch(`/api/notifications/history?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch notification history');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching notification history:', error);
    return [];
  }
};

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Check if running as PWA
export const isPWA = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true;
};

// Install prompt handler
let deferredPrompt: any = null;

export const initInstallPrompt = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Trigger custom event to show install button
    window.dispatchEvent(new CustomEvent('pwa-install-available'));
  });
};

export const showInstallPrompt = async (): Promise<boolean> => {
  if (!deferredPrompt) {
    return false;
  }

  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;

  return outcome === 'accepted';
};

export const isInstallPromptAvailable = (): boolean => {
  return deferredPrompt !== null;
};
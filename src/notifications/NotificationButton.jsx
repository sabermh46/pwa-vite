import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { initializePushNotifications } from '../services/pushNotifications';
import "./style.css";

export const NotificationButton = ({ variant = 'primary', size = 'medium', onEnableChange }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkNotificationSupport = async () => {
      try {
        if (!('Notification' in window)) {
          throw new Error('Notifications not supported in this browser');
        }

        if (!('serviceWorker' in navigator)) {
          throw new Error('Service workers not supported');
        }

        const permissionStatus = await navigator.permissions.query({ name: 'notifications' });

        setIsEnabled(permissionStatus.state === 'granted');
        setIsButtonDisabled(permissionStatus.state !== 'prompt');

        // Listen for permission changes
        permissionStatus.onchange = () => {
          setIsEnabled(permissionStatus.state === 'granted');
          setIsButtonDisabled(permissionStatus.state !== 'prompt');
        };
      } catch (err) {
        setError(err.message);
        setIsButtonDisabled(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkNotificationSupport();
  }, []);

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        await initializePushNotifications();
        setIsEnabled(true);
        setIsButtonDisabled(true);
        onEnableChange()

        // Send confirmation to user
        new Notification('Notifications Enabled', {
          body: 'You will now receive daily reminders to journal!',
          icon: '/icon-192x192.png'
        });
      } else if (permission === 'denied') {
        setIsButtonDisabled(true);
      }
    } catch (err) {
      setError(err.message);
      setIsEnabled(false);
      setIsButtonDisabled(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="notification-error" role="alert">
        <p>Notifications unavailable: {error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <button 
        className={`notification-button loading ${size}`}
        disabled
        aria-busy="true"
      >
        Checking Notifications...
      </button>
    );
  }

  return (
    <div className="notification-control">
      <button
        className={`notification-button ${variant} ${size} ${isEnabled ? 'enabled' : ''}`}
        onClick={handleClick}
        disabled={isButtonDisabled}
        aria-label={isEnabled ? 'Notifications enabled' : 'Enable notifications'}
        aria-live="polite"
      >
        {isEnabled ? (
          <>
            <BellIcon className="icon" />
            Notifications Enabled
          </>
        ) : (
          <>
            <BellSlashIcon className="icon" />
            Enable Notifications
          </>
        )}
      </button>
      
      {!isEnabled && !isButtonDisabled && (
        <p className="help-text">
          Receive daily reminders to journal your thoughts
        </p>
      )}
    </div>
  );
};

// PropTypes validation
NotificationButton.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

// Icon components (could be moved to separate file)
const BellIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
  </svg>
);

const BellSlashIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 18h-1v-7c0-1.1-.9-2-2-2-1.66 0-3 1.34-3 3h-1.29l-5.27-5.27c.33-.59.56-1.27.56-2.03 0-2.76-2.24-5-5-5-1.03 0-1.97.31-2.76.83L1.39 4.22 2.8 2.81l18.38 18.38-1.41 1.41L17 18H1v-2h2v-7c0-2.42 1.72-4.44 4-4.9v-.28c0-2.08 1.68-3.82 3.82-3.82 2.19 0 3.93 1.83 3.82 4.01l2 2V11c0 1.1.9 2 2 2 1.66 0 3 1.34 3 3v7h2v2h-4zm-9-9.17V11c0 .55.45 1 1 1s1-.45 1-1v-.17l-2-2z"/>
  </svg>
);

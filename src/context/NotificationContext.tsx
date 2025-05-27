import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { getSocket } from '../utils/api';

interface NotificationData {
  id: string;
  title: string;
  body: string;
  data?: any;
  receivedAt: Date;
}

interface NotificationContextType {
  expoPushToken: string | undefined;
  notifications: NotificationData[];
  addNotification: (notification: NotificationData) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
  expoPushToken: undefined,
  notifications: [],
  addNotification: () => {},
  clearNotifications: () => {},
});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  useEffect(() => {
    async function registerForPushNotificationsAsync() {
      let token;
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        setExpoPushToken(token);
      }
    }
    registerForPushNotificationsAsync();

    // Listener para notificações recebidas em tempo real (push)
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      setNotifications((prev) => [
        {
          id: notification.request.identifier,
          title: notification.request.content.title || '',
          body: notification.request.content.body || '',
          data: notification.request.content.data,
          receivedAt: new Date(),
        },
        ...prev,
      ]);
    });

    // WebSocket para notificações em tempo real
    const socket = getSocket();
    socket.connect();
    socket.on('notification', (data: any) => {
      setNotifications((prev) => [
        {
          id: data.id || String(Date.now()),
          title: data.title || 'Nova notificação',
          body: data.body || '',
          data: data.data,
          receivedAt: new Date(),
        },
        ...prev,
      ]);
    });
    return () => {
      subscription.remove();
      socket.off('notification');
      socket.disconnect();
    };
  }, []);

  function addNotification(notification: NotificationData) {
    setNotifications((prev) => [notification, ...prev]);
  }

  function clearNotifications() {
    setNotifications([]);
  }

  return (
    <NotificationContext.Provider value={{ expoPushToken, notifications, addNotification, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export function useNotification() {
  return useContext(NotificationContext);
}

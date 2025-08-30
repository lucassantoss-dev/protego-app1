import React, { createContext, useContext, useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { api, getSocket } from "../utils/api";
import { useAuth } from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface NotificationData {
  _id: string;
  UserID: string;
  UserName: string;
  AccessType: string;
  DateTime: Date;
  ErrorCode: number;
  ErrorDescription: string;
  Similarity: number;
  Status: string;
  organizationId: string;
  Method: number;
  EventCode: string;
  ImagePaths: [string];
  createdAt: Date;
  updatedAt: Date;
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

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const { user } = useAuth();
  const [token, setToken] = useState<string | undefined>();

  // Busca notificações iniciais via HTTP
  useEffect(() => {
    console.log("user", user);
    async function fetchNotifications() {
      // if (!user?.organizationId) {
      //   console.log('organizationId not found');
      //   return;
      // }
      try {
        // const response = await api.get(`/v1/emergency/all/emergencies?organizationId=${user.organizationId}`);
        const response = await api.get(
          `/v1/actions/all?organizationId=68321cbf3e629d41257b7e3b`
        );
        console.log("response22", response.data.data);
        const data = response.data.data.data;
        if (Array.isArray(data)) {
          setNotifications(
            data.map((n: any) => ({
              id: n._id,
              title: n.UserName || "-",
              body: n.ErrorDescription || n.SuccessDescription || "-",
              data: n,
              receivedAt: new Date(n.DateTime || n.createdAt), // data real do evento
            }))
          );
        }
      } catch (err) {
        console.log("fetch error", err);
      }
    }
    fetchNotifications();
  }, [user, user?.organizationId]);

  // Atualiza token sempre que o usuário muda
  useEffect(() => {
    async function getToken() {
      const t = await AsyncStorage.getItem("@ProtegoApp:token");
      setToken(t || undefined);
    }
    getToken();
  }, [user]);

  // WebSocket para notificações em tempo real
  useEffect(() => {
    if (!token) return;
    const socket = getSocket();
    socket.io.opts.query = { token };
    socket.connect();
    socket.on("notification", (data: any) => {
      setNotifications((prev) => [
        {
          id: data.id || String(Date.now()),
          title: data.title || "Nova notificação",
          body: data.body || "",
          data: data,
          receivedAt: new Date(data.receivedAt || Date.now()),
        },
        ...prev,
      ]);
    });
    return () => {
      socket.off("notification");
      socket.disconnect();
    };
  }, [token]);

  function addNotification(notification: NotificationData) {
    setNotifications((prev) => [notification, ...prev]);
  }

  function clearNotifications() {
    setNotifications([]);
  }

  return (
    <NotificationContext.Provider
      value={{
        expoPushToken,
        notifications,
        addNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export function useNotification() {
  return useContext(NotificationContext);
}

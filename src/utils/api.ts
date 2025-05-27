import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io, Socket } from 'socket.io-client';

export const api = axios.create({
    baseURL: 'http://192.168.100.37:3200',
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('@ProtegoApp:token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            await AsyncStorage.removeItem('@ProtegoApp:token');
            await AsyncStorage.removeItem('@ProtegoApp:user');
        }
        return Promise.reject(error);
    }
);

let socket: Socket | null = null;

export function getSocket() {
  if (!socket) {
    socket = io('http://192.168.100.37:3200', {
      transports: ['websocket'],
      autoConnect: false,
    });
  }
  return socket;
}
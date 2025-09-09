import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../utils/api';
import * as Location from 'expo-location';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

type User = {
    id: string;
    email: string;
    organizationId: string;
    name?: string;
    roleName?: string;
    // outros campos que podem vir do usuário
};

export type PushInfo = {
    pushUserId?: string;
    pushToken?: string;
};

type AuthResponse = {
    data: {
        token: {
            token: string;
            user: User;
        };
    };
    message: string;
    status: number;
};

type LocationType = {
    latitude: number;
    longitude: number;
};

type AuthContextData = {
    user: User | null;
    loading: boolean;
    location: LocationType | null;
    updateLocation: () => Promise<void>;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    biometricReAuth: () => Promise<boolean>;
    pushInfo: PushInfo;
    setPushInfo: (info: PushInfo) => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState<LocationType | null>(null);
    const [pushInfo, setPushInfo] = useState<PushInfo>({});

    useEffect(() => {
        loadStoredUser();
        updateLocation();
    }, []);

    useEffect(() => {
        const registerForPushNotificationsAsync = async () => {
            let token;
            if (Device.isDevice) {
                const { status: existingStatus } = await Notifications.getPermissionsAsync();
                let finalStatus = existingStatus;
                if (existingStatus !== 'granted') {
                    const { status } = await Notifications.requestPermissionsAsync();
                    finalStatus = status;
                }
                if (finalStatus !== 'granted') {
                    console.log('Permissão para notificações não concedida!');
                    return;
                }
                token = (await Notifications.getExpoPushTokenAsync()).data;
                console.log('Push Notification Token:', token);
                setPushInfo({ pushToken: token });
            } else {
                console.log('Precisa usar em um dispositivo físico para notificações push');
            }
        };
        registerForPushNotificationsAsync();
    }, []);

    useEffect(() => {
        // Envia pushInfo para o backend após login e quando pushInfo muda
        if (user && pushInfo.pushToken) {
            console.log('Enviando pushInfo para o backend:', pushInfo);
            api.patch('/v1/user/push-info', {
                userId: user.id,
                pushToken: pushInfo.pushToken,
            });
        }
    }, [user, pushInfo]);

    async function loadStoredUser() {
        try {
            const storedUser = await AsyncStorage.getItem('@ProtegoApp:user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error('Erro ao carregar usuário:', error);
        } finally {
            setLoading(false);
        }
    }

    async function updateLocation() {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocation(null);
                return;
            }
            const loc = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
            });
        } catch (error) {
            setLocation(null);
        }
    }

    async function biometricReAuth() {
        // Verifica se o dispositivo suporta biometria
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (!hasHardware || !isEnrolled) return false;
        // Solicita autenticação biométrica
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Autentique-se para continuar',
        });
        if (!result.success) return false;
        // Recupera credenciais seguras
        const email = await SecureStore.getItemAsync('user_email');
        const password = await SecureStore.getItemAsync('user_password');
        if (email && password) {
            return await login(email, password);
        }
        return false;
    }

    async function login(email: string, password: string) {
        try {
            setLoading(true);
            const response = await api.post<AuthResponse>('/v1/auth/signin', { email, password });
            const { data } = response.data;
            if (!data?.token?.token || !data?.token?.user) {
                throw new Error('Dados de autenticação inválidos');
            }
            await AsyncStorage.setItem('@ProtegoApp:token', data.token.token);
            await AsyncStorage.setItem('@ProtegoApp:user', JSON.stringify(data.token.user));
            await SecureStore.setItemAsync('user_email', email);
            await SecureStore.setItemAsync('user_password', password);
            setUser(data.token.user);
            return true;
        } catch (error) {
            return false;
        } finally {
            setLoading(false);
        }
    }

    async function logout() {
        try {
            setLoading(true);
            await AsyncStorage.removeItem('@ProtegoApp:token');
            await AsyncStorage.removeItem('@ProtegoApp:user');
            setUser(null);
        } catch (error) {
            console.error('Erro no logout:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, location, updateLocation, login, logout, biometricReAuth, pushInfo, setPushInfo }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Welcome } from '../screens/Welcome';
import { Login } from '../screens/Login';
import { AppRoutes } from './app.routes';
import { useAuth } from '../context/AuthContext';

export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    App: undefined;
    Notifications: undefined;
    Feed: undefined;
    Notification: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={user ? "App" : "Login"}
        >
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="App" component={AppRoutes} />
        </Stack.Navigator>
    );
} 
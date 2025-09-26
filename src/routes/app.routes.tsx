import React from 'react';
import { View, Text as RNText } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from '../components/Text';
import Main from '../screens/Main';
import { Notifications } from '../screens/Notifications';
import { Profile } from '../screens/Profile';
import { EditProfile } from '../screens/Profile/EditProfile';
import { Security } from '../screens/Profile/Security';
import { NotificationSettings } from '../screens/Profile/NotificationSettings';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from '../screens/Map';
import MapPlaceholder from '../screens/Map/MapPlaceholder';
import { useNotification } from '../context/NotificationContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type RootStackParamList = {
    Home: undefined;
    Map: undefined;
    Notifications: undefined;
    Profile: undefined;
    EditProfile: undefined;
    Security: undefined;
    NotificationSettings: undefined;
    Notification: undefined;
    Feed: undefined;
    App: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

// Componente personalizado para ícones das tabs
const TabIcon = ({ 
    iconName, 
    focused, 
    color, 
    size,
    badgeCount 
}: { 
    iconName: string; 
    focused: boolean; 
    color: string; 
    size: number; 
    badgeCount?: number;
}) => (
    <View style={{ 
        alignItems: 'center', 
        justifyContent: 'center',
        width: 60,
        height: 45,
        position: 'relative'
    }}>
        {focused && (
            <View 
                style={{
                    position: 'absolute',
                    top: -2,
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: '#111e31',
                }} 
            />
        )}
        <View
            style={{
                backgroundColor: focused ? 'rgba(17, 30, 49, 0.08)' : 'transparent',
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingVertical: 6,
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 32,
            }}
        >
            <Ionicons 
                name={iconName as any} 
                color={color} 
                size={focused ? 26 : 24} 
            />
        </View>
        {badgeCount && badgeCount > 0 && (
            <View
                style={{
                    position: 'absolute',
                    right: 5,
                    top: 8,
                    backgroundColor: '#ef4444',
                    borderRadius: 9,
                    minWidth: 18,
                    height: 18,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: '#ffffff',
                }}
            >
                <RNText
                    style={{
                        color: '#ffffff',
                        fontSize: 10,
                        fontWeight: 'bold',
                    }}
                >
                    {badgeCount > 99 ? '99+' : badgeCount.toString()}
                </RNText>
            </View>
        )}
    </View>
);

const screenOptions = {
    tabBarShowLabel: true,
    headerShown: false,
    tabBarStyle: {
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
        backgroundColor: "#fff"
    }
};

function NotificationStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Security"
                component={Security}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NotificationSettings"
                component={NotificationSettings}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

function MainTabs() {
    const { notifications } = useNotification();
    const unreadCount = notifications.length; // Total de notificações como badge
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#111e31',
                tabBarInactiveTintColor: '#9ca3af',
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                    marginBottom: 2,
                    marginTop: 2,
                },
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopWidth: 0,
                    height: 75 + Math.max(0, insets.bottom - 10),
                    paddingTop: 8,
                    paddingBottom: Math.max(12, insets.bottom + 2), // Espaço mínimo mas próximo dos botões
                    shadowColor: '#111e31',
                    shadowOffset: {
                        width: 0,
                        height: -8,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 16,
                    elevation: 25,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                },
                tabBarIconStyle: {
                    marginTop: 0,
                    marginBottom: 0,
                },
                tabBarItemStyle: {
                    paddingVertical: 2,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={Main}
                options={{
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({ color, size, focused }) => (
                        <TabIcon
                            iconName={focused ? "grid" : "grid-outline"}
                            focused={focused}
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapPlaceholder}
                options={{
                    tabBarLabel: 'Localização',
                    tabBarIcon: ({ color, size, focused }) => (
                        <TabIcon
                            iconName={focused ? "location" : "location-outline"}
                            focused={focused}
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={NotificationStack}
                options={{
                    tabBarLabel: 'Alertas',
                    tabBarIcon: ({ color, size, focused }) => (
                        <TabIcon
                            iconName={focused ? "notifications" : "notifications-outline"}
                            focused={focused}
                            color={color}
                            size={size}
                            badgeCount={unreadCount}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color, size, focused }) => (
                        <TabIcon
                            iconName={focused ? "person" : "person-outline"}
                            focused={focused}
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export function AppRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="Home" component={MainTabs} />
        </Stack.Navigator>
    );
}
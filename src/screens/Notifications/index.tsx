import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '../../components/Text';
import { styles } from './styles';
import { useNotification } from '../../context/NotificationContext';

export function Notifications() {
    const { notifications, clearNotifications } = useNotification();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text size={24} weight="700" color="#fff">
                    Notificações
                </Text>
            </View>
            <ScrollView style={styles.content}>
                {notifications.length === 0 ? (
                    <Text size={16} weight="400" color="#8E8E93">
                        Nenhuma notificação recebida.
                    </Text>
                ) : (
                    notifications.map((notification) => (
                        <View key={notification.id} style={styles.notificationCard}>
                            <View style={styles.notificationHeader}>
                                <Text size={16} weight="600" color="#111e31">
                                    {notification.title}
                                </Text>
                                <Text size={14} weight="400" color="#8E8E93">
                                    {notification.receivedAt.toLocaleTimeString()}
                                </Text>
                            </View>
                            <Text size={14} weight="400" color="#111e31">
                                {notification.body}
                            </Text>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}
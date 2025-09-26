import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert, Clipboard } from 'react-native';
import { Text } from './Text';
import * as Notifications from 'expo-notifications';
import Feather from '@expo/vector-icons/Feather';

export function PushNotificationTester() {
    const [pushToken, setPushToken] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getPushToken();
    }, []);

    const getPushToken = async () => {
        try {
            setLoading(true);
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            setPushToken(token);
            console.log('Push Token:', token);
        } catch (error) {
            console.error('Erro ao obter push token:', error);
            Alert.alert('Erro', 'Não foi possível obter o push token');
        } finally {
            setLoading(false);
        }
    };

    const copyTokenToClipboard = () => {
        Clipboard.setString(pushToken);
        Alert.alert('Copiado!', 'Push token copiado para a área de transferência');
    };

    const sendTestNotification = async () => {
        if (!pushToken) {
            Alert.alert('Erro', 'Push token não encontrado');
            return;
        }

        const message = {
            to: pushToken,
            sound: 'default',
            title: 'Teste de Notificação 🔔',
            body: 'Esta é uma notificação de teste do Protego App!',
            data: { 
                type: 'test',
                timestamp: new Date().toISOString(),
                action: 'open_app'
            },
            priority: 'high',
        };

        try {
            const response = await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });

            const result = await response.json();
            
            if (response.ok && result.data && result.data.status === 'ok') {
                Alert.alert('Sucesso!', 'Notificação enviada com sucesso!');
            } else {
                console.error('Erro na resposta:', result);
                Alert.alert('Erro', 'Falha ao enviar notificação');
            }
        } catch (error) {
            console.error('Erro ao enviar notificação:', error);
            Alert.alert('Erro', 'Não foi possível enviar a notificação');
        }
    };

    const openExpoNotificationTool = () => {
        Alert.alert(
            'Ferramenta Web do Expo',
            'Vá para https://expo.dev/notifications e cole o token para enviar notificações de teste',
            [
                { text: 'Copiar Token', onPress: copyTokenToClipboard },
                { text: 'OK', style: 'cancel' }
            ]
        );
    };

    if (loading) {
        return (
            <View style={{
                backgroundColor: '#ffffff',
                borderRadius: 16,
                padding: 20,
                marginBottom: 24,
                alignItems: 'center',
            }}>
                <Text>Obtendo push token...</Text>
            </View>
        );
    }

    return (
        <View style={{
            backgroundColor: '#ffffff',
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 16,
            }}>
                <View style={{
                    backgroundColor: '#fef3c7',
                    padding: 8,
                    borderRadius: 12,
                    marginRight: 12,
                }}>
                    <Feather name="bell" size={20} color="#f59e0b" />
                </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#111827' }}>
                    Teste de Push Notification
                </Text>
            </View>

            <View style={{
                backgroundColor: '#f3f4f6',
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
            }}>
                <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>
                    Push Token:
                </Text>
                <Text style={{ fontSize: 10, color: '#111827', fontFamily: 'monospace' }}>
                    {pushToken || 'Carregando...'}
                </Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 8 }}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: '#3b82f6',
                        paddingVertical: 12,
                        borderRadius: 8,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                    onPress={sendTestNotification}
                >
                    <Feather name="send" size={16} color="#ffffff" style={{ marginRight: 6 }} />
                    <Text style={{ color: '#ffffff', fontWeight: '600' }}>
                        Enviar Teste
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: '#10b981',
                        paddingVertical: 12,
                        borderRadius: 8,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                    onPress={openExpoNotificationTool}
                >
                    <Feather name="external-link" size={16} color="#ffffff" style={{ marginRight: 6 }} />
                    <Text style={{ color: '#ffffff', fontWeight: '600' }}>
                        Usar Web Tool
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor: '#f3f4f6',
                    paddingVertical: 8,
                    borderRadius: 6,
                    alignItems: 'center',
                    marginTop: 8,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
                onPress={copyTokenToClipboard}
            >
                <Feather name="copy" size={14} color="#6b7280" style={{ marginRight: 4 }} />
                <Text style={{ color: '#6b7280', fontSize: 12 }}>
                    Copiar Token
                </Text>
            </TouchableOpacity>
        </View>
    );
}
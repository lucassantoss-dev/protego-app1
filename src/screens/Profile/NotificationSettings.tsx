import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, SafeAreaView, Switch, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import { Text } from '../../components/Text';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useNotification } from '../../context/NotificationContext';
import * as Animatable from 'react-native-animatable';

export function NotificationSettings() {
    const { user } = useAuth();
    const { notifications } = useNotification();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    
    const [notificationPreferences, setNotificationPreferences] = useState({
        pushNotifications: true,
        emailNotifications: false,
        smsNotifications: false,
        inAppNotifications: true,
    });

    const [alertTypes, setAlertTypes] = useState({
        securityAlerts: true,
        recognitionAlerts: true,
        systemUpdates: false,
        maintenanceAlerts: true,
        emergencyAlerts: true,
    });

    const [notificationTiming, setNotificationTiming] = useState({
        quietHours: false,
        quietStart: '22:00',
        quietEnd: '07:00',
        weekendNotifications: true,
        instantNotifications: true,
    });

    const [soundSettings, setSoundSettings] = useState({
        notificationSound: true,
        vibration: true,
        ledFlash: false,
        soundType: 'Default',
        priorityOverride: true,
    });

    const saveSettings = () => {
        Alert.alert('Sucesso', 'Configurações de notificação salvas com sucesso!');
    };

    const NotificationOption = ({ 
        icon, 
        iconColor,
        bgColor,
        title, 
        description, 
        value, 
        onValueChange, 
        type = 'switch',
        options = [] 
    }: {
        icon: string;
        iconColor: string;
        bgColor: string;
        title: string;
        description: string;
        value: boolean | string;
        onValueChange: (value: any) => void;
        type?: 'switch' | 'select';
        options?: string[];
    }) => (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#f3f4f6',
        }}>
            <View style={{
                backgroundColor: bgColor,
                padding: 10,
                borderRadius: 12,
                marginRight: 16,
            }}>
                <Feather name={icon as any} size={20} color={iconColor} />
            </View>
            
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 4 }}>
                    {title}
                </Text>
                <Text style={{ fontSize: 14, color: '#6b7280' }}>
                    {description}
                </Text>
            </View>

            {type === 'switch' ? (
                <Switch
                    value={value as boolean}
                    onValueChange={onValueChange}
                    trackColor={{ false: '#f3f4f6', true: '#10b981' }}
                    thumbColor={value ? '#ffffff' : '#ffffff'}
                />
            ) : (
                <TouchableOpacity
                    style={{
                        backgroundColor: '#f3f4f6',
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: '#6b7280', fontSize: 14, marginRight: 4 }}>
                        {value}
                    </Text>
                    <Feather name="chevron-down" size={16} color="#6b7280" />
                </TouchableOpacity>
            )}
        </View>
    );

    const StatCard = ({ icon, iconColor, bgColor, title, value, subtitle }: {
        icon: string;
        iconColor: string;
        bgColor: string;
        title: string;
        value: string;
        subtitle: string;
    }) => (
        <View style={{
            backgroundColor: '#ffffff',
            borderRadius: 12,
            padding: 16,
            flex: 1,
            marginHorizontal: 6,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
        }}>
            <View style={{
                backgroundColor: bgColor,
                padding: 8,
                borderRadius: 10,
                alignSelf: 'flex-start',
                marginBottom: 12,
            }}>
                <Feather name={icon as any} size={20} color={iconColor} />
            </View>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 4 }}>
                {value}
            </Text>
            <Text style={{ fontSize: 12, fontWeight: '600', color: '#111827', marginBottom: 2 }}>
                {title}
            </Text>
            <Text style={{ fontSize: 11, color: '#6b7280' }}>
                {subtitle}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={{ 
            flex: 1, 
            backgroundColor: '#f8fafc', 
            paddingTop: Math.max(insets.top, 10) 
        }}>
            {/* Header */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 16,
                backgroundColor: '#ffffff',
                borderBottomWidth: 1,
                borderBottomColor: '#e5e7eb',
            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#f3f4f6',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 16,
                    }}
                >
                    <Feather name="arrow-left" size={20} color="#374151" />
                </TouchableOpacity>
                
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#111827' }}>
                        Notificações
                    </Text>
                    <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 2 }}>
                        Configure alertas e notificações
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={saveSettings}
                    style={{
                        backgroundColor: '#10b981',
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Feather name="check" size={16} color="#ffffff" style={{ marginRight: 6 }} />
                    <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '600' }}>
                        Salvar
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView 
                style={{ flex: 1 }} 
                contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Statistics */}
                <Animatable.View animation="fadeInUp" delay={200} style={{
                    flexDirection: 'row',
                    marginBottom: 24,
                }}>
                    <StatCard
                        icon="bell"
                        iconColor="#3b82f6"
                        bgColor="#dbeafe"
                        title="Total Hoje"
                        value={notifications.length.toString()}
                        subtitle="notificações"
                    />
                    <StatCard
                        icon="check-circle"
                        iconColor="#10b981"
                        bgColor="#d1fae5"
                        title="Lidas"
                        value="0"
                        subtitle="hoje"
                    />
                    <StatCard
                        icon="alert-circle"
                        iconColor="#f59e0b"
                        bgColor="#fef3c7"
                        title="Pendentes"
                        value={notifications.length.toString()}
                        subtitle="ações"
                    />
                </Animatable.View>

                {/* Notification Channels */}
                <Animatable.View animation="fadeInUp" delay={400} style={{
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
                        marginBottom: 20,
                    }}>
                        <View style={{
                            backgroundColor: '#dbeafe',
                            padding: 8,
                            borderRadius: 12,
                            marginRight: 12,
                        }}>
                            <Feather name="send" size={20} color="#3b82f6" />
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#111827' }}>
                            Canais de Notificação
                        </Text>
                    </View>

                    <NotificationOption
                        icon="smartphone"
                        iconColor="#3b82f6"
                        bgColor="#dbeafe"
                        title="Notificações Push"
                        description="Receber alertas no dispositivo"
                        value={notificationPreferences.pushNotifications}
                        onValueChange={(value) => setNotificationPreferences(prev => ({ ...prev, pushNotifications: value }))}
                    />

                    <NotificationOption
                        icon="mail"
                        iconColor="#10b981"
                        bgColor="#d1fae5"
                        title="Notificações por E-mail"
                        description="Receber resumos por e-mail"
                        value={notificationPreferences.emailNotifications}
                        onValueChange={(value) => setNotificationPreferences(prev => ({ ...prev, emailNotifications: value }))}
                    />

                    <NotificationOption
                        icon="message-square"
                        iconColor="#f59e0b"
                        bgColor="#fef3c7"
                        title="Notificações SMS"
                        description="Alertas críticos via SMS"
                        value={notificationPreferences.smsNotifications}
                        onValueChange={(value) => setNotificationPreferences(prev => ({ ...prev, smsNotifications: value }))}
                    />

                    <NotificationOption
                        icon="bell"
                        iconColor="#8b5cf6"
                        bgColor="#f3e8ff"
                        title="Notificações no App"
                        description="Alertas dentro do aplicativo"
                        value={notificationPreferences.inAppNotifications}
                        onValueChange={(value) => setNotificationPreferences(prev => ({ ...prev, inAppNotifications: value }))}
                    />
                </Animatable.View>

                {/* Alert Types */}
                <Animatable.View animation="fadeInUp" delay={600} style={{
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
                        marginBottom: 20,
                    }}>
                        <View style={{
                            backgroundColor: '#fecaca',
                            padding: 8,
                            borderRadius: 12,
                            marginRight: 12,
                        }}>
                            <Feather name="alert-triangle" size={20} color="#dc2626" />
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#111827' }}>
                            Tipos de Alertas
                        </Text>
                    </View>

                    <NotificationOption
                        icon="shield"
                        iconColor="#dc2626"
                        bgColor="#fecaca"
                        title="Alertas de Segurança"
                        description="Detecções e incidentes críticos"
                        value={alertTypes.securityAlerts}
                        onValueChange={(value) => setAlertTypes(prev => ({ ...prev, securityAlerts: value }))}
                    />

                    <NotificationOption
                        icon="user-check"
                        iconColor="#10b981"
                        bgColor="#d1fae5"
                        title="Alertas de Reconhecimento"
                        description="Identificações faciais realizadas"
                        value={alertTypes.recognitionAlerts}
                        onValueChange={(value) => setAlertTypes(prev => ({ ...prev, recognitionAlerts: value }))}
                    />

                    <NotificationOption
                        icon="download"
                        iconColor="#6b7280"
                        bgColor="#f3f4f6"
                        title="Atualizações do Sistema"
                        description="Novas versões e recursos"
                        value={alertTypes.systemUpdates}
                        onValueChange={(value) => setAlertTypes(prev => ({ ...prev, systemUpdates: value }))}
                    />

                    <NotificationOption
                        icon="tool"
                        iconColor="#f59e0b"
                        bgColor="#fef3c7"
                        title="Alertas de Manutenção"
                        description="Manutenções programadas"
                        value={alertTypes.maintenanceAlerts}
                        onValueChange={(value) => setAlertTypes(prev => ({ ...prev, maintenanceAlerts: value }))}
                    />

                    <NotificationOption
                        icon="zap"
                        iconColor="#dc2626"
                        bgColor="#fecaca"
                        title="Alertas de Emergência"
                        description="Situações críticas que requerem ação imediata"
                        value={alertTypes.emergencyAlerts}
                        onValueChange={(value) => setAlertTypes(prev => ({ ...prev, emergencyAlerts: value }))}
                    />
                </Animatable.View>

                {/* Timing Settings */}
                <Animatable.View animation="fadeInUp" delay={800} style={{
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
                        marginBottom: 20,
                    }}>
                        <View style={{
                            backgroundColor: '#f3e8ff',
                            padding: 8,
                            borderRadius: 12,
                            marginRight: 12,
                        }}>
                            <Feather name="clock" size={20} color="#8b5cf6" />
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#111827' }}>
                            Configurações de Horário
                        </Text>
                    </View>

                    <NotificationOption
                        icon="moon"
                        iconColor="#8b5cf6"
                        bgColor="#f3e8ff"
                        title="Modo Silencioso"
                        description="Desativar notificações em horários específicos"
                        value={notificationTiming.quietHours}
                        onValueChange={(value) => setNotificationTiming(prev => ({ ...prev, quietHours: value }))}
                    />

                    <NotificationOption
                        icon="calendar"
                        iconColor="#10b981"
                        bgColor="#d1fae5"
                        title="Notificações nos Fins de Semana"
                        description="Receber alertas sábados e domingos"
                        value={notificationTiming.weekendNotifications}
                        onValueChange={(value) => setNotificationTiming(prev => ({ ...prev, weekendNotifications: value }))}
                    />

                    <NotificationOption
                        icon="zap"
                        iconColor="#f59e0b"
                        bgColor="#fef3c7"
                        title="Notificações Instantâneas"
                        description="Receber alertas imediatamente"
                        value={notificationTiming.instantNotifications}
                        onValueChange={(value) => setNotificationTiming(prev => ({ ...prev, instantNotifications: value }))}
                    />
                </Animatable.View>

                {/* Sound & Vibration */}
                <Animatable.View animation="fadeInUp" delay={1000} style={{
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    padding: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 4,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 20,
                    }}>
                        <View style={{
                            backgroundColor: '#fef3c7',
                            padding: 8,
                            borderRadius: 12,
                            marginRight: 12,
                        }}>
                            <Feather name="volume-2" size={20} color="#f59e0b" />
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#111827' }}>
                            Som e Vibração
                        </Text>
                    </View>

                    <NotificationOption
                        icon="volume-2"
                        iconColor="#f59e0b"
                        bgColor="#fef3c7"
                        title="Som das Notificações"
                        description="Reproduzir som ao receber alertas"
                        value={soundSettings.notificationSound}
                        onValueChange={(value) => setSoundSettings(prev => ({ ...prev, notificationSound: value }))}
                    />

                    <NotificationOption
                        icon="smartphone"
                        iconColor="#8b5cf6"
                        bgColor="#f3e8ff"
                        title="Vibração"
                        description="Vibrar ao receber notificações"
                        value={soundSettings.vibration}
                        onValueChange={(value) => setSoundSettings(prev => ({ ...prev, vibration: value }))}
                    />

                    <NotificationOption
                        icon="music"
                        iconColor="#10b981"
                        bgColor="#d1fae5"
                        title="Tipo de Som"
                        description="Escolher tom de notificação"
                        value={soundSettings.soundType}
                        onValueChange={(value) => setSoundSettings(prev => ({ ...prev, soundType: value }))}
                        type="select"
                        options={['Default', 'Alert', 'Chime', 'Bell']}
                    />

                    <NotificationOption
                        icon="alert-circle"
                        iconColor="#dc2626"
                        bgColor="#fecaca"
                        title="Ignorar Modo Silencioso"
                        description="Alertas críticos mesmo no silencioso"
                        value={soundSettings.priorityOverride}
                        onValueChange={(value) => setSoundSettings(prev => ({ ...prev, priorityOverride: value }))}
                    />
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
}
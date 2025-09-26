import React, { useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, SafeAreaView, Alert, Dimensions } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Text } from '../../components/Text';
import { NotificationRedirectTester } from '../../components/NotificationRedirectTester';
import { styles } from './styles';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useNotification } from '../../context/NotificationContext';
import * as Animatable from 'react-native-animatable';

export function Profile() {
    const { user, logout } = useAuth();
    const { notifications } = useNotification();
    const navigation = useNavigation();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const { width } = Dimensions.get('window');

    // Estatísticas do usuário
    const userStats = {
        totalNotifications: notifications.length,
        successfulRecognitions: notifications.filter(n => n.data?.Status?.toLowerCase() === 'success').length,
        pendingAlerts: notifications.filter(n => n.data?.Status?.toLowerCase() !== 'success').length,
        lastActivity: notifications.length > 0 ? notifications[0].data?.DateTime || notifications[0].data?.createdAt : null,
    };

    const handleLogout = () => {
        Alert.alert(
            'Confirmar Logout',
            'Tem certeza que deseja sair da sua conta?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Sair', style: 'destructive', onPress: logout }
            ]
        );
    };

    const profileSections = [
        {
            title: 'Configurações da Conta',
            items: [
                { 
                    icon: 'user', 
                    title: 'Editar Perfil', 
                    subtitle: 'Alterar informações pessoais', 
                    action: () => navigation.navigate('EditProfile') 
                },
                { 
                    icon: 'shield', 
                    title: 'Segurança', 
                    subtitle: 'Alterar senha e configurações', 
                    action: () => navigation.navigate('Security') 
                },
                { 
                    icon: 'bell', 
                    title: 'Notificações', 
                    subtitle: 'Personalizar alertas', 
                    action: () => navigation.navigate('NotificationSettings') 
                },
            ]
        },
        {
            title: 'Sistema',
            items: [
                { icon: 'help-circle', title: 'Ajuda & Suporte', subtitle: 'Central de ajuda', action: () => {} },
                { icon: 'info', title: 'Sobre o App', subtitle: 'Versão e informações', action: () => {} },
                { icon: 'file-text', title: 'Termos de Uso', subtitle: 'Políticas e termos', action: () => {} },
            ]
        }
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafb' }}>
            {/* Modern Header */}
            <View style={{
                backgroundColor: '#111e31',
                paddingTop: 50,
                paddingBottom: 30,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
            }}>
                <Animatable.View animation="fadeInDown" duration={800} style={{
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            padding: 8,
                            borderRadius: 12,
                            marginRight: 12,
                        }}>
                            <Feather name="user" size={24} color="#ffffff" />
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 24,
                                fontWeight: '700',
                                color: '#ffffff',
                            }}>
                                Meu Perfil
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: 'rgba(255, 255, 255, 0.8)',
                            }}>
                                {user?.roleName === 'admin' ? 'Administrador do Sistema' : 'Agente de Segurança'}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            padding: 8,
                            borderRadius: 12,
                        }}
                    >
                        <Feather name="settings" size={20} color="#ffffff" />
                    </TouchableOpacity>
                </Animatable.View>
            </View>

            <ScrollView 
                style={{ flex: 1 }} 
                contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Profile Card */}
                <Animatable.View animation="fadeInUp" delay={200} style={{
                    backgroundColor: '#ffffff',
                    borderRadius: 20,
                    padding: 24,
                    alignItems: 'center',
                    marginBottom: 24,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.1,
                    shadowRadius: 15,
                    elevation: 8,
                }}>
                    <View style={{ position: 'relative', marginBottom: 16 }}>
                        <Image
                            source={{ 
                                uri: user?.photo || 'https://static.vecteezy.com/ti/vetor-gratis/p1/1840618-imagem-perfil-icone-masculino-icone-humano-ou-pessoa-sinal-e-simbolo-gratis-vetor.jpg'
                            }}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                backgroundColor: '#f3f4f6',
                                borderWidth: 4,
                                borderColor: '#ffffff',
                            }}
                        />
                        <View style={{
                            position: 'absolute',
                            bottom: 2,
                            right: 2,
                            width: 28,
                            height: 28,
                            borderRadius: 14,
                            backgroundColor: '#10b981',
                            borderWidth: 3,
                            borderColor: '#ffffff',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Feather name="check" size={14} color="#ffffff" />
                        </View>
                    </View>

                    <Text style={{
                        fontSize: 24,
                        fontWeight: '700',
                        color: '#1f2937',
                        marginBottom: 8,
                    }}>
                        {user?.name || 'Nome do Usuário'}
                    </Text>

                    <View style={{
                        backgroundColor: user?.roleName === 'admin' ? '#fef3c7' : '#dbeafe',
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 20,
                        marginBottom: 16,
                    }}>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: '600',
                            color: user?.roleName === 'admin' ? '#d97706' : '#1d4ed8',
                        }}>
                            {user?.roleName === 'admin' ? '👑 Administrador' : '🛡️ Agente de Segurança'}
                        </Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#f8f9fa',
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 12,
                    }}>
                        <Feather name="mail" size={16} color="#6b7280" />
                        <Text style={{
                            fontSize: 14,
                            color: '#6b7280',
                            marginLeft: 8,
                        }}>
                            {user?.email || 'email@exemplo.com'}
                        </Text>
                    </View>
                </Animatable.View>

                {/* Push Notification Tester */}
                <Animatable.View animation="fadeInUp" delay={250}>
                    <NotificationRedirectTester />
                </Animatable.View>

                {/* Statistics Cards */}
                <Animatable.View animation="fadeInUp" delay={300} style={{ marginBottom: 24 }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: '700',
                        color: '#1f2937',
                        marginBottom: 16,
                    }}>
                        📊 Suas Estatísticas
                    </Text>

                    <View style={{
                        flexDirection: 'row',
                        marginBottom: 12,
                    }}>
                        <View style={{
                            flex: 1,
                            backgroundColor: '#ffffff',
                            borderRadius: 12,
                            padding: 16,
                            marginRight: 6,
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                        }}>
                            <View style={{
                                backgroundColor: '#dbeafe',
                                padding: 12,
                                borderRadius: 12,
                                marginBottom: 8,
                            }}>
                                <Feather name="bell" size={20} color="#3b82f6" />
                            </View>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '800',
                                color: '#3b82f6',
                                marginBottom: 4,
                            }}>
                                {userStats.totalNotifications}
                            </Text>
                            <Text style={{
                                fontSize: 11,
                                color: '#6b7280',
                                textAlign: 'center',
                                fontWeight: '600',
                            }}>
                                Notificações
                            </Text>
                        </View>

                        <View style={{
                            flex: 1,
                            backgroundColor: '#ffffff',
                            borderRadius: 12,
                            padding: 16,
                            marginHorizontal: 6,
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                        }}>
                            <View style={{
                                backgroundColor: '#dcfce7',
                                padding: 12,
                                borderRadius: 12,
                                marginBottom: 8,
                            }}>
                                <Feather name="check-circle" size={20} color="#10b981" />
                            </View>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '800',
                                color: '#10b981',
                                marginBottom: 4,
                            }}>
                                {userStats.successfulRecognitions}
                            </Text>
                            <Text style={{
                                fontSize: 11,
                                color: '#6b7280',
                                textAlign: 'center',
                                fontWeight: '600',
                            }}>
                                Autorizados
                            </Text>
                        </View>

                        <View style={{
                            flex: 1,
                            backgroundColor: '#ffffff',
                            borderRadius: 12,
                            padding: 16,
                            marginLeft: 6,
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                        }}>
                            <View style={{
                                backgroundColor: '#fee2e2',
                                padding: 12,
                                borderRadius: 12,
                                marginBottom: 8,
                            }}>
                                <Feather name="alert-circle" size={20} color="#ef4444" />
                            </View>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '800',
                                color: '#ef4444',
                                marginBottom: 4,
                            }}>
                                {userStats.pendingAlerts}
                            </Text>
                            <Text style={{
                                fontSize: 11,
                                color: '#6b7280',
                                textAlign: 'center',
                                fontWeight: '600',
                            }}>
                                Pendentes
                            </Text>
                        </View>
                    </View>

                    {/* Last Activity */}
                    {userStats.lastActivity && (
                        <View style={{
                            backgroundColor: '#ffffff',
                            borderRadius: 12,
                            padding: 16,
                            flexDirection: 'row',
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                        }}>
                            <View style={{
                                backgroundColor: '#f3e8ff',
                                padding: 10,
                                borderRadius: 10,
                                marginRight: 12,
                            }}>
                                <Feather name="activity" size={20} color="#8b5cf6" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: '600',
                                    color: '#1f2937',
                                }}>
                                    Última Atividade
                                </Text>
                                <Text style={{
                                    fontSize: 12,
                                    color: '#6b7280',
                                    marginTop: 2,
                                }}>
                                    {new Date(userStats.lastActivity).toLocaleString('pt-BR')}
                                </Text>
                            </View>
                        </View>
                    )}
                </Animatable.View>

                {/* Menu Sections */}
                {profileSections.map((section, sectionIndex) => (
                    <Animatable.View 
                        key={section.title}
                        animation="fadeInUp" 
                        delay={400 + (sectionIndex * 100)}
                        style={{ marginBottom: 24 }}
                    >
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '700',
                            color: '#1f2937',
                            marginBottom: 12,
                        }}>
                            {section.title}
                        </Text>

                        <View style={{
                            backgroundColor: '#ffffff',
                            borderRadius: 12,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                        }}>
                            {section.items.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: 16,
                                        borderBottomWidth: index < section.items.length - 1 ? 1 : 0,
                                        borderBottomColor: '#f3f4f6',
                                    }}
                                    activeOpacity={0.7}
                                    onPress={item.action}
                                >
                                    <View style={{
                                        backgroundColor: '#f8f9fa',
                                        padding: 10,
                                        borderRadius: 10,
                                        marginRight: 16,
                                    }}>
                                        <Feather name={item.icon as any} size={20} color="#6b7280" />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: '600',
                                            color: '#1f2937',
                                        }}>
                                            {item.title}
                                        </Text>
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#6b7280',
                                            marginTop: 2,
                                        }}>
                                            {item.subtitle}
                                        </Text>
                                    </View>
                                    <Feather name="chevron-right" size={20} color="#9ca3af" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Animatable.View>
                ))}

                {/* Logout Button */}
                <Animatable.View animation="fadeInUp" delay={600}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#ef4444',
                            borderRadius: 12,
                            padding: 16,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            shadowColor: '#ef4444',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 8,
                            elevation: 8,
                        }}
                        activeOpacity={0.8}
                        onPress={handleLogout}
                    >
                        <Feather name="log-out" size={20} color="#ffffff" style={{ marginRight: 8 }} />
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '700',
                            color: '#ffffff',
                        }}>
                            Sair da Conta
                        </Text>
                    </TouchableOpacity>
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
}
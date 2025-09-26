import React, { useState } from 'react';
import { View, ScrollView, Modal, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Text } from '../../components/Text';
import { styles } from './styles';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import type { NotificationData } from '../../context/NotificationContext';
import * as Animatable from 'react-native-animatable';

export function Notifications() {
    const { notifications } = useNotification();
    const { user } = useAuth();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState<NotificationData | null>(null);
    const [filterStatus, setFilterStatus] = useState<'all' | 'success' | 'pending'>('all');

    // Filtrar notificações baseado no status selecionado
    const filteredNotifications = notifications.filter(item => {
        if (filterStatus === 'all') return true;
        const status = item.data?.Status?.toLowerCase() || 'pending';
        if (filterStatus === 'success') return status === 'success';
        if (filterStatus === 'pending') return status !== 'success';
        return true;
    });

    // Estatísticas das notificações
    const totalCount = notifications.length;
    const successCount = notifications.filter(n => n.data?.Status?.toLowerCase() === 'success').length;
    const pendingCount = notifications.filter(n => n.data?.Status?.toLowerCase() !== 'success').length;

    const renderNotificationItem = ({ item, index }: { item: NotificationData, index: number }) => {
        const status = item.data?.Status || "pending";
        const isSuccess = status.toLowerCase() === "success";
        const statusColor = isSuccess ? "#10b981" : "#ef4444";
        const nome = item.data?.UserName || "Pessoa não identificada";
        const local = item.data?.AccessType || "Entrada principal";
        const foto = 'https://via.placeholder.com/50x50/e5e7eb/9ca3af?text=' + (nome.charAt(0) || '?');
        
        const dt = item.data?.DateTime || item.data?.createdAt;
        const dataFormatada = dt
            ? new Date(dt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            })
            : "Data indisponível";
        const horaFormatada = dt
            ? new Date(dt).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })
            : "--:--";

        return (
            <Animatable.View 
                animation="fadeInUp" 
                delay={index * 100} 
                style={{ marginBottom: 12 }}
            >
                <TouchableOpacity
                    onPress={() => { setSelectedNotification(item); setModalVisible(true); }}
                    style={{
                        backgroundColor: '#ffffff',
                        borderRadius: 16,
                        padding: 16,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.08,
                        shadowRadius: 12,
                        elevation: 4,
                        borderLeftWidth: 4,
                        borderLeftColor: statusColor,
                    }}
                    activeOpacity={0.8}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* Foto da pessoa */}
                        <View style={{ marginRight: 12, position: 'relative' }}>
                            <Image
                                source={{ uri: foto }}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    backgroundColor: '#f3f4f6',
                                }}
                            />
                            {/* Status indicator */}
                            <View style={{
                                position: 'absolute',
                                bottom: -2,
                                right: -2,
                                width: 16,
                                height: 16,
                                borderRadius: 8,
                                backgroundColor: statusColor,
                                borderWidth: 2,
                                borderColor: '#ffffff',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Feather 
                                    name={isSuccess ? "check" : "clock"} 
                                    size={8} 
                                    color="#ffffff" 
                                />
                            </View>
                        </View>

                        {/* Informações principais */}
                        <View style={{ flex: 1 }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 6,
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: '600',
                                    color: '#1f2937',
                                    flex: 1,
                                    marginRight: 8,
                                }}>
                                    {nome}
                                </Text>
                                <View style={{
                                    backgroundColor: isSuccess ? '#dcfce7' : '#fee2e2',
                                    paddingHorizontal: 8,
                                    paddingVertical: 3,
                                    borderRadius: 6,
                                }}>
                                    <Text style={{
                                        fontSize: 10,
                                        fontWeight: '600',
                                        color: statusColor,
                                    }}>
                                        {isSuccess ? 'AUTORIZADO' : 'PENDENTE'}
                                    </Text>
                                </View>
                            </View>

                            {/* Local */}
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 4,
                            }}>
                                <Feather name="map-pin" size={12} color="#6b7280" />
                                <Text style={{
                                    fontSize: 13,
                                    color: '#6b7280',
                                    marginLeft: 4,
                                }}>
                                    {local}
                                </Text>
                            </View>

                            {/* Data e hora */}
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <Feather name="clock" size={12} color="#6b7280" />
                                    <Text style={{
                                        fontSize: 12,
                                        color: '#6b7280',
                                        marginLeft: 4,
                                    }}>
                                        {dataFormatada} • {horaFormatada}
                                    </Text>
                                </View>
                                <Feather name="chevron-right" size={16} color="#9ca3af" />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animatable.View>
        );
    };

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
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            <View style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                padding: 8,
                                borderRadius: 12,
                                marginRight: 12,
                            }}>
                                <Feather name="bell" size={24} color="#ffffff" />
                            </View>
                            <Text style={{
                                fontSize: 24,
                                fontWeight: '700',
                                color: '#ffffff',
                            }}>
                                Notificações
                            </Text>
                        </View>
                        <Text style={{
                            fontSize: 14,
                            color: 'rgba(255, 255, 255, 0.8)',
                        }}>
                            Reconhecimentos do sistema de IA
                        </Text>
                    </View>
                    {totalCount > 0 && (
                        <View style={{
                            backgroundColor: '#ef4444',
                            paddingHorizontal: 12,
                            paddingVertical: 6,
                            borderRadius: 16,
                            minWidth: 40,
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: '#ffffff',
                                fontSize: 14,
                                fontWeight: '700',
                            }}>
                                {totalCount}
                            </Text>
                        </View>
                    )}
                </Animatable.View>
            </View>

            {/* Statistics Cards */}
            <View style={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 16 }}>
                <Animatable.View animation="fadeInUp" delay={200} style={{
                    flexDirection: 'row',
                    marginBottom: 20,
                }}>
                    <View style={{
                        flex: 1,
                        backgroundColor: '#ffffff',
                        borderRadius: 12,
                        padding: 16,
                        marginRight: 8,
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
                            {successCount}
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
                        marginLeft: 8,
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
                            {pendingCount}
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
                </Animatable.View>

                {/* Filter Buttons */}
                <Animatable.View animation="fadeInUp" delay={400} style={{
                    flexDirection: 'row',
                    backgroundColor: '#ffffff',
                    borderRadius: 12,
                    padding: 4,
                    marginBottom: 16,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    elevation: 2,
                }}>
                    {[
                        { key: 'all', label: 'Todas', count: totalCount },
                        { key: 'success', label: 'Autorizadas', count: successCount },
                        { key: 'pending', label: 'Pendentes', count: pendingCount },
                    ].map((filter) => (
                        <TouchableOpacity
                            key={filter.key}
                            onPress={() => setFilterStatus(filter.key as any)}
                            style={{
                                flex: 1,
                                paddingVertical: 10,
                                paddingHorizontal: 12,
                                borderRadius: 8,
                                backgroundColor: filterStatus === filter.key ? '#1a237e' : 'transparent',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{
                                fontSize: 14,
                                fontWeight: '600',
                                color: filterStatus === filter.key ? '#ffffff' : '#6b7280',
                            }}>
                                {filter.label} ({filter.count})
                            </Text>
                        </TouchableOpacity>
                    ))}
                </Animatable.View>
            </View>

            {/* Notifications List */}
            <View style={{ flex: 1, paddingHorizontal: 16 }}>
                {filteredNotifications.length === 0 ? (
                    <Animatable.View animation="fadeIn" delay={600} style={{
                        backgroundColor: '#ffffff',
                        borderRadius: 16,
                        padding: 32,
                        alignItems: 'center',
                        marginTop: 20,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.05,
                        shadowRadius: 8,
                        elevation: 3,
                    }}>
                        <View style={{
                            backgroundColor: '#f3f4f6',
                            padding: 20,
                            borderRadius: 20,
                            marginBottom: 20,
                        }}>
                            <Feather name="inbox" size={40} color="#9ca3af" />
                        </View>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: '#6b7280',
                            marginBottom: 8,
                        }}>
                            {filterStatus === 'all' ? 'Nenhuma notificação' : 
                             filterStatus === 'success' ? 'Nenhuma autorização' : 
                             'Nenhum pendente'}
                        </Text>
                        <Text style={{
                            fontSize: 14,
                            color: '#9ca3af',
                            textAlign: 'center',
                            lineHeight: 20,
                        }}>
                            {filterStatus === 'all' 
                                ? 'Quando o sistema identificar pessoas,\nas notificações aparecerão aqui'
                                : filterStatus === 'success' 
                                ? 'Nenhuma pessoa foi autorizada ainda'
                                : 'Não há alertas pendentes no momento'
                            }
                        </Text>
                    </Animatable.View>
                ) : (
                    <FlatList
                        data={filteredNotifications}
                        renderItem={renderNotificationItem}
                        keyExtractor={(item) => item.data?._id || Math.random().toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                    />
                )}
            </View>
            {/* Enhanced Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }}>
                    <View style={{ 
                        backgroundColor: '#fff', 
                        borderTopLeftRadius: 24, 
                        borderTopRightRadius: 24, 
                        marginTop: '20%',
                        flex: 1,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: -4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 12,
                        elevation: 20,
                    }}>
                        {selectedNotification && (
                            <ScrollView contentContainerStyle={{ padding: 24 }}>
                                {/* Header do modal */}
                                <View style={{ 
                                    flexDirection: 'row', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center', 
                                    marginBottom: 20,
                                    paddingBottom: 16,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#f3f4f6'
                                }}>
                                    <View>
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: '700',
                                            color: '#1f2937'
                                        }}>
                                            Detalhes do Reconhecimento
                                        </Text>
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#6b7280',
                                            marginTop: 4
                                        }}>
                                            Informações completas da identificação
                                        </Text>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => setModalVisible(false)}
                                        style={{
                                            backgroundColor: '#f3f4f6',
                                            padding: 8,
                                            borderRadius: 20,
                                            width: 36,
                                            height: 36,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Feather name="x" size={18} color="#6b7280" />
                                    </TouchableOpacity>
                                </View>

                                {/* Foto e status */}
                                <View style={{ alignItems: 'center', marginBottom: 24 }}>
                                    <View style={{ position: 'relative', marginBottom: 16 }}>
                                        <Image
                                            source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
                                            style={{ 
                                                width: 120, 
                                                height: 120, 
                                                borderRadius: 60,
                                                backgroundColor: '#f3f4f6',
                                                borderWidth: 4,
                                                borderColor: '#ffffff',
                                            }}
                                        />
                                        <View style={{
                                            position: 'absolute',
                                            bottom: 4,
                                            right: 4,
                                            width: 32,
                                            height: 32,
                                            borderRadius: 16,
                                            backgroundColor: selectedNotification.data?.Status?.toLowerCase() === 'success' ? '#10b981' : '#ef4444',
                                            borderWidth: 4,
                                            borderColor: '#ffffff',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Feather 
                                                name={selectedNotification.data?.Status?.toLowerCase() === 'success' ? "check" : "x"} 
                                                size={16} 
                                                color="#ffffff" 
                                            />
                                        </View>
                                    </View>
                                    <Text style={{
                                        fontSize: 22,
                                        fontWeight: '700',
                                        color: '#1f2937',
                                        marginBottom: 8,
                                    }}>
                                        {selectedNotification.data?.UserName || 'Nome não identificado'}
                                    </Text>
                                    <View style={{
                                        backgroundColor: selectedNotification.data?.Status?.toLowerCase() === 'success' ? '#dcfce7' : '#fee2e2',
                                        paddingHorizontal: 16,
                                        paddingVertical: 8,
                                        borderRadius: 20,
                                    }}>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: '600',
                                            color: selectedNotification.data?.Status?.toLowerCase() === 'success' ? '#10b981' : '#ef4444',
                                        }}>
                                            {selectedNotification.data?.Status?.toLowerCase() === 'success' ? '✓ ACESSO AUTORIZADO' : '⚠ RESTRIÇÃO ENCONTRADA'}
                                        </Text>
                                    </View>
                                </View>

                                {/* Informações detalhadas */}
                                <View style={{ marginBottom: 24 }}>
                                    {[
                                        { icon: 'map-pin', label: 'Local de Acesso', value: selectedNotification.data?.AccessType || 'Entrada principal' },
                                        { icon: 'calendar', label: 'Data', value: selectedNotification.data?.DateTime ? new Date(selectedNotification.data.DateTime).toLocaleDateString('pt-BR') : 'Não disponível' },
                                        { icon: 'clock', label: 'Horário', value: selectedNotification.data?.DateTime ? new Date(selectedNotification.data.DateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'Não disponível' },
                                        { icon: 'percent', label: 'Similaridade', value: selectedNotification.data?.Similarity ? `${selectedNotification.data.Similarity}%` : 'N/A' },
                                        { icon: 'user', label: 'ID do Usuário', value: selectedNotification.data?.UserID || 'Não identificado' },
                                    ].map((item, index) => (
                                        <View key={index} style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingVertical: 12,
                                            paddingHorizontal: 16,
                                            backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#ffffff',
                                            borderRadius: 8,
                                            marginBottom: 8,
                                        }}>
                                            <View style={{
                                                backgroundColor: '#e8eaf6',
                                                padding: 8,
                                                borderRadius: 8,
                                                marginRight: 12,
                                            }}>
                                                <Feather name={item.icon as any} size={16} color="#1a237e" />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{
                                                    fontSize: 12,
                                                    color: '#6b7280',
                                                    fontWeight: '500',
                                                    marginBottom: 2,
                                                }}>
                                                    {item.label}
                                                </Text>
                                                <Text style={{
                                                    fontSize: 14,
                                                    color: '#1f2937',
                                                    fontWeight: '600',
                                                }}>
                                                    {item.value}
                                                </Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>

                                {/* Botões de ação */}
                                <View style={{ 
                                    flexDirection: 'row', 
                                    gap: 12,
                                    marginTop: 8 
                                }}>
                                    <TouchableOpacity style={{ 
                                        flex: 1, 
                                        backgroundColor: '#10b981', 
                                        padding: 16, 
                                        borderRadius: 12,
                                        alignItems: 'center',
                                        shadowColor: '#10b981',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 8,
                                        elevation: 6,
                                    }}>
                                        <Feather name="check" size={18} color="#ffffff" style={{ marginBottom: 4 }} />
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: '700',
                                            color: '#ffffff'
                                        }}>
                                            Marcar como Atendida
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ 
                                        flex: 1, 
                                        backgroundColor: '#f59e0b', 
                                        padding: 16, 
                                        borderRadius: 12,
                                        alignItems: 'center',
                                        shadowColor: '#f59e0b',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 8,
                                        elevation: 6,
                                    }}>
                                        <Feather name="send" size={18} color="#ffffff" style={{ marginBottom: 4 }} />
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: '700',
                                            color: '#ffffff'
                                        }}>
                                            Encaminhar
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        )}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
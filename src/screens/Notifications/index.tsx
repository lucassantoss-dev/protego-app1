import React, { useState } from 'react';
import { View, ScrollView, Modal, TouchableOpacity, Image } from 'react-native';
import { Text } from '../../components/Text';
import { styles } from './styles';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import type { NotificationData } from '../../context/NotificationContext';

export function Notifications() {
    const { notifications } = useNotification();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState<NotificationData | null>(null);

    return (
        <View style={styles.container}>
            {/* Header fixo com fundo azul */}
            <View style={{ backgroundColor: '#111e31', paddingTop: 40, paddingBottom: 18, paddingHorizontal: 18, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                <Text size={24} weight="700" color="#fff">Notificações</Text>
            </View>
            {/* Lista de todas as notificações */}
            <ScrollView style={{ flex: 1, backgroundColor: '#fff', borderBottomLeftRadius: 4, borderBottomRightRadius: 4, padding: 16 }}>
                {notifications.length === 0 ? (
                    <Text size={16} weight="400" color="#8E8E93">Nenhuma notificação recebida.</Text>
                ) : (
                    notifications.map((item: NotificationData) => {
                        const status = item.data?.Status || "-";
                        const statusColor = status !== "pending" ? "#4caf50" : "#f44336";
                        const dateStr = item.data?.createdAt ? new Date(item.data.createdAt).toLocaleDateString() : "-";
                        const timeObj = item.data?.createdAt ? new Date(item.data.createdAt) : null;
                        const timeStr = timeObj ? `${timeObj.getHours().toString().padStart(2, "0")}:${timeObj.getMinutes().toString().padStart(2, "0")}` : "-";
                        return (
                            <TouchableOpacity
                                key={item.data?._id}
                                onPress={() => { setSelectedNotification(item); setModalVisible(true); }}
                                style={{
                                    backgroundColor: "#fff",
                                    borderRadius: 8,
                                    padding: 10,
                                    marginBottom: 8,
                                    elevation: 1,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: statusColor, marginRight: 8 }} />
                                    <Text style={{ fontWeight: "bold", fontSize: 15, marginBottom: 2, color: statusColor }}>
                                        {status !== "pending" ? "Atendida" : "Pendente"}
                                    </Text>
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ color: "#333", fontSize: 13, marginBottom: 2 }}>
                                            {item.data?.UserName || "-"}
                                        </Text>
                                        <Text style={{ color: "#333", fontSize: 12 }}>
                                            {item.data?.ErrorDescription || "-"}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: "flex-end", marginLeft: 12 }}>
                                    <Text style={{ color: "#888", fontSize: 12 }}>
                                        {dateStr}
                                    </Text>
                                    <Text style={{ color: "#888", fontSize: 12 }}>
                                        {timeStr}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                )}
            </ScrollView>
            {/* Modal de detalhes da notificação */}
            <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}>
                    <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 18, borderTopRightRadius: 18, padding: 0, width: '100%', marginTop: 0, flex: 1 }}>
                        <ScrollView contentContainerStyle={{ padding: 24 }}>
                            {/* Título e botão de fechar acima da imagem */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                <Text size={18} weight="700" color="#111e31">Detalhes da Notificação</Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <Text size={22} weight="700" color="#888">×</Text>
                                </TouchableOpacity>
                            </View>
                            {/* Imagem da pessoa identificada */}
                            <View style={{ alignItems: 'center', marginBottom: 18 }}>
                                <View style={{ width: '100%', height: 220, overflow: 'hidden', backgroundColor: '#eee', marginTop: 12 }}>
                                    <Image
                                        source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
                                        style={{ width: '100%', height: 220, resizeMode: 'cover' }}
                                    />
                                </View>
                                <Text size={16} weight="700" color="#111e31" style={{ marginTop: 8 }}>
                                    {selectedNotification?.data?.UserName || 'Nome do Usuário'}
                                </Text>
                            </View>
                            {/* Informações da notificação */}
                            {selectedNotification && (
                                <>
                                    <Text size={16} weight="600" color="#1976d2" style={{ marginTop: 12 }}>Título: {selectedNotification.data?.UserName || 'Fake Título'}</Text>
                                    <Text size={14} weight="400" color="#111e31" style={{ marginTop: 8 }}>Corpo: {selectedNotification.data?.ErrorDescription || 'Fake corpo da notificação.'}</Text>
                                    <Text size={14} weight="400" color="#8E8E93" style={{ marginTop: 8 }}>Status: {selectedNotification.data?.Status || 'pending'}</Text>
                                    <Text size={14} weight="400" color="#8E8E93" style={{ marginTop: 8 }}>Agente: {selectedNotification.data?.agentId || 'Fake Agente'}</Text>
                                    <Text size={14} weight="400" color="#8E8E93" style={{ marginTop: 8 }}>Data: {selectedNotification.data?.createdAt ? new Date(selectedNotification.data.createdAt).toLocaleDateString() : '-'}</Text>
                                    <Text size={14} weight="400" color="#8E8E93" style={{ marginTop: 8 }}>Hora: {selectedNotification.data?.createdAt ? `${new Date(selectedNotification.data.createdAt).getHours().toString().padStart(2, "0")}:${new Date(selectedNotification.data.createdAt).getMinutes().toString().padStart(2, "0")}` : '-'}</Text>
                                    {/* Informações fakes extras */}
                                    <Text size={14} weight="400" color="#8E8E93" style={{ marginTop: 8 }}>Localização: Fake localização</Text>
                                    <Text size={14} weight="400" color="#8E8E93" style={{ marginTop: 8 }}>Prioridade: Alta</Text>
                                </>
                            )}
                            <View style={{ flexDirection: 'row', marginTop: 24, justifyContent: 'space-between' }}>
                                <TouchableOpacity style={{ flex: 1, backgroundColor: '#1976d2', padding: 12, borderRadius: 8, marginRight: 8 }}>
                                    <Text size={16} weight="700" color="#fff" style={{ textAlign: 'center' }}>Atender</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1, backgroundColor: '#fbc02d', padding: 12, borderRadius: 8 }}>
                                    <Text size={16} weight="700" color="#111e31" style={{ textAlign: 'center' }}>Transferir</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
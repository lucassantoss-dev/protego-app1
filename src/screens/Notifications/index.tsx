import React, { useState } from 'react';
import { View, ScrollView, Modal, TouchableOpacity, Image } from 'react-native';
import { Text } from '../../components/Text';
import { styles } from './styles';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
// Tipos para os componentes das tabs
import type { NotificationData } from '../../context/NotificationContext';

interface OpenTabContentProps {
    notifications: NotificationData[];
    isAgent: boolean;
    isAdmin: boolean;
}

interface AttendedTabContentProps {
    notifications: NotificationData[];
    isAgent: boolean;
    isAdmin: boolean;
    setSelectedNotification: (n: NotificationData) => void;
    setModalVisible: (v: boolean) => void;
}

export function Notifications() {
    const { notifications } = useNotification();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'open' | 'attended'>('open');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState<NotificationData | null>(null);

    const isAgent = user?.roleName === 'agente';
    const isAdmin = user?.roleName === 'admin';
    // Filtros corretos para as tabs
    const openNotifications = notifications.filter(n => (n.data?.status === 'pending' || n.status === 'pending'));
    const attendedByMe = notifications.filter(n => ((n.data?.status && n.data?.status !== 'pending') || (n.status && n.status !== 'pending')) && n.data?.agentId === user?.id);
    const attendedAll = notifications.filter(n => (n.data?.status && n.data?.status !== 'pending') || (n.status && n.status !== 'pending'));

    return (
        <View style={styles.container}>
            {/* Header fixo com fundo azul */}
            <View style={{ backgroundColor: '#111e31', paddingTop: 40, paddingBottom: 18, paddingHorizontal: 18, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                <Text size={24} weight="700" color="#fff">Notificações</Text>
            </View>
            {/* TabBar fixa abaixo do header */}
            <View style={{ flexDirection: 'row', backgroundColor: '#f5f5f5', borderTopLeftRadius: 4, borderTopRightRadius: 4 }}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        padding: 14,
                        alignItems: 'center',
                        borderBottomWidth: activeTab === 'open' ? 2 : 0,
                        borderBottomColor: activeTab === 'open' ? '#222' : 'transparent', // barra menor e cor diferente
                    }}
                    onPress={() => setActiveTab('open')}
                >
                    <Text size={16} weight={activeTab === 'open' ? '700' : '400'} color={activeTab === 'open' ? '#222' : '#8E8E93'}>
                        Em aberto
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        padding: 14,
                        alignItems: 'center',
                        borderBottomWidth: activeTab === 'attended' ? 2 : 0,
                        borderBottomColor: activeTab === 'attended' ? '#222' : 'transparent', // barra menor e cor diferente
                    }}
                    onPress={() => setActiveTab('attended')}
                >
                    <Text size={16} weight={activeTab === 'attended' ? '700' : '400'} color={activeTab === 'attended' ? '#222' : '#8E8E93'}>
                        Atendidas
                    </Text>
                </TouchableOpacity>
            </View>
            {/* Content branco e cada tab com sua tela */}
            <View style={{ flex: 1, backgroundColor: '#fff', borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }}>
                {activeTab === 'open' ? (
                    <OpenTabContent
                        notifications={openNotifications}
                        isAgent={isAgent}
                        isAdmin={isAdmin}
                    />
                ) : (
                    <AttendedTabContent
                        notifications={isAgent ? attendedByMe : attendedAll}
                        isAgent={isAgent}
                        isAdmin={isAdmin}
                        setSelectedNotification={setSelectedNotification}
                        setModalVisible={setModalVisible}
                    />
                )}
            </View>
            {/* Modal para admin ver detalhes da notificação atendida */}
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
                                    {selectedNotification?.data?.agentName || 'Nome do Agente'}
                                </Text>
                            </View>
                            {/* Informações da notificação */}
                            {selectedNotification && (
                                <>
                                    <Text size={16} weight="600" color="#1976d2" style={{ marginTop: 12 }}>Título: {selectedNotification.title || 'Fake Título'}</Text>
                                    <Text size={14} weight="400" color="#111e31" style={{ marginTop: 8 }}>Corpo: {selectedNotification.body || 'Fake corpo da notificação.'}</Text>
                                    <Text size={14} weight="400" color="#8E8E93" style={{ marginTop: 8 }}>Status: {selectedNotification.data?.status || selectedNotification.status || 'pending'}</Text>
                                    <Text size={14} weight="400" color="#8E8E93" style={{ marginTop: 8 }}>Agente: {selectedNotification.data?.agentName || 'Fake Agente'}</Text>
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

// Componentes de conteúdo das tabs
function OpenTabContent({ notifications, isAgent, isAdmin }: OpenTabContentProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState<NotificationData | null>(null);

    return (
        <>
            <ScrollView style={{ padding: 16 }}>
                {notifications.length === 0 ? (
                    <Text size={16} weight="400" color="#8E8E93">Nenhuma notificação em aberto.</Text>
                ) : (
                    notifications.map((item: NotificationData) => {
                        const status = item.data?.status || item.status || "-";
                        const isAttended = status !== "pending";
                        const statusColor = isAttended ? "#4caf50" : "#f44336";
                        const dateStr = item.data?.createdAt ? new Date(item.data.createdAt).toLocaleDateString() : "-";
                        const timeObj = item.data?.createdAt ? new Date(item.data.createdAt) : null;
                        const timeStr = timeObj ? `${timeObj.getHours().toString().padStart(2, "0")}:${timeObj.getMinutes().toString().padStart(2, "0")}` : "-";
                        return (
                            <TouchableOpacity
                                key={item.data?._id || item._id}
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
                                        {isAttended ? "Atendida" : "Pendente"}
                                    </Text>
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ color: "#333", fontSize: 13, marginBottom: 2 }}>
                                            {item.title || "-"}
                                        </Text>
                                        <Text style={{ color: "#333", fontSize: 12 }}>
                                            {item.body || "-"}
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
                                    {selectedNotification?.data?.agentName || 'Nome do Agente'}
                                </Text>
                            </View>
                            {/* Informações da notificação */}
                            {selectedNotification && (
                                <>
                                    <Text size={16} weight="600" color="#1976d2" style={{ marginTop: 12 }}>Título: {selectedNotification.title || 'Fake Título'}</Text>
                                    <Text size={14} weight="400" color="#111e31" style={{ marginTop: 8 }}>Corpo: {selectedNotification.body || 'Fake corpo da notificação.'}</Text>
                                    <Text size={14} weight="400" color="#8E8E93" style={{ marginTop: 8 }}>Status: {selectedNotification.data?.status || selectedNotification.status || 'pending'}</Text>
                                    <Text size={14} weight="400" color="#8E8E93" style={{ marginTop: 8 }}>Agente: {selectedNotification.data?.agentName || 'Fake Agente'}</Text>
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
        </>
    );
}

function AttendedTabContent({ notifications, isAgent, isAdmin, setSelectedNotification, setModalVisible }: AttendedTabContentProps) {
    return (
        <ScrollView style={{ padding: 16 }}>
            {notifications.length === 0 ? (
                <Text size={16} weight="400" color="#8E8E93">Nenhuma notificação atendida.</Text>
            ) : (
                notifications.map((item: NotificationData) => {
                    const status = item.data?.status || item.status || "-";
                    const isAttended = status !== "pending";
                    const statusColor = isAttended ? "#4caf50" : "#f44336";
                    const dateStr = item.data?.createdAt ? new Date(item.data.createdAt).toLocaleDateString() : "-";
                    const timeObj = item.data?.createdAt ? new Date(item.data.createdAt) : null;
                    const timeStr = timeObj ? `${timeObj.getHours().toString().padStart(2, "0")}:${timeObj.getMinutes().toString().padStart(2, "0")}` : "-";
                    return (
                        <TouchableOpacity
                            key={item.data?._id || item._id}
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
                            onPress={() => { setSelectedNotification(item); setModalVisible(true); }}
                        >
                            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: statusColor, marginRight: 8 }} />
                                <Text style={{ fontWeight: "bold", fontSize: 15, marginBottom: 2, color: statusColor }}>
                                    {isAttended ? "Atendida" : "Pendente"}
                                </Text>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ color: "#333", fontSize: 13, marginBottom: 2 }}>
                                        {item.title || "-"}
                                    </Text>
                                    <Text style={{ color: "#333", fontSize: 12 }}>
                                        {item.body || "-"}
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
    );
}
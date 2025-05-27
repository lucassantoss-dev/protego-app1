import React, { useState } from "react";
import { ActivityIndicator, SafeAreaView, View, Image, Text, FlatList } from "react-native";
import { CenteredContainer } from "./styles";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from '../../context/NotificationContext';
import { Header } from "./Header";
import { Location } from "./Location";
import { CardsList } from "./CardsList";
import { styles } from "./styles";

export default function Main() {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const { notifications } = useNotification();
    const isOnline = true; // Substitua por lógica real de status

    // Mock de agentes e eventos (substitua por dados reais depois)
    const agents = [
      { id: '1', name: 'Agente Ana', latitude: -23.55052, longitude: -46.633308 },
      { id: '2', name: 'Agente João', latitude: -23.552, longitude: -46.634 },
    ];
    const events = [
      { id: 'e1', type: 'Furto', urgency: 'alta' as const, latitude: -23.551, longitude: -46.632, description: 'Furto em andamento' },
      { id: 'e2', type: 'Roubo', urgency: 'media' as const, latitude: -23.553, longitude: -46.635, description: 'Roubo reportado' },
      { id: 'e3', type: 'Agressão', urgency: 'baixa' as const, latitude: -23.550, longitude: -46.630, description: 'Agressão leve' },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && (
                <View style={CenteredContainer.container}>
                    <ActivityIndicator color="#fff" size="large" />
                </View>
            )}
            {!isLoading && (
                <>
                    <View style={styles.viewContainerLogo}>
                        <Image 
                            source={require('../../assets/images/logo-2.png')} 
                            style={styles.logoImage}
                        />
                        <Header />
                        <Location />
                    </View>
                    <View style={[styles.homeContainerContent, { flex: 1 }]}> 
                        {/* Status Online/Offline */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                          <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: isOnline ? '#4caf50' : '#f44336', marginRight: 6 }} />
                          <Text style={{ fontSize: 14, color: '#555', fontWeight: '600' }}>{isOnline ? 'Online' : 'Offline'}</Text>
                        </View>
                        {/* Notificações recentes */}
                        <View style={{ marginBottom: 16 }}>
                          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>Notificações Recentes</Text>
                          <FlatList
                            data={notifications.slice(0, 3)}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                              <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 8, elevation: 1 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.title}</Text>
                                <Text style={{ color: '#333', fontSize: 13 }}>{item.body}</Text>
                                <Text style={{ color: '#888', fontSize: 12, marginTop: 2 }}>{item.receivedAt.toLocaleTimeString()}</Text>
                              </View>
                            )}
                            ListEmptyComponent={<Text style={{ color: '#888', fontStyle: 'italic' }}>Nenhuma notificação recente.</Text>}
                          />
                        </View>
                        {/* Cards de Ações Rápidas - agora usando CardsList animados */}
                        <View style={{ marginBottom: 16 }}>
                          <CardsList />
                        </View>
                    </View>
                    {/* Estatísticas do Dia */}
                    <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 16, margin: 16, elevation: 1 }}>
                      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>Estatísticas do Dia</Text>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ alignItems: 'center', flex: 1 }}>
                          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#1976d2' }}>5</Text>
                          <Text style={{ color: '#888', fontSize: 13 }}>Ocorrências</Text>
                        </View>
                        <View style={{ alignItems: 'center', flex: 1 }}>
                          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#388e3c' }}>2</Text>
                          <Text style={{ color: '#888', fontSize: 13 }}>Alertas</Text>
                        </View>
                        <View style={{ alignItems: 'center', flex: 1 }}>
                          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#fbc02d' }}>3h</Text>
                          <Text style={{ color: '#888', fontSize: 13 }}>Tempo Online</Text>
                        </View>
                      </View>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
}
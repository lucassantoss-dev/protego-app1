import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { colors, metrics, fonts } from '../../styles/theme';
import { styles } from './styles';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { InteractiveMap } from '../../components/Map/InteractiveMap';

export function Home() {
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
    <View style={styles.container}>
      {/* Header com status */}
      <View style={styles.header}>
        <Text style={styles.title}>Olá, {user?.name || 'Agente'}!</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
          <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: isOnline ? '#4caf50' : '#f44336', marginRight: 6 }} />
          <Text style={{ fontSize: 14, color: '#555' }}>{isOnline ? 'Online' : 'Offline'}</Text>
        </View>
      </View>
      {/* Notificações recentes */}
      <View style={{ marginBottom: 24 }}>
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
      {/* Mapa com eventos */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>Eventos Próximos</Text>
        <View style={{ height: 250, borderRadius: 12, overflow: 'hidden' }}>
          <InteractiveMap agents={agents} events={events} />
        </View>
      </View>
    </View>
  );
}
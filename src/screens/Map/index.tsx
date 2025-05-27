import React from 'react';
import { View, StyleSheet } from 'react-native';
import { InteractiveMap } from '../../components/Map/InteractiveMap';

// Dados mockados de agentes e eventos
const agents = [
  { id: '1', name: 'Agente Ana', latitude: -23.55052, longitude: -46.633308 },
  { id: '2', name: 'Agente João', latitude: -23.552, longitude: -46.634 },
];

const events = [
  { id: 'e1', type: 'Furto', urgency: 'alta', latitude: -23.551, longitude: -46.632, description: 'Furto em andamento' },
  { id: 'e2', type: 'Roubo', urgency: 'media', latitude: -23.553, longitude: -46.635, description: 'Roubo reportado' },
  { id: 'e3', type: 'Agressão', urgency: 'baixa', latitude: -23.550, longitude: -46.630, description: 'Agressão leve' },
];

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <InteractiveMap agents={agents} events={events} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

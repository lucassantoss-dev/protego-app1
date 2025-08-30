import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Platform } from 'react-native';
import { InteractiveMap } from '../../components/Map/InteractiveMap';

// Dados mockados de agentes e eventos
const agents = [
  { id: '1', name: 'Agente Ana', latitude: -3.7304512, longitude: -38.5217989 },
  { id: '2', name: 'Agente João', latitude: -3.728889, longitude: -38.526669 },
  { id: '3', name: 'Agente Carlos', latitude: -3.7265, longitude: -38.527 },
  { id: '4', name: 'Agente Maria', latitude: -3.722, longitude: -38.524 },
];

const events = [
  { id: 'e1', type: 'Furto', urgency: 'alta' as const, latitude: -3.727, longitude: -38.534, description: 'Furto em andamento' },
  { id: 'e2', type: 'Roubo', urgency: 'media' as const, latitude: -3.728, longitude: -38.528, description: 'Roubo reportado' },
  { id: 'e3', type: 'Agressão', urgency: 'baixa' as const, latitude: -3.729, longitude: -38.522, description: 'Agressão leve' },
];

export default function MapScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <InteractiveMap agents={agents} events={events} mapHeight={undefined} showFilters={true} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
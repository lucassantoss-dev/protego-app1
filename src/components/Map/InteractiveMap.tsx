import React, { useMemo, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../../context/AuthContext';

// Tipos para agentes e eventos
interface Agent {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface Event {
  id: string;
  type: string;
  urgency: 'baixa' | 'media' | 'alta';
  latitude: number;
  longitude: number;
  description: string;
}

interface Props {
  agents: Agent[];
  events: Event[];
  mapHeight?: number;
  showFilters?: boolean;
}

const eventTypes = ['Todos', 'Furto', 'Roubo', 'Agressão'];
const urgencies = ['Todas', 'baixa', 'media', 'alta'];

export const InteractiveMap: React.FC<Props> = ({ agents, events, mapHeight, showFilters = true }) => {
  const { location } = useAuth();
  const [selectedType, setSelectedType] = useState('Todos');
  const [selectedUrgency, setSelectedUrgency] = useState('Todas');

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const typeMatch = selectedType === 'Todos' || event.type === selectedType;
      const urgencyMatch = selectedUrgency === 'Todas' || event.urgency === selectedUrgency;
      return typeMatch && urgencyMatch;
    });
  }, [events, selectedType, selectedUrgency]);

  // Calcula o centro dos agentes, se houver, senão usa Fortaleza
  const mapCenter = useMemo(() => {
    if (agents.length > 0) {
      const latSum = agents.reduce((sum, a) => sum + a.latitude, 0);
      const lngSum = agents.reduce((sum, a) => sum + a.longitude, 0);
      return {
        latitude: latSum / agents.length,
        longitude: lngSum / agents.length,
      };
    }
    return { latitude: -3.71722, longitude: -38.54306 };
  }, [agents]);

  return (
    <View style={[styles.container, { flex: 1, height: mapHeight || '100%' }]}> 
      <MapView
        style={{ width: '100%', height: '100%', flex: 1 }}
        initialRegion={{
          latitude: mapCenter.latitude,
          longitude: mapCenter.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
      >
        {/* Marcadores de agentes */}
        {agents.map(agent => (
          <Marker
            key={agent.id}
            coordinate={{ latitude: agent.latitude, longitude: agent.longitude }}
            title={agent.name}
            pinColor="blue"
          />
        ))}
        {/* Marcadores de eventos */}
        {filteredEvents.map(event => (
          <Marker
            key={event.id}
            coordinate={{ latitude: event.latitude, longitude: event.longitude }}
            title={event.type}
            description={event.description}
            pinColor={event.urgency === 'alta' ? 'red' : event.urgency === 'media' ? 'orange' : 'yellow'}
          />
        ))}
      </MapView>
      {/* Filtros */}
      {showFilters && (
        <View style={styles.filters}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 13, fontWeight: '600', marginBottom: 2 }}>Tipo</Text>
            <Picker
              selectedValue={selectedType}
              style={styles.picker}
              onValueChange={setSelectedType}
            >
              {eventTypes.map(type => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 13, fontWeight: '600', marginBottom: 2 }}>Urgência</Text>
            <Picker
              selectedValue={selectedUrgency}
              style={styles.picker}
              onValueChange={setSelectedUrgency}
            >
              {urgencies.map(u => (
                <Picker.Item key={u} label={u} value={u} />
              ))}
            </Picker>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  map: { width: '100%', height: '100%' },
  filters: {
    position: 'absolute',
    top: 24,
    left: 16,
    right: 16,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderRadius: 14,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center', // <- alterado para centralizar verticalmente
    zIndex: 10,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    gap: 12, // aumenta o gap
  },
  picker: {
    height: 54, // aumenta a altura
    minWidth: 120,
    maxWidth: 180,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    fontSize: 18,
    paddingHorizontal: 8,
    paddingVertical: 8, // adiciona padding vertical
  },
});

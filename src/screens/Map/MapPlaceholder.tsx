import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function MapPlaceholder() {
  const handleOpenGuide = () => {
    // Você pode abrir um link para documentação ou outro recurso
    console.log('Abrir guia de configuração');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="map-outline" size={80} color="#9ca3af" />
        </View>
        
        <Text style={styles.title}>Mapa Não Configurado</Text>
        <Text style={styles.description}>
          Para usar a funcionalidade de localização, é necessário configurar uma API Key do Google Maps.
        </Text>

        <View style={styles.stepsContainer}>
          <Text style={styles.stepsTitle}>Passos necessários:</Text>
          <Text style={styles.step}>1. Obter API Key do Google Maps</Text>
          <Text style={styles.step}>2. Configurar no arquivo app.json</Text>
          <Text style={styles.step}>3. Rebuild do projeto</Text>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleOpenGuide}
        >
          <Ionicons name="document-text-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Ver Guia Completo</Text>
        </TouchableOpacity>

        <View style={styles.noteContainer}>
          <Ionicons name="information-circle-outline" size={16} color="#6b7280" />
          <Text style={styles.note}>
            Consulte o arquivo GOOGLE_MAPS_SETUP.md para instruções detalhadas
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 24,
    padding: 20,
    backgroundColor: '#f1f5f9',
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111e31',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  stepsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 32,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111e31',
    marginBottom: 12,
  },
  step: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    paddingLeft: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111e31',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    marginTop: 8,
  },
  note: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 8,
    flexShrink: 1,
    textAlign: 'center',
  },
});
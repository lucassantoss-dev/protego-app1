import React from 'react';
import { View } from 'react-native';
import { Card } from './Card';
import { useAuth } from '../../context/AuthContext';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/app.routes';
import * as Animatable from 'react-native-animatable';

export const CardsList: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  if (user?.roleName === 'admin') {
    return (
      <View style={{ marginBottom: 8 }}>
        <Animatable.View animation="fadeInUp" delay={400}>
          <Card
            icon="bell"
            iconColor="#ef4444"
            gradientColor="#ef4444"
            title="Notificações"
            subtitle="3 novas notificações de reconhecimento"
            onPress={() => navigation.navigate('Notifications')}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" delay={500}>
          <Card
            icon="users"
            iconColor="#3b82f6"
            gradientColor="#3b82f6"
            title="Pessoas Reconhecidas"
            subtitle="5 identificações realizadas hoje"
            onPress={() => navigation.navigate('Profile')}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" delay={600}>
          <Card
            icon="shield-alert"
            iconColor="#f59e0b"
            gradientColor="#f59e0b"
            title="Alertas de Segurança"
            subtitle="1 alerta crítico pendente"
            onPress={() => navigation.navigate('Notifications')}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" delay={700}>
          <Card
            icon="map-pin"
            iconColor="#10b981"
            gradientColor="#10b981"
            title="Localização de Eventos"
            subtitle="Visualizar no mapa interativo"
            onPress={() => navigation.navigate('Map')}
          />
        </Animatable.View>
      </View>
    );
  }

  return (
    <View style={{ marginBottom: 8 }}>
      <Animatable.View animation="fadeInUp" delay={400}>
        <Card
          icon="file-plus"
          iconColor="#8b5cf6"
          gradientColor="#8b5cf6"
          title="Minhas Ocorrências"
          subtitle="Relatar novo incidente de segurança"
          onPress={() => navigation.navigate('Feed')}
        />
      </Animatable.View>
      <Animatable.View animation="fadeInUp" delay={500}>
        <Card
          icon="bell"
          iconColor="#ef4444"
          gradientColor="#ef4444"
          title="Notificações"
          subtitle="3 novas notificações"
          onPress={() => navigation.navigate('Notifications')}
        />
      </Animatable.View>
    </View>
  );
};

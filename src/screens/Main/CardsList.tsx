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

  if (user?.role === 'admin') {
    return (
      <>
        <Animatable.View animation="fadeInUp" delay={300} style={{ padding: 15 }}>
          <Card
            icon="bell"
            title="Notificações"
            subtitle="3 novas notificações"
            onPress={() => navigation.navigate('Notifications')}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" delay={500} style={{ padding: 15 }}>
          <Card
            icon="user-check"
            title="Pessoas Reconhecidas"
            subtitle="5 pessoas identificadas hoje"
            onPress={() => navigation.navigate('Profile')}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" delay={700} style={{ padding: 15 }}>
          <Card
            icon="alert-circle"
            title="Alertas de Segurança"
            subtitle="1 alerta crítico"
            onPress={() => navigation.navigate('Notifications')}
          />
        </Animatable.View>
      </>
    );
  }

  return (
    <>
      <Animatable.View animation="fadeInUp" delay={300} style={{ padding: 15 }}>
        <Card
          icon="alert-triangle"
          title="Minhas Ocorrências"
          subtitle="Relate um incidente"
          onPress={() => navigation.navigate('Feed')}
        />
      </Animatable.View>
      <Animatable.View animation="fadeInUp" delay={300} style={{ padding: 15 }}>
        <Card
          icon="bell"
          title="Notificações"
          subtitle="3 novas notificações"
          onPress={() => navigation.navigate('Notifications')}
        />
      </Animatable.View>
    </>
  );
};

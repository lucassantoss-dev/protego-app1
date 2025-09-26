import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Text } from '../../components/Text';
import { useGreeting } from '../../hooks/useGreeting';
import { useAuth } from '../../context/AuthContext';
import { styles } from './styles';
import * as Animatable from 'react-native-animatable';

export const Header: React.FC<{ small?: boolean }> = ({ small }) => {
  const { greetingText, iconName, colorIcon } = useGreeting();
  const { user } = useAuth();
  const userPhotoDefault = 'https://static.vecteezy.com/ti/vetor-gratis/p1/1840618-imagem-perfil-icone-masculino-icone-humano-ou-pessoa-sinal-e-simbolo-gratis-vetor.jpg'

  return (
    <Animatable.View animation="fadeInDown" duration={800} style={styles.headerContent}>
      <View style={styles.logoContent}>
        <Animatable.View animation="fadeInLeft" delay={200} style={styles.greeting}>
          <Text size={16} weight="500" color="rgba(255, 255, 255, 0.9)">
            {greetingText}
          </Text>
          <Feather name={iconName} size={22} color={colorIcon} style={{ marginLeft: 8 }} />
        </Animatable.View>
        <Animatable.View animation="fadeInLeft" delay={400} style={styles.personInformations}>
          <Text size={24} weight="700" color="#ffffff">
            {user?.name || 'Usuário'}
          </Text>
          <Text size={14} weight="400" color="rgba(255, 255, 255, 0.8)" style={{ marginTop: 2 }}>
            {user?.roleName === 'admin' ? 'Administrador' : 'Agente de Segurança'}
          </Text>
        </Animatable.View>
      </View>
      <Animatable.View animation="fadeInRight" delay={300} style={styles.profileContent}>
        <TouchableOpacity activeOpacity={0.8}>
          <Image
            source={{ uri: user?.photo ?? userPhotoDefault }}
            style={styles.imageProfile}
          />
          <View style={{
            position: 'absolute',
            bottom: -2,
            right: -2,
            width: 18,
            height: 18,
            backgroundColor: '#4caf50',
            borderRadius: 9,
            borderWidth: 2,
            borderColor: '#ffffff',
          }} />
        </TouchableOpacity>
      </Animatable.View>
    </Animatable.View>
  );
};

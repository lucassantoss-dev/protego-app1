import React from 'react';
import { View, Image } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Text } from '../../components/Text';
import { useGreeting } from '../../hooks/useGreeting';
import { useAuth } from '../../context/AuthContext';
import { styles } from './styles';

export const Header: React.FC = () => {
  const { greetingText, iconName, colorIcon } = useGreeting();
  const { user } = useAuth();

  return (
    <View style={styles.headerContent}>
      <View style={styles.logoContent}>
        <View style={styles.greeting}>
          <Text size={16} weight="500" color="#fff">
            {greetingText}
          </Text>
          <Feather name={iconName} size={20} color={colorIcon} style={{ marginLeft: 5 }} />
        </View>
        <View style={styles.personInformations}>
          <Text size={20} weight="600" color="#fff">
            {user?.name || 'Usuário'}
          </Text>
        </View>
      </View>
      <View style={styles.profileContent}>
        <Image
          source={{ uri: 'https://static.vecteezy.com/ti/vetor-gratis/p1/1840618-imagem-perfil-icone-masculino-icone-humano-ou-pessoa-sinal-e-simbolo-gratis-vetor.jpg' }}
          style={styles.imageProfile}
        />
      </View>
    </View>
  );
};

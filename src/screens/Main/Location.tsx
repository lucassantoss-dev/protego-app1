import React from 'react';
import { View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Text } from '../../components/Text';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { styles } from './styles';

interface LocationProps {
  onChangePress?: () => void;
}

export const Location: React.FC<LocationProps> = ({ onChangePress }) => {
  const { user } = useAuth();
  return (
    <View style={styles.locationContainer}>
      <View style={styles.cityContent}>
        <Feather name="map" size={20} color="#fff" style={{ marginRight: 5 }} />
        <Text size={15} weight="500" color="#fff">
          Fortaleza - CE
        </Text>
      </View>
      {user?.role === 'admin' && (
        <View style={styles.changeButton}>
          <Button onPress={onChangePress || (() => {})} title="Alterar" />
        </View>
      )}
    </View>
  );
};

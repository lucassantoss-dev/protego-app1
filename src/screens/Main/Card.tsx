import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Text } from '../../components/Text';
import { styles } from './styles';

interface CardProps {
  icon: string;
  iconColor?: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}

export const Card: React.FC<CardProps> = ({ icon, iconColor = '#111e31', title, subtitle, onPress }) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <View style={styles.iconContainer}>
        <Feather name={icon as any} size={30} color={iconColor} />
      </View>
      <View style={{ backgroundColor: '#f5f5f5', flex: 1 }}>
        <Text size={16} weight="600" color="#111e31">{title}</Text>
        <Text size={15} weight="400" color="#111e31">{subtitle}</Text>
      </View>
      <TouchableOpacity style={styles.rightIconContainer} onPress={onPress}>
        <Feather name="arrow-right" size={18} color="#f5f5f5" style={{ transform: [{ rotate: '-45deg' }] }} />
      </TouchableOpacity>
    </View>
  </View>
);

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Text } from '../../components/Text';
import { styles } from './styles';

interface CardProps {
  icon: string;
  iconColor?: string;
  gradientColor?: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  icon, 
  iconColor = '#6366f1', 
  gradientColor = '#6366f1',
  title, 
  subtitle, 
  onPress 
}) => (
  <TouchableOpacity 
    activeOpacity={0.7} 
    onPress={onPress}
    style={styles.card}
  >
    {/* Gradient top bar */}
    <View style={[styles.cardGradient, { backgroundColor: gradientColor }]} />
    
    <View style={styles.cardContent}>
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
        <Feather name={icon as any} size={24} color={iconColor} />
      </View>
      
      <View style={styles.cardTextContent}>
        <Text style={styles.cardTitle}>
          {title}
        </Text>
        <Text style={styles.cardSubtitle}>
          {subtitle}
        </Text>
      </View>
      
      <View style={styles.rightIconContainer}>
        <Feather name="arrow-right" size={16} color="#9ca3af" />
      </View>
    </View>
  </TouchableOpacity>
);

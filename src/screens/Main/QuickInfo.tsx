import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

interface QuickInfoProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  subtitle?: string;
  onPress?: () => void;
}

export const QuickInfo: React.FC<QuickInfoProps> = ({ 
  title, 
  value, 
  icon, 
  color, 
  subtitle,
  onPress 
}) => {
  const Component = onPress ? TouchableOpacity : View;
  
  return (
    <Animatable.View 
      animation="bounceIn" 
      duration={800}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        borderLeftWidth: 4,
        borderLeftColor: color,
      }}
    >
      <Component 
        activeOpacity={onPress ? 0.8 : 1}
        onPress={onPress}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <View style={{
          backgroundColor: `${color}20`,
          padding: 12,
          borderRadius: 12,
          marginRight: 16,
        }}>
          <Feather name={icon as any} size={24} color={color} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#2c3e50',
            marginBottom: 4,
          }}>
            {title}
          </Text>
          <Text style={{
            fontSize: 24,
            fontWeight: '800',
            color: color,
            marginBottom: 2,
          }}>
            {value}
          </Text>
          {subtitle && (
            <Text style={{
              fontSize: 12,
              color: '#7f8c8d',
              fontWeight: '500',
            }}>
              {subtitle}
            </Text>
          )}
        </View>
        {onPress && (
          <Feather name="chevron-right" size={20} color="#bdc3c7" />
        )}
      </Component>
    </Animatable.View>
  );
};
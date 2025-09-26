import React, { useState } from 'react';
import { View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Text } from './Text';
import { useNavigation } from '@react-navigation/native';
import { useNotification } from '../context/NotificationContext';

interface NotificationTest {
  id: string;
  title: string;
  body: string;
  screen: string;
  data: any;
  color: string;
  emoji: string;
}

const notificationTests: NotificationTest[] = [
  {
    id: 'security-alert',
    title: 'Alerta de Segurança',
    body: 'Acesso não autorizado detectado no portão principal.',
    screen: 'Notifications',
    data: {
      type: 'security_alert',
      location: 'Portão Principal',
      timestamp: new Date().toISOString(),
      priority: 'high',
      alert_type: 'unauthorized_access'
    },
    color: '#dc2626',
    emoji: '🚨'
  },
  {
    id: 'access-granted',
    title: 'Acesso Autorizado',
    body: 'Lucas Santos teve acesso liberado na recepção.',
    screen: 'Notifications',
    data: {
      type: 'access_granted',
      user: 'Lucas Santos',
      location: 'Recepção',
      timestamp: new Date().toISOString(),
      priority: 'normal',
      alert_type: 'access_success'
    },
    color: '#16a34a',
    emoji: '✅'
  },
  {
    id: 'system-update',
    title: 'Atualização do Sistema',
    body: 'Sistema atualizado com sucesso. Novas funcionalidades disponíveis.',
    screen: 'Profile',
    data: {
      type: 'system_update',
      timestamp: new Date().toISOString(),
      priority: 'normal',
      alert_type: 'system_update'
    },
    color: '#2563eb',
    emoji: '🔄'
  },
  {
    id: 'daily-report',
    title: 'Relatório Diário',
    body: 'Relatório de atividades de hoje está disponível.',
    screen: 'Reports',
    data: {
      type: 'daily_report',
      timestamp: new Date().toISOString(),
      priority: 'normal',
      alert_type: 'report'
    },
    color: '#7c3aed',
    emoji: '📊'
  }
];

export function NotificationRedirectTester() {
  const navigation = useNavigation();
  const { addNotification } = useNotification();
  const [testing, setTesting] = useState<string | null>(null);

  const simulateNotificationRedirect = async (test: NotificationTest) => {
    setTesting(test.id);
    
    try {
      // 1. Adiciona a notificação ao contexto
      addNotification({ data: test.data } as any);

      // 2. Mostra um alert simulando a notificação
      Alert.alert(
        `${test.emoji} ${test.title}`,
        test.body,
        [
          { text: 'Ignorar', style: 'cancel', onPress: () => setTesting(null) },
          { 
            text: 'Abrir App', 
            onPress: () => {
              console.log('🔔 Simulando clique na notificação:', test);
              console.log('📱 Redirecionando para tela:', test.screen);
              
              // Aguarda um pouco para simular o comportamento real
              setTimeout(() => {
                (navigation as any).navigate(test.screen, { 
                  notificationData: test.data 
                });
                setTesting(null);
              }, 500);
            }
          }
        ],
        { cancelable: false }
      );

    } catch (error) {
      console.error('Erro ao simular notificação:', error);
      Alert.alert('Erro', 'Não foi possível simular a notificação');
      setTesting(null);
    }
  };

  return (
    <View style={{
      backgroundColor: '#f8fafc',
      padding: 16,
      borderRadius: 12,
      marginVertical: 16
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16
      }}>
        <Text style={{ fontSize: 20, marginRight: 8 }}>🔔</Text>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#1e3a8a'
        }}>
          Teste de Redirecionamento
        </Text>
      </View>
      
      <Text style={{
        fontSize: 14,
        color: '#64748b',
        marginBottom: 16,
        lineHeight: 20
      }}>
        Teste como as notificações redirecionam para as telas corretas no Expo Go:
      </Text>

      <ScrollView style={{ maxHeight: 300 }}>
        {notificationTests.map((test) => (
          <TouchableOpacity
            key={test.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 12,
              backgroundColor: '#ffffff',
              borderRadius: 8,
              marginBottom: 8,
              borderLeftWidth: 4,
              borderLeftColor: test.color,
              opacity: testing === test.id ? 0.6 : 1
            }}
            onPress={() => simulateNotificationRedirect(test)}
            disabled={testing === test.id}
          >
            <Text style={{ 
              fontSize: 20, 
              marginRight: 12 
            }}>
              {test.emoji}
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: 2
              }}>
                {test.title}
              </Text>
              <Text style={{
                fontSize: 12,
                color: '#64748b',
                marginBottom: 4
              }}>
                {test.body}
              </Text>
              <Text style={{
                fontSize: 11,
                color: test.color,
                fontWeight: '500'
              }}>
                → Vai para: {test.screen}
              </Text>
            </View>
            <Text style={{
              fontSize: 16,
              color: '#94a3b8'
            }}>
              {testing === test.id ? '⏳' : '▶️'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={{
        marginTop: 12,
        padding: 12,
        backgroundColor: '#e0f2fe',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#0284c7'
      }}>
        <Text style={{
          fontSize: 12,
          color: '#0c4a6e',
          textAlign: 'center',
          fontWeight: '500'
        }}>
          💡 Este teste simula perfeitamente o comportamento das notificações!
        </Text>
      </View>
    </View>
  );
}
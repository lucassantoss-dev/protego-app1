const axios = require('axios');

async function sendPushNotification() {
  const token = 'ExponentPushToken[QPGRRcMHkVD-iV64JBgUu2]';
  
  const message = {
    to: token,
    sound: 'default',
    title: '🚨 Alerta de Segurança - Protego',
    body: 'Nova atividade detectada no sistema de reconhecimento facial.',
    data: {
      type: 'security_alert',
      screen: 'Notifications',
      timestamp: new Date().toISOString(),
      priority: 'high',
      alert_type: 'facial_recognition'
    },
    priority: 'high',
    channelId: 'default',
    color: '#1e3a8a', // Cor azul do tema
    badge: 1
  };

  try {
    const response = await axios.post('https://exp.host/--/api/v2/push/send', message, {
      headers: {
        'Accept': 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
    });
    
    console.log('✅ Notificação enviada com sucesso!');
    console.log('Resposta:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('❌ Erro ao enviar notificação:', error.response?.data || error.message);
  }
}

sendPushNotification();
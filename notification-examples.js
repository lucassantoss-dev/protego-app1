const axios = require('axios');

const YOUR_TOKEN = 'ExponentPushToken[QPGRRcMHkVD-iV64JBgUu2]';

// Função para enviar notificação
async function sendNotification(message) {
  try {
    const response = await axios.post('https://exp.host/--/api/v2/push/send', message, {
      headers: {
        'Accept': 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
    });
    
    console.log('✅ Notificação enviada:', message.title);
    console.log('ID da notificação:', response.data.data.id);
    return response.data;
  } catch (error) {
    console.error('❌ Erro:', error.response?.data || error.message);
  }
}

// 1. Notificação de Alerta de Segurança
const securityAlert = {
  to: YOUR_TOKEN,
  sound: 'default',
  title: '🚨 Alerta de Segurança - Protego',
  body: 'Acesso não autorizado detectado no portão principal.',
  data: {
    type: 'security_alert',
    screen: 'Notifications',
    location: 'Portão Principal',
    timestamp: new Date().toISOString(),
    priority: 'high',
    alert_type: 'unauthorized_access'
  },
  priority: 'high',
  channelId: 'security',
  color: '#dc2626', // Vermelho para alertas
  badge: 1
};

// 2. Notificação de Acesso Autorizado
const accessGranted = {
  to: YOUR_TOKEN,
  sound: 'default',
  title: '✅ Acesso Autorizado - Protego',
  body: 'Lucas Santos teve acesso liberado na recepção.',
  data: {
    type: 'access_granted',
    screen: 'Notifications',
    user: 'Lucas Santos',
    location: 'Recepção',
    timestamp: new Date().toISOString(),
    priority: 'normal',
    alert_type: 'access_success'
  },
  priority: 'normal',
  channelId: 'access',
  color: '#16a34a', // Verde para sucessos
  badge: 1
};

// 3. Notificação de Sistema
const systemNotification = {
  to: YOUR_TOKEN,
  sound: 'default',
  title: '🔄 Atualização do Sistema - Protego',
  body: 'Sistema atualizado com sucesso. Novas funcionalidades disponíveis.',
  data: {
    type: 'system_update',
    screen: 'Profile',
    timestamp: new Date().toISOString(),
    priority: 'normal',
    alert_type: 'system_update'
  },
  priority: 'normal',
  channelId: 'system',
  color: '#2563eb', // Azul para sistema
  badge: 1
};

// 4. Notificação de Relatório Diário
const dailyReport = {
  to: YOUR_TOKEN,
  sound: 'default',
  title: '📊 Relatório Diário - Protego',
  body: 'Relatório de atividades de hoje está disponível.',
  data: {
    type: 'daily_report',
    screen: 'Reports',
    timestamp: new Date().toISOString(),
    priority: 'normal',
    alert_type: 'report'
  },
  priority: 'normal',
  channelId: 'reports',
  color: '#7c3aed', // Roxo para relatórios
  badge: 1
};

// Função para testar todas as notificações
async function testAllNotifications() {
  console.log('🚀 Testando diferentes tipos de notificações...\n');
  
  console.log('1. Enviando alerta de segurança...');
  await sendNotification(securityAlert);
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('\n2. Enviando notificação de acesso autorizado...');
  await sendNotification(accessGranted);
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('\n3. Enviando notificação do sistema...');
  await sendNotification(systemNotification);
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('\n4. Enviando relatório diário...');
  await sendNotification(dailyReport);
  
  console.log('\n✅ Todas as notificações foram enviadas!');
  console.log('🔔 Verifique seu dispositivo e teste os redirecionamentos.');
}

// Executar apenas uma notificação específica ou todas
const args = process.argv.slice(2);
if (args[0] === 'security') {
  sendNotification(securityAlert);
} else if (args[0] === 'access') {
  sendNotification(accessGranted);
} else if (args[0] === 'system') {
  sendNotification(systemNotification);
} else if (args[0] === 'report') {
  sendNotification(dailyReport);
} else if (args[0] === 'all') {
  testAllNotifications();
} else {
  console.log('📱 Exemplos de Notificações Protego App\n');
  console.log('Comandos disponíveis:');
  console.log('node notification-examples.js security  - Alerta de segurança');
  console.log('node notification-examples.js access    - Acesso autorizado');
  console.log('node notification-examples.js system    - Notificação do sistema');
  console.log('node notification-examples.js report    - Relatório diário');
  console.log('node notification-examples.js all       - Testar todas');
  console.log('\n🎯 Cada notificação redirecionará para uma tela específica!');
}
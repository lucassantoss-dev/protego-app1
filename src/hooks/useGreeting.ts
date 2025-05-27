import { useMemo } from 'react';

export function useGreeting() {
  const hour = useMemo(() => parseInt(
    new Intl.DateTimeFormat('pt-BR', {
      hour: 'numeric',
      hour12: false,
      timeZone: 'America/Sao_Paulo',
    }).format(new Date())
  ), []);

  let greetingText = 'Boa noite';
  let iconName: 'moon' | 'sun' | 'cloud' = 'moon';
  let colorIcon = '#fff';

  if (hour >= 5 && hour < 12) {
    greetingText = 'Bom dia';
    iconName = 'sun';
    colorIcon = '#f8df00';
  } else if (hour >= 12 && hour < 18) {
    greetingText = 'Boa tarde';
    iconName = 'cloud';
    colorIcon = '#fff';
  }

  return { greetingText, iconName, colorIcon };
}

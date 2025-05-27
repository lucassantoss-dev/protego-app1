import { TextStyle } from 'react-native';

export const colors = {
  primary: '#6200EE',
  secondary: '#03DAC6',
  background: '#FFFFFF',
  text: '#000000',
  error: '#B00020',
  success: '#4CAF50',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#757575',
};

export const metrics = {
  baseSpacing: 8,
  basePadding: 16,
  baseMargin: 16,
  baseRadius: 8,
};

export const fonts: Record<string, TextStyle> = {
  regular: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '400',
  },
  medium: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '500',
  },
  bold: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '700',
  },
}; 
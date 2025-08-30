import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Text } from '../Text';

interface ButtonProps {
    title?: string;
    label?: string;
    onPress: () => void;
    style?: ViewStyle;
    disabled?: boolean;
    textColor?: string;
}

export function Button({ title, label, onPress, style, disabled, textColor = '#fff' }: ButtonProps) {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                style,
                disabled && styles.disabled,
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text size={16} weight="600" color={textColor}>
                {title || label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#111e31',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabled: {
        opacity: 0.5,
    },
});

import React from 'react';
import { Text as RNText, TextStyle, StyleSheet } from 'react-native';

interface TextProps {
    children: React.ReactNode;
    size?: number;
    weight?: '400' | '500' | '600' | '700';
    color?: string;
    style?: TextStyle;
}

export function Text({ 
    children, 
    size = 16, 
    weight = '400', 
    color = '#000',
    style 
}: TextProps) {
    return (
        <RNText 
            style={[
                styles.text,
                { 
                    fontSize: size,
                    color,
                    fontWeight: weight
                },
                style
            ]}
        >
            {children}
        </RNText>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'System',
    }
}); 
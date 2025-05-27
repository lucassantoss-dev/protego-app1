import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/Text';
import * as Animatable from 'react-native-animatable';
import { Button } from '../../components/Button';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../routes';

export function Welcome() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.logoContainer}>
                <Animatable.Image
                    animation="flipInY"
                    source={require('../../assets/images/logo1.jpeg')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.formContainer}>
                <Animatable.View delay={600} animation="fadeInUp">
                    <Text size={24} weight="600" style={{ marginBottom: 12, marginTop: 28 }}>
                        Monitore as notificações das câmeras de segurança posicionadas no evento.
                    </Text>
                    <Text color="#a1a1a1" style={{ marginBottom: 35 }}>
                        Faça login para começar
                    </Text>
                    <Button onPress={() => navigation.navigate('Login')} title="Acessar" />
                </Animatable.View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(6, 15, 27)',
    },
    logoContainer: {
        flex: 1.5,
        backgroundColor: '#111e31',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '80%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    welcomeContainer: {
        marginTop: '8%',
        marginBottom: '3%',
        paddingStart: '5%',
    },
    formContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: '5%',
    },
    formContent: {
        alignItems: 'center',
        flex: 1,
    },
    form: {
        marginTop: 32,
        width: '100%',
    },
    accessButton: {
        width: '100%',
    },
}); 
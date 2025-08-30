import React, { useState } from 'react';
import { Alert, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/Text';
import { Button } from '../../components/Button';
import * as Animatable from 'react-native-animatable';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from '../../routes';
import { styles } from './styles';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../../context/AuthContext';

export function Login() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { login, biometricReAuth, loading } = useAuth();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loadingBiometric, setLoadingBiometric] = useState(false);

    React.useEffect(() => {
        (async () => {
            setLoadingBiometric(true);
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            if (hasHardware && isEnrolled) {
                const result = await LocalAuthentication.authenticateAsync({ promptMessage: 'Autentique-se para entrar' });
                if (result.success) {
                    const success = await biometricReAuth();
                    if (success) {
                        navigation.navigate('App');
                    }
                }
            }
            setLoadingBiometric(false);
        })();
    }, []);

    async function handleLogin() {
        if (!credentials.email || !credentials.password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }
        const success = await login(credentials.email, credentials.password);
        if (success) {
            navigation.navigate('App');
        } else {
            Alert.alert('Erro', 'Usuário ou senha inválidos');
        }
    }

    return (
        <SafeAreaView style={styles.containerView} edges={['top']}>
            <View style={styles.viewContainerLogo}>
                <Animatable.Image
                    animation="flipInY"
                    source={require('../../assets/images/logo-2.png')}
                    style={{ width: '100%', height: '60%', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    resizeMode="contain"
                />
                <Animatable.View animation="fadeInLeft" style={{ marginTop: '8%', marginBottom: '3%', paddingStart: '5%' }}>
                    <Text size={28} weight="600" color="#fff">Bem-vindo(a)</Text>
                </Animatable.View>
            </View>
            <View style={styles.viewContainerForm}>
                <Animatable.View delay={200} animation="fadeInUp" style={{ alignItems: 'center', flex: 1 }}>
                    <View style={styles.modalForm}>
                        <TextInput
                            placeholder="E-mail"
                            placeholderTextColor="#666"
                            onChangeText={(text) => setCredentials({ ...credentials, email: text })}
                            value={credentials.email}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Senha"
                            placeholderTextColor="#666"
                            secureTextEntry
                            onChangeText={(text) => setCredentials({ ...credentials, password: text })}
                            value={credentials.password}
                            style={styles.input}
                        />

                        <Button onPress={handleLogin} title={loading || loadingBiometric ? "Carregando..." : "Entrar"} disabled={loading || loadingBiometric} />
                    </View>
                </Animatable.View>
            </View>
        </SafeAreaView>
    );
}
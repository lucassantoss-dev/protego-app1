import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, SafeAreaView, Alert, TextInput, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import { Text } from '../../components/Text';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import * as LocalAuthentication from 'expo-local-authentication';

export function Security() {
    const { user } = useAuth();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [securitySettings, setSecuritySettings] = useState({
        biometricLogin: true,
        autoLock: true,
        lockTimeout: '5min',
        twoFactorAuth: false,
        sessionTimeout: true,
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const handleChangePassword = () => {
        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            Alert.alert('Erro', 'A nova senha e confirmação não coincidem');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            Alert.alert('Erro', 'A nova senha deve ter pelo menos 6 caracteres');
            return;
        }

        Alert.alert(
            'Alterar Senha',
            'Tem certeza que deseja alterar sua senha?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Alterar', 
                    onPress: () => {
                        Alert.alert('Sucesso', 'Senha alterada com sucesso!');
                        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    }
                }
            ]
        );
    };

    const toggleBiometric = async (value: boolean) => {
        if (value) {
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            
            if (!hasHardware || !isEnrolled) {
                Alert.alert(
                    'Biometria não disponível',
                    'Seu dispositivo não suporta biometria ou não há biometrias cadastradas.'
                );
                return;
            }
        }
        
        setSecuritySettings(prev => ({ ...prev, biometricLogin: value }));
    };

    const PasswordInput = ({ 
        label, 
        value, 
        onChangeText, 
        placeholder, 
        showPassword,
        toggleShow,
        icon 
    }: {
        label: string;
        value: string;
        onChangeText: (text: string) => void;
        placeholder: string;
        showPassword: boolean;
        toggleShow: () => void;
        icon: string;
    }) => (
        <View style={{ marginBottom: 20 }}>
            <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: 8 
            }}>
                {label}
            </Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderWidth: 1,
                borderColor: '#e5e7eb',
            }}>
                <Feather name={icon as any} size={20} color="#6b7280" style={{ marginRight: 12 }} />
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    secureTextEntry={!showPassword}
                    style={{
                        flex: 1,
                        fontSize: 16,
                        color: '#111827',
                    }}
                    placeholderTextColor="#9ca3af"
                />
                <TouchableOpacity onPress={toggleShow}>
                    <Feather 
                        name={showPassword ? "eye-off" : "eye"} 
                        size={20} 
                        color="#6b7280" 
                    />
                </TouchableOpacity>
            </View>
        </View>
    );

    const SecurityOption = ({ 
        icon, 
        title, 
        description, 
        value, 
        onValueChange, 
        type = 'switch' 
    }: {
        icon: string;
        title: string;
        description: string;
        value: boolean | string;
        onValueChange: (value: any) => void;
        type?: 'switch' | 'select';
    }) => (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#f3f4f6',
        }}>
            <View style={{
                backgroundColor: '#f3f4f6',
                padding: 10,
                borderRadius: 12,
                marginRight: 16,
            }}>
                <Feather name={icon as any} size={20} color="#6b7280" />
            </View>
            
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 4 }}>
                    {title}
                </Text>
                <Text style={{ fontSize: 14, color: '#6b7280' }}>
                    {description}
                </Text>
            </View>

            {type === 'switch' ? (
                <Switch
                    value={value as boolean}
                    onValueChange={onValueChange}
                    trackColor={{ false: '#f3f4f6', true: '#3b82f6' }}
                    thumbColor={value ? '#ffffff' : '#ffffff'}
                />
            ) : (
                <TouchableOpacity
                    style={{
                        backgroundColor: '#f3f4f6',
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: '#6b7280', fontSize: 14, marginRight: 4 }}>
                        {value}
                    </Text>
                    <Feather name="chevron-down" size={16} color="#6b7280" />
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <SafeAreaView style={{ 
            flex: 1, 
            backgroundColor: '#f8fafc', 
            paddingTop: Math.max(insets.top, 10) 
        }}>
            {/* Header */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 16,
                backgroundColor: '#ffffff',
                borderBottomWidth: 1,
                borderBottomColor: '#e5e7eb',
            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#f3f4f6',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 16,
                    }}
                >
                    <Feather name="arrow-left" size={20} color="#374151" />
                </TouchableOpacity>
                
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#111827' }}>
                        Segurança
                    </Text>
                    <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 2 }}>
                        Configurações de segurança e privacidade
                    </Text>
                </View>

                <View style={{
                    backgroundColor: '#fef3c7',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Feather name="shield" size={14} color="#d97706" style={{ marginRight: 4 }} />
                    <Text style={{ color: '#d97706', fontSize: 12, fontWeight: '600' }}>
                        Seguro
                    </Text>
                </View>
            </View>

            <ScrollView 
                style={{ flex: 1 }} 
                contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Change Password Section */}
                <Animatable.View animation="fadeInUp" delay={200} style={{
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 24,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 4,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 20,
                    }}>
                        <View style={{
                            backgroundColor: '#fecaca',
                            padding: 8,
                            borderRadius: 12,
                            marginRight: 12,
                        }}>
                            <Feather name="lock" size={20} color="#dc2626" />
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#111827' }}>
                            Alterar Senha
                        </Text>
                    </View>

                    <PasswordInput
                        label="Senha Atual"
                        value={passwordData.currentPassword}
                        onChangeText={(text) => setPasswordData(prev => ({ ...prev, currentPassword: text }))}
                        placeholder="Digite sua senha atual"
                        showPassword={showPasswords.current}
                        toggleShow={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                        icon="lock"
                    />

                    <PasswordInput
                        label="Nova Senha"
                        value={passwordData.newPassword}
                        onChangeText={(text) => setPasswordData(prev => ({ ...prev, newPassword: text }))}
                        placeholder="Digite sua nova senha"
                        showPassword={showPasswords.new}
                        toggleShow={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                        icon="key"
                    />

                    <PasswordInput
                        label="Confirmar Nova Senha"
                        value={passwordData.confirmPassword}
                        onChangeText={(text) => setPasswordData(prev => ({ ...prev, confirmPassword: text }))}
                        placeholder="Confirme sua nova senha"
                        showPassword={showPasswords.confirm}
                        toggleShow={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                        icon="check-circle"
                    />

                    <TouchableOpacity
                        onPress={handleChangePassword}
                        style={{
                            backgroundColor: '#dc2626',
                            paddingVertical: 14,
                            borderRadius: 12,
                            alignItems: 'center',
                            marginTop: 8,
                        }}
                    >
                        <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '600' }}>
                            Alterar Senha
                        </Text>
                    </TouchableOpacity>
                </Animatable.View>

                {/* Security Settings */}
                <Animatable.View animation="fadeInUp" delay={400} style={{
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 24,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 4,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 20,
                    }}>
                        <View style={{
                            backgroundColor: '#dbeafe',
                            padding: 8,
                            borderRadius: 12,
                            marginRight: 12,
                        }}>
                            <Feather name="settings" size={20} color="#3b82f6" />
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#111827' }}>
                            Configurações de Segurança
                        </Text>
                    </View>

                    <SecurityOption
                        icon="fingerprint"
                        title="Login Biométrico"
                        description="Use digital ou Face ID para fazer login"
                        value={securitySettings.biometricLogin}
                        onValueChange={toggleBiometric}
                    />

                    <SecurityOption
                        icon="smartphone"
                        title="Bloqueio Automático"
                        description="Bloquear app após inatividade"
                        value={securitySettings.autoLock}
                        onValueChange={(value) => setSecuritySettings(prev => ({ ...prev, autoLock: value }))}
                    />

                    <SecurityOption
                        icon="clock"
                        title="Tempo para Bloqueio"
                        description="Tempo até bloquear automaticamente"
                        value={securitySettings.lockTimeout}
                        onValueChange={(value) => setSecuritySettings(prev => ({ ...prev, lockTimeout: value }))}
                        type="select"
                    />

                    <SecurityOption
                        icon="shield"
                        title="Autenticação de Dois Fatores"
                        description="Camada extra de segurança"
                        value={securitySettings.twoFactorAuth}
                        onValueChange={(value) => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: value }))}
                    />

                    <SecurityOption
                        icon="log-out"
                        title="Timeout de Sessão"
                        description="Deslogar automaticamente após inatividade"
                        value={securitySettings.sessionTimeout}
                        onValueChange={(value) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: value }))}
                    />
                </Animatable.View>

                {/* Emergency Actions */}
                <Animatable.View animation="fadeInUp" delay={600} style={{
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    padding: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 4,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 20,
                    }}>
                        <View style={{
                            backgroundColor: '#fef3c7',
                            padding: 8,
                            borderRadius: 12,
                            marginRight: 12,
                        }}>
                            <Feather name="alert-triangle" size={20} color="#d97706" />
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#111827' }}>
                            Ações de Emergência
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={{
                            backgroundColor: '#fef3c7',
                            paddingVertical: 14,
                            paddingHorizontal: 16,
                            borderRadius: 12,
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 12,
                        }}
                    >
                        <Feather name="smartphone" size={20} color="#d97706" style={{ marginRight: 12 }} />
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#92400e' }}>
                                Deslogar Outros Dispositivos
                            </Text>
                            <Text style={{ fontSize: 14, color: '#a16207', marginTop: 2 }}>
                                Encerrar sessões em outros dispositivos
                            </Text>
                        </View>
                        <Feather name="chevron-right" size={20} color="#d97706" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: '#fee2e2',
                            paddingVertical: 14,
                            paddingHorizontal: 16,
                            borderRadius: 12,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Feather name="trash-2" size={20} color="#dc2626" style={{ marginRight: 12 }} />
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#991b1b' }}>
                                Limpar Dados do App
                            </Text>
                            <Text style={{ fontSize: 14, color: '#b91c1c', marginTop: 2 }}>
                                Remover todos os dados armazenados
                            </Text>
                        </View>
                        <Feather name="chevron-right" size={20} color="#dc2626" />
                    </TouchableOpacity>
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
}
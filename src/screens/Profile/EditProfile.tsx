import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, SafeAreaView, Alert, TextInput, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import { Text } from '../../components/Text';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export function EditProfile() {
    const { user } = useAuth();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        department: '',
        badge: '',
    });
    
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        Alert.alert(
            'Salvar Alterações',
            'Deseja salvar as alterações feitas no perfil?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Salvar', 
                    onPress: () => {
                        setIsEditing(false);
                        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
                    }
                }
            ]
        );
    };

    const InputField = ({ 
        label, 
        value, 
        onChangeText, 
        placeholder, 
        editable = true,
        icon 
    }: {
        label: string;
        value: string;
        onChangeText: (text: string) => void;
        placeholder: string;
        editable?: boolean;
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
                backgroundColor: editable && isEditing ? '#ffffff' : '#f9fafb',
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderWidth: 1,
                borderColor: editable && isEditing ? '#3b82f6' : '#e5e7eb',
            }}>
                <Feather name={icon as any} size={20} color="#6b7280" style={{ marginRight: 12 }} />
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    editable={editable && isEditing}
                    style={{
                        flex: 1,
                        fontSize: 16,
                        color: '#111827',
                    }}
                    placeholderTextColor="#9ca3af"
                />
            </View>
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
                        Editar Perfil
                    </Text>
                    <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 2 }}>
                        Altere suas informações pessoais
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        if (isEditing) {
                            handleSave();
                        } else {
                            setIsEditing(true);
                        }
                    }}
                    style={{
                        backgroundColor: isEditing ? '#10b981' : '#3b82f6',
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Feather 
                        name={isEditing ? "check" : "edit-2"} 
                        size={16} 
                        color="#ffffff" 
                        style={{ marginRight: 6 }}
                    />
                    <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '600' }}>
                        {isEditing ? 'Salvar' : 'Editar'}
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView 
                style={{ flex: 1 }} 
                contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Profile Photo Section */}
                <Animatable.View animation="fadeInUp" delay={200} style={{
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    padding: 24,
                    marginBottom: 24,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 4,
                }}>
                    <View style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        backgroundColor: '#3b82f6',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 16,
                    }}>
                        {user?.photo ? (
                            <Image 
                                source={{ uri: user.photo }} 
                                style={{ width: 100, height: 100, borderRadius: 50 }}
                            />
                        ) : (
                            <Text style={{ 
                                fontSize: 36, 
                                fontWeight: 'bold', 
                                color: '#ffffff' 
                            }}>
                                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                            </Text>
                        )}
                    </View>
                    
                    {isEditing && (
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#f3f4f6',
                                paddingHorizontal: 16,
                                paddingVertical: 8,
                                borderRadius: 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Feather name="camera" size={16} color="#6b7280" style={{ marginRight: 6 }} />
                            <Text style={{ color: '#6b7280', fontSize: 14, fontWeight: '500' }}>
                                Alterar Foto
                            </Text>
                        </TouchableOpacity>
                    )}
                </Animatable.View>

                {/* Personal Information */}
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
                            <Feather name="user" size={20} color="#3b82f6" />
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#111827' }}>
                            Informações Pessoais
                        </Text>
                    </View>

                    <InputField
                        label="Nome Completo"
                        value={formData.name}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                        placeholder="Digite seu nome completo"
                        icon="user"
                    />

                    <InputField
                        label="E-mail"
                        value={formData.email}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                        placeholder="Digite seu e-mail"
                        icon="mail"
                        editable={false}
                    />

                    <InputField
                        label="Telefone"
                        value={formData.phone}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
                        placeholder="Digite seu telefone"
                        icon="phone"
                    />
                </Animatable.View>

                {/* Professional Information */}
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
                            backgroundColor: '#f3e8ff',
                            padding: 8,
                            borderRadius: 12,
                            marginRight: 12,
                        }}>
                            <Feather name="briefcase" size={20} color="#8b5cf6" />
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#111827' }}>
                            Informações Profissionais
                        </Text>
                    </View>

                    <InputField
                        label="Departamento"
                        value={formData.department}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, department: text }))}
                        placeholder="Digite seu departamento"
                        icon="briefcase"
                    />

                    <InputField
                        label="Número do Crachá"
                        value={formData.badge}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, badge: text }))}
                        placeholder="Digite o número do crachá"
                        icon="credit-card"
                    />
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
}
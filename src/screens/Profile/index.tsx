import React from 'react';
import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '../../components/Text';
import { styles } from './styles';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export function Profile() {
    const { user, logout } = useAuth();
    const navigation = useNavigation();

    return (
        <View style={[styles.container, { backgroundColor: '#fff' }]}>
            <View style={[styles.header, { backgroundColor: '#111e31', borderTopLeftRadius: 0, borderTopRightRadius: 0 }]}>
                <Text size={24} weight="600" color="#fff">
                    Perfil
                </Text>
            </View>
            <ScrollView style={styles.content}>
                <View style={styles.profileCard}>
                    <Image
                        source={{ uri: 'https://static.vecteezy.com/ti/vetor-gratis/p1/1840618-imagem-perfil-icone-masculino-icone-humano-ou-pessoa-sinal-e-simbolo-gratis-vetor.jpg' }}
                        style={styles.profileImage}
                    />
                    <Text size={20} weight="600" color="#111e31" style={styles.name}>
                        {user?.name || 'Usuário'}
                    </Text>
                    <Text size={16} weight="400" color="#8E8E93" style={styles.role}>
                        {user?.role || 'Usuário'}
                    </Text>
                </View>
                <View style={styles.infoCard}>
                    <Text size={18} weight="600" color="#111e31" style={styles.sectionTitle}>
                        Informações Pessoais
                    </Text>
                    <View style={styles.infoItem}>
                        <Text size={16} weight="500" color="#111e31">Email</Text>
                        <Text size={16} weight="400" color="#8E8E93">{user?.email || 'Não informado'}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text size={16} weight="500" color="#111e31">Organização</Text>
                        <Text size={16} weight="400" color="#8E8E93">{user?.organizationId || 'Não informado'}</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={{ padding: 20, backgroundColor: '#fff' }}>
                <TouchableOpacity
                    style={{ backgroundColor: '#111e31', borderRadius: 8, paddingVertical: 14, alignItems: 'center' }}
                    onPress={logout}
                >
                    <Text size={16} weight="600" color="#fff">Desconectar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
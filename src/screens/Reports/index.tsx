import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/Text';
import * as Animatable from 'react-native-animatable';
import Feather from '@expo/vector-icons/Feather';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/app.routes';

// Dados mockados para relatórios
const MOCK_SALES_DATA = {
    totalVendas: 15680.50,
    ticketMedio: 78.40,
    vendasPorDia: [
        { dia: 'Segunda', valor: 2450.80 },
        { dia: 'Terça', valor: 3120.40 },
        { dia: 'Quarta', valor: 2890.30 },
        { dia: 'Quinta', valor: 3560.20 },
        { dia: 'Sexta', valor: 3658.80 },
    ],
    produtosMaisVendidos: [
        { nome: 'X-Burger', quantidade: 156, valor: 4034.40 },
        { nome: 'Batata Frita', quantidade: 245, valor: 3895.50 },
        { nome: 'Coca-Cola 350ml', quantidade: 312, valor: 2152.80 },
        { nome: 'Pizza Margherita', quantidade: 89, valor: 4085.10 },
        { nome: 'Combo Família', quantidade: 45, valor: 4005.50 },
    ]
};

const MOCK_STOCK_DATA = {
    produtosBaixoEstoque: [
        { nome: 'Coca-Cola 350ml', quantidade: 5, minimo: 20 },
        { nome: 'Batata Frita', quantidade: 8, minimo: 15 },
        { nome: 'Queijo', quantidade: 3, minimo: 10 },
    ],
    produtosMaisVendidos: [
        { nome: 'X-Burger', quantidade: 156, valor: 4034.40 },
        { nome: 'Batata Frita', quantidade: 245, valor: 3895.50 },
        { nome: 'Coca-Cola 350ml', quantidade: 312, valor: 2152.80 },
    ],
    valorTotalEstoque: 25680.50
};

type ReportsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Reports'>;

export default function Reports() {
    const navigation = useNavigation<ReportsScreenNavigationProp>();
    const [selectedReport, setSelectedReport] = useState<'vendas' | 'estoque' | null>(null);
    const [showReportModal, setShowReportModal] = useState(false);

    const formatCurrency = (value: number) => {
        return `R$ ${value.toFixed(2)}`;
    };

    const renderSalesReport = () => (
        <View style={styles.reportContent}>
            <View style={styles.reportSection}>
                <Text size={18} weight="600" color="#000">Resumo de Vendas</Text>
                <View style={styles.summaryCard}>
                    <View style={styles.summaryItem}>
                        <Text size={14} weight="500" color="#636262">Total de Vendas</Text>
                        <Text size={20} weight="600" color="#000">{formatCurrency(MOCK_SALES_DATA.totalVendas)}</Text>
                    </View>
                    <View style={styles.summaryItem}>
                        <Text size={14} weight="500" color="#636262">Ticket Médio</Text>
                        <Text size={20} weight="600" color="#000">{formatCurrency(MOCK_SALES_DATA.ticketMedio)}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.reportSection}>
                <Text size={18} weight="600" color="#000">Vendas por Dia</Text>
                {MOCK_SALES_DATA.vendasPorDia.map((venda, index) => (
                    <View key={index} style={styles.listItem}>
                        <Text size={14} weight="500" color="#000">{venda.dia}</Text>
                        <Text size={14} weight="600" color="#000">{formatCurrency(venda.valor)}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.reportSection}>
                <Text size={18} weight="600" color="#000">Produtos Mais Vendidos</Text>
                {MOCK_SALES_DATA.produtosMaisVendidos.map((produto, index) => (
                    <View key={index} style={styles.listItem}>
                        <View>
                            <Text size={14} weight="500" color="#000">{produto.nome}</Text>
                            <Text size={12} weight="400" color="#636262">{produto.quantidade} unidades</Text>
                        </View>
                        <Text size={14} weight="600" color="#000">{formatCurrency(produto.valor)}</Text>
                    </View>
                ))}
            </View>
        </View>
    );

    const renderStockReport = () => (
        <View style={styles.reportContent}>
            <View style={styles.reportSection}>
                <Text size={18} weight="600" color="#000">Produtos com Estoque Baixo</Text>
                {MOCK_STOCK_DATA.produtosBaixoEstoque.map((produto, index) => (
                    <View key={index} style={styles.listItem}>
                        <View>
                            <Text size={14} weight="500" color="#000">{produto.nome}</Text>
                            <Text size={12} weight="400" color="#636262">
                                {produto.quantidade} unidades (Mínimo: {produto.minimo})
                            </Text>
                        </View>
                        <View style={[styles.statusBadge, { backgroundColor: '#FF3B30' }]}>
                            <Text size={12} weight="500" color="#fff">Baixo</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.reportSection}>
                <Text size={18} weight="600" color="#000">Valor Total em Estoque</Text>
                <View style={styles.summaryCard}>
                    <Text size={24} weight="600" color="#000">{formatCurrency(MOCK_STOCK_DATA.valorTotalEstoque)}</Text>
                </View>
            </View>

            <View style={styles.reportSection}>
                <Text size={18} weight="600" color="#000">Produtos Mais Vendidos</Text>
                {MOCK_STOCK_DATA.produtosMaisVendidos.map((produto, index) => (
                    <View key={index} style={styles.listItem}>
                        <View>
                            <Text size={14} weight="500" color="#000">{produto.nome}</Text>
                            <Text size={12} weight="400" color="#636262">{produto.quantidade} unidades</Text>
                        </View>
                        <Text size={14} weight="600" color="#000">{formatCurrency(produto.valor)}</Text>
                    </View>
                ))}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <View style={styles.header}>
                <Animatable.View
                    animation="fadeInLeft"
                    style={styles.headerContent}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Main')}
                        style={styles.backButton}
                    >
                        <Feather name="arrow-left" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <Text size={24} weight="600" color="#fff">Relatórios</Text>
                        <Text size={16} weight="400" color="#fff" style={styles.subtitle}>
                            Análise de dados
                        </Text>
                    </View>
                </Animatable.View>
            </View>

            <View style={styles.content}>
                <View style={styles.reportTypes}>
                    <TouchableOpacity
                        style={[styles.reportType, selectedReport === 'vendas' && styles.selectedReportType]}
                        onPress={() => {
                            setSelectedReport('vendas');
                            setShowReportModal(true);
                        }}
                    >
                        <Feather name="trending-up" size={24} color={selectedReport === 'vendas' ? '#007AFF' : '#636262'} />
                        <Text
                            size={16}
                            weight="600"
                            color={selectedReport === 'vendas' ? '#007AFF' : '#636262'}
                        >
                            Relatório de Vendas
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.reportType, selectedReport === 'estoque' && styles.selectedReportType]}
                        onPress={() => {
                            setSelectedReport('estoque');
                            setShowReportModal(true);
                        }}
                    >
                        <Feather name="package" size={24} color={selectedReport === 'estoque' ? '#007AFF' : '#636262'} />
                        <Text
                            size={16}
                            weight="600"
                            color={selectedReport === 'estoque' ? '#007AFF' : '#636262'}
                        >
                            Relatório de Estoque
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                visible={showReportModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowReportModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text size={20} weight="600" color="#000">
                                {selectedReport === 'vendas' ? 'Relatório de Vendas' : 'Relatório de Estoque'}
                            </Text>
                            <TouchableOpacity
                                onPress={() => setShowReportModal(false)}
                                style={styles.closeButton}
                            >
                                <Feather name="x" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalBody}>
                            {selectedReport === 'vendas' ? renderSalesReport() : renderStockReport()}
                        </ScrollView>

                        <View style={styles.modalActions}>
                            <Button
                                label="Exportar PDF"
                                onPress={() => {
                                    // Implementar exportação para PDF
                                    Alert.alert('Sucesso', 'Relatório exportado com sucesso!');
                                }}
                                style={styles.exportButton}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(6, 15, 27)',
    },
    header: {
        backgroundColor: '#111e31',
        paddingVertical: 20,
    },
    headerContent: {
        paddingHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 16,
    },
    titleContainer: {
        flex: 1,
        gap: 4,
    },
    subtitle: {
        opacity: 0.8,
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: '5%',
        paddingTop: 20,
    },
    reportTypes: {
        gap: 16,
    },
    reportType: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
    },
    selectedReportType: {
        backgroundColor: '#e3f2fd',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        maxHeight: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    closeButton: {
        padding: 4,
    },
    modalBody: {
        maxHeight: '70%',
    },
    modalActions: {
        marginTop: 20,
    },
    reportContent: {
        gap: 24,
    },
    reportSection: {
        gap: 12,
    },
    summaryCard: {
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    summaryItem: {
        gap: 4,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    exportButton: {
        backgroundColor: '#007AFF',
    },
}); 
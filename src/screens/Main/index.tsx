import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  Image,
  Text,
  FlatList,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import { CenteredContainer } from "./styles";
import { useNotification } from "../../context/NotificationContext";
import { useAuth } from "../../context/AuthContext";
import { Header } from "./Header";
import { Location } from "./Location";
import { styles } from "./styles";
import * as Animatable from 'react-native-animatable';
import { RootStackParamList } from '../../routes/app.routes';

export default function Main() {
  const { loading } = useAuth();
  const { notifications } = useNotification();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isOnline = true;
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 400;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafb" }}>
      {loading && (
        <View style={CenteredContainer.container}>
          <ActivityIndicator color="#1a237e" size="large" />
        </View>
      )}
      {!loading && (
        <>
          <View style={styles.viewContainerLogo}>
            {!isSmallScreen && (
              <Image
                source={require("../../assets/images/logo-2.png")}
                style={styles.logoImage}
              />
            )}
            <Header small={isSmallScreen} />
            {!isSmallScreen && <Location />}
          </View>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.homeContainerContent}>
              {/* Latest Recognition Section */}
              <View style={{ marginBottom: 24 }}>
                <Animatable.View animation="fadeInLeft" delay={200}>
                  <View style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    marginBottom: 20
                  }}>
                    <View style={{
                      backgroundColor: '#3b82f6',
                      padding: 8,
                      borderRadius: 12,
                      marginRight: 12,
                    }}>
                      <Feather name="user-check" size={20} color="#ffffff" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ 
                        fontSize: 20, 
                        fontWeight: "700", 
                        color: "#1f2937"
                      }}>
                        Último Reconhecimento
                      </Text>
                      <Text style={{
                        fontSize: 14,
                        color: '#6b7280',
                        marginTop: 2
                      }}>
                        Identificação mais recente do sistema
                      </Text>
                    </View>
                    <View style={{
                      backgroundColor: notifications.length > 0 ? '#dcfce7' : '#fef3c7',
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 16,
                    }}>
                      <Text style={{
                        fontSize: 12,
                        color: notifications.length > 0 ? '#16a34a' : '#d97706',
                        fontWeight: '600'
                      }}>
                        {notifications.length > 0 ? `${notifications.length} hoje` : 'Nenhum'}
                      </Text>
                    </View>
                  </View>
                </Animatable.View>

                <Animatable.View animation="fadeInUp" delay={400}>
                  <FlatList
                    data={
                      notifications.length > 0
                        ? [...notifications]
                            .sort((a, b) => {
                              const dateA = new Date(a.data?.DateTime || 0).getTime();
                              const dateB = new Date(b.data?.DateTime || 0).getTime();
                              return dateB - dateA;
                            })
                            .slice(0, 1)
                        : []
                    }
                    keyExtractor={(item) => item.data?._id}
                    renderItem={({ item }) => {
                      const status = item.data?.Status || "-";
                      const isSuccess = status.toLowerCase() === "success";
                      const statusColor = isSuccess ? "#10b981" : "#ef4444";
                      const nome = item.data?.UserName || "Pessoa não identificada";
                      const local = item.data?.AccessType || "Entrada principal";
                      const foto = 'https://via.placeholder.com/60x60/e5e7eb/9ca3af?text=' + (nome.charAt(0) || '?');
                      const dt = item.data?.DateTime;
                      const dataFormatada = dt
                        ? new Date(dt).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          })
                        : "Data não disponível";
                      const horaFormatada = dt
                        ? new Date(dt).toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })
                        : "--:--";

                      return (
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#ffffff',
                            borderRadius: 16,
                            padding: 20,
                            marginBottom: 12,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.08,
                            shadowRadius: 12,
                            elevation: 6,
                            borderLeftWidth: 4,
                            borderLeftColor: statusColor,
                          }}
                          activeOpacity={0.8}
                          onPress={() => navigation.navigate('Notifications')}
                        >
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {/* Foto da pessoa */}
                            <View style={{ 
                              marginRight: 16,
                              position: 'relative'
                            }}>
                              <Image
                                source={{ uri: foto }}
                                style={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: 30,
                                  backgroundColor: '#f3f4f6',
                                }}
                                defaultSource={{ uri: 'https://via.placeholder.com/60x60/e5e7eb/9ca3af?text=?' }}
                              />
                              {/* Status indicator */}
                              <View style={{
                                position: 'absolute',
                                bottom: -2,
                                right: -2,
                                width: 20,
                                height: 20,
                                borderRadius: 10,
                                backgroundColor: statusColor,
                                borderWidth: 3,
                                borderColor: '#ffffff',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                                <Feather 
                                  name={isSuccess ? "check" : "x"} 
                                  size={10} 
                                  color="#ffffff" 
                                />
                              </View>
                            </View>

                            {/* Informações principais */}
                            <View style={{ flex: 1 }}>
                              <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 8,
                              }}>
                                <Text style={{
                                  fontSize: 18,
                                  fontWeight: '700',
                                  color: '#1f2937',
                                  flex: 1,
                                }}>
                                  {nome}
                                </Text>
                                <View style={{
                                  backgroundColor: isSuccess ? '#dcfce7' : '#fee2e2',
                                  paddingHorizontal: 8,
                                  paddingVertical: 4,
                                  borderRadius: 8,
                                }}>
                                  <Text style={{
                                    fontSize: 11,
                                    fontWeight: '600',
                                    color: statusColor,
                                  }}>
                                    {isSuccess ? 'AUTORIZADO' : 'BLOQUEADO'}
                                  </Text>
                                </View>
                              </View>

                              {/* Local */}
                              <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 8,
                              }}>
                                <Feather name="map-pin" size={14} color="#6b7280" />
                                <Text style={{
                                  fontSize: 14,
                                  color: '#6b7280',
                                  marginLeft: 6,
                                  flex: 1,
                                }}>
                                  {local}
                                </Text>
                              </View>

                              {/* Data e hora */}
                              <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                                <Feather name="clock" size={14} color="#6b7280" />
                                <Text style={{
                                  fontSize: 14,
                                  color: '#6b7280',
                                  marginLeft: 6,
                                }}>
                                  {dataFormatada} às {horaFormatada}
                                </Text>
                              </View>
                            </View>

                            {/* Seta para mais detalhes */}
                            <View style={{
                              marginLeft: 12,
                            }}>
                              <Feather name="chevron-right" size={20} color="#9ca3af" />
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                    ListEmptyComponent={
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#ffffff',
                          borderRadius: 16,
                          padding: 24,
                          alignItems: 'center',
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.05,
                          shadowRadius: 8,
                          elevation: 3,
                          borderWidth: 2,
                          borderColor: '#f3f4f6',
                          borderStyle: 'dashed',
                        }}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Notifications')}
                      >
                        <View style={{
                          backgroundColor: '#f3f4f6',
                          padding: 16,
                          borderRadius: 20,
                          marginBottom: 16,
                        }}>
                          <Feather name="user-x" size={32} color="#9ca3af" />
                        </View>
                        <Text style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#6b7280',
                          marginBottom: 8,
                        }}>
                          Nenhum reconhecimento hoje
                        </Text>
                        <Text style={{
                          fontSize: 14,
                          color: '#9ca3af',
                          textAlign: 'center',
                          lineHeight: 20,
                        }}>
                          Quando uma pessoa for identificada pelo sistema,{'\n'}
                          as informações aparecerão aqui
                        </Text>
                      </TouchableOpacity>
                    }
                    scrollEnabled={false}
                  />
                </Animatable.View>
              </View>
              
              {/* Smart Dashboard Panel */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{ 
                  fontSize: 20, 
                  fontWeight: "700", 
                  color: "#2c3e50",
                  marginBottom: 16 
                }}>
                  🚨 Painel de Controle
                </Text>
                
                {/* Emergency Alert Button */}
                <Animatable.View animation="fadeInUp" delay={600}>
                  <TouchableOpacity 
                    style={{
                      backgroundColor: '#ef4444',
                      borderRadius: 16,
                      padding: 20,
                      marginBottom: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                      shadowColor: '#ef4444',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      elevation: 8,
                    }}
                    activeOpacity={0.8}
                  >
                    <View style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      padding: 12,
                      borderRadius: 12,
                      marginRight: 16,
                    }}>
                      <Feather name="alert-triangle" size={24} color="#ffffff" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{
                        color: '#ffffff',
                        fontSize: 18,
                        fontWeight: '700',
                        marginBottom: 4,
                      }}>
                        Alerta de Emergência
                      </Text>
                      <Text style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: 14,
                      }}>
                        Acionar quando identificar situação crítica
                      </Text>
                    </View>
                    <Feather name="chevron-right" size={20} color="#ffffff" />
                  </TouchableOpacity>
                </Animatable.View>

                {/* Recognition Status Grid */}
                <Animatable.View animation="fadeInUp" delay={700}>
                  <View style={{
                    flexDirection: 'row',
                    marginBottom: 16,
                  }}>
                    <View style={{
                      flex: 1,
                      backgroundColor: '#ffffff',
                      borderRadius: 12,
                      padding: 16,
                      marginRight: 8,
                      alignItems: 'center',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 3,
                    }}>
                      <View style={{
                        backgroundColor: '#dbeafe',
                        padding: 12,
                        borderRadius: 12,
                        marginBottom: 12,
                      }}>
                        <Feather name="eye" size={24} color="#3b82f6" />
                      </View>
                      <Text style={{
                        fontSize: 24,
                        fontWeight: '800',
                        color: '#3b82f6',
                        marginBottom: 4,
                      }}>
                        {notifications.filter(n => n.data?.Status?.toLowerCase() === 'success').length.toString()}
                      </Text>
                      <Text style={{
                        fontSize: 12,
                        color: '#6b7280',
                        textAlign: 'center',
                        fontWeight: '600',
                      }}>
                        Reconhecidos Hoje
                      </Text>
                    </View>

                    <View style={{
                      flex: 1,
                      backgroundColor: '#ffffff',
                      borderRadius: 12,
                      padding: 16,
                      marginLeft: 8,
                      alignItems: 'center',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 3,
                    }}>
                      <View style={{
                        backgroundColor: '#fef3c7',
                        padding: 12,
                        borderRadius: 12,
                        marginBottom: 12,
                      }}>
                        <Feather name="clock" size={24} color="#f59e0b" />
                      </View>
                      <Text style={{
                        fontSize: 24,
                        fontWeight: '800',
                        color: '#f59e0b',
                        marginBottom: 4,
                      }}>
                        {notifications.filter(n => n.data?.Status?.toLowerCase() !== 'success').length.toString()}
                      </Text>
                      <Text style={{
                        fontSize: 12,
                        color: '#6b7280',
                        textAlign: 'center',
                        fontWeight: '600',
                      }}>
                        Pendentes
                      </Text>
                    </View>
                  </View>
                </Animatable.View>

                {/* Quick Access to Notifications */}
                <Animatable.View animation="fadeInUp" delay={800}>
                  <TouchableOpacity 
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: 12,
                      padding: 16,
                      marginBottom: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderLeftWidth: 4,
                      borderLeftColor: '#6366f1',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 3,
                    }}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('Notifications')}
                  >
                    <View style={{
                      backgroundColor: '#ede9fe',
                      padding: 12,
                      borderRadius: 12,
                      marginRight: 16,
                    }}>
                      <Feather name="bell" size={20} color="#6366f1" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: 4,
                      }}>
                        Ver Todas as Notificações
                      </Text>
                      <Text style={{
                        fontSize: 14,
                        color: '#6b7280',
                      }}>
                        {notifications.length.toString()} notificações no total
                      </Text>
                    </View>
                    <View style={{
                      backgroundColor: '#ef4444',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 12,
                      marginRight: 8,
                    }}>
                      <Text style={{
                        color: '#ffffff',
                        fontSize: 12,
                        fontWeight: '600',
                      }}>
                        {notifications.filter(n => n.data?.Status?.toLowerCase() !== 'success').length.toString()}
                      </Text>
                    </View>
                    <Feather name="chevron-right" size={16} color="#9ca3af" />
                  </TouchableOpacity>
                </Animatable.View>
              </View>
              {!isSmallScreen && (
                <Animatable.View animation="fadeInUp" delay={1200} style={styles.statisticsCard}>
                  <View style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    marginBottom: 16 
                  }}>
                    <Text
                      style={{ 
                        fontSize: 20, 
                        fontWeight: "700", 
                        color: "#2c3e50",
                        flex: 1
                      }}
                    >
                      📊 Estatísticas do Dia
                    </Text>
                    <View style={{
                      backgroundColor: '#e8f5e8',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 8,
                    }}>
                      <Text style={{
                        fontSize: 12,
                        color: '#2e7d32',
                        fontWeight: '600'
                      }}>
                        Hoje
                      </Text>
                    </View>
                  </View>
                  <View style={styles.statisticsRow}>
                    <View style={styles.statisticsItem}>
                      <Text
                        style={{
                          fontSize: 32,
                          fontWeight: "800",
                          color: "#1976d2",
                          marginBottom: 4,
                        }}
                      >
                        5
                      </Text>
                      <Text style={{ 
                        color: "#7f8c8d", 
                        fontSize: 14,
                        fontWeight: "600",
                        textAlign: "center"
                      }}>
                        Reconhecimentos
                      </Text>
                    </View>
                    <View style={styles.statisticsItem}>
                      <Text
                        style={{
                          fontSize: 32,
                          fontWeight: "800",
                          color: "#e91e63",
                          marginBottom: 4,
                        }}
                      >
                        2
                      </Text>
                      <Text style={{ 
                        color: "#7f8c8d", 
                        fontSize: 14,
                        fontWeight: "600",
                        textAlign: "center"
                      }}>
                        Alertas
                      </Text>
                    </View>
                    <View style={styles.statisticsItem}>
                      <Text
                        style={{
                          fontSize: 32,
                          fontWeight: "800",
                          color: "#4caf50",
                          marginBottom: 4,
                        }}
                      >
                        3h
                      </Text>
                      <Text style={{ 
                        color: "#7f8c8d", 
                        fontSize: 14,
                        fontWeight: "600",
                        textAlign: "center"
                      }}>
                        Online
                      </Text>
                    </View>
                  </View>
                </Animatable.View>
              )}
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

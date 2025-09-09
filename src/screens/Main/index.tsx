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
} from "react-native";
import { CenteredContainer } from "./styles";
import { useNotification } from "../../context/NotificationContext";
import { useAuth } from "../../context/AuthContext";
import { Header } from "./Header";
import { Location } from "./Location";
import { CardsList } from "./CardsList";
import { styles } from "./styles";

export default function Main() {
  const { loading } = useAuth();
  const { notifications } = useNotification();
  const isOnline = true;
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 400;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {loading && (
        <View style={CenteredContainer.container}>
          <ActivityIndicator color="#111e31" size="large" />
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
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            <View style={[styles.homeContainerContent, { flex: 1 }]}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: isOnline ? "#4caf50" : "#f44336",
                    marginRight: 6,
                  }}
                />
                <Text
                  style={{ fontSize: 14, color: "#555", fontWeight: "600" }}
                >
                  {isOnline ? "Online" : "Offline"}
                </Text>
              </View>
              <View style={{ marginBottom: 16 }}>
                <Text
                  style={{ fontSize: 14, fontWeight: "600", marginBottom: 4 }}
                >
                  Última Notificação
                </Text>
                <FlatList
                  data={
                    notifications.length > 0
                      ? [...notifications]
                          .sort((a, b) => {
                            const dateA = new Date(
                              a.data?.DateTime || 0
                            ).getTime();
                            const dateB = new Date(
                              b.data?.DateTime || 0
                            ).getTime();
                            return dateB - dateA;
                          })
                          .slice(0, 1) // Só a mais recente
                      : []
                  }
                  keyExtractor={(item) => item.data?._id}
                  renderItem={({ item }) => {
                    const status = item.data?.Status || "-";
                    const isAttended = status.toLowerCase() === "success";
                    const statusColor = isAttended ? "#4caf50" : "#f44336";
                    const nome =
                      item.data?.UserName || "Sem nome";
                    const dt = item.data?.DateTime;
                    const dataFormatada = dt
                      ? new Date(dt).toLocaleDateString("pt-BR")
                      : "--/--/----";
                    const horaFormatada = dt
                      ? new Date(dt).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })
                      : "--:--";

                    return (
                      <View
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: 8,
                          padding: 10,
                          marginBottom: 8,
                          elevation: 1,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <View
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: 5,
                              backgroundColor: statusColor,
                              marginRight: 8,
                            }}
                          />
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 15,
                              marginBottom: 2,
                              color: statusColor,
                            }}
                          >
                            {isAttended ? "Atendida" : "Pendente"}
                          </Text>
                          <View style={{ marginLeft: 10 }}>
                            <Text
                              style={{
                                color: "#333",
                                fontSize: 13,
                                marginBottom: 2,
                              }}
                            >
                              {nome}
                            </Text>
                            <Text style={{ color: "#333", fontSize: 12 }}>
                              {item.data?.AccessType}
                            </Text>
                          </View>
                        </View>
                        <View>
                          <Text style={{ color: "#555", fontSize: 14 }}>
                            {dataFormatada}
                          </Text>
                          <Text style={{ color: "#555", fontSize: 14 }}>
                            {horaFormatada}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                  ListEmptyComponent={
                    <Text style={{ color: "#888", fontStyle: "italic" }}>
                      Nenhuma notificação recente.
                    </Text>
                  }
                  scrollEnabled={false}
                />
              </View>
              <View style={{ marginBottom: 12 }}>
                <CardsList />
              </View>
              {!isSmallScreen && (
                <View
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    padding: 16,
                    marginTop: 16,
                    elevation: 1,
                  }}
                >
                  <Text
                    style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}
                  >
                    Estatísticas do Dia
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ alignItems: "center", flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 28,
                          fontWeight: "bold",
                          color: "#1976d2",
                        }}
                      >
                        5
                      </Text>
                      <Text style={{ color: "#888", fontSize: 13 }}>
                        Ocorrências
                      </Text>
                    </View>
                    <View style={{ alignItems: "center", flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 28,
                          fontWeight: "bold",
                          color: "#388e3c",
                        }}
                      >
                        2
                      </Text>
                      <Text style={{ color: "#888", fontSize: 13 }}>
                        Alertas
                      </Text>
                    </View>
                    <View style={{ alignItems: "center", flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 28,
                          fontWeight: "bold",
                          color: "#fbc02d",
                        }}
                      >
                        3h
                      </Text>
                      <Text style={{ color: "#888", fontSize: 13 }}>
                        Tempo Online
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

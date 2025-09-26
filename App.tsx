import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from "./src/routes";
import { AuthProvider } from "./src/context/AuthContext";
import { NotificationProvider } from "./src/context/NotificationContext";

export default function App() {
  const navigationRef = useRef<any>(null);

  // Torna a referência de navegação global para uso em notificações
  React.useEffect(() => {
    (globalThis as any).navigationRef = navigationRef;
  }, []);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NotificationProvider>
          <NavigationContainer ref={navigationRef}>
            <Routes />
          </NavigationContainer>
        </NotificationProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

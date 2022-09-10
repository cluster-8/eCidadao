import AppLoading from "expo-app-loading";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components";
import { i18nConfig } from "./src/data/I18n";
import theme from "./src/global/styles/theme";
import { useApp } from "./src/hooks/useApp";
import { AuthProvider } from "./src/hooks/useAuth";
import { Routes } from "./src/routes";

export default function App() {
  const { getStoredTheme, fontsLoaded, selectedTheme } = useApp();

  useEffect(() => {
    i18nConfig();
    getStoredTheme();
  }, [getStoredTheme]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme[selectedTheme]}>
      {/* <AuthProvider> */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <StatusBar
            barStyle={
              selectedTheme === "dark" ? "light-content" : "dark-content"
            }
            backgroundColor="transparent"
            translucent
          />
          <Routes />
        </SafeAreaProvider>
      </GestureHandlerRootView>
      {/* </AuthProvider> */}
    </ThemeProvider>
  );
}

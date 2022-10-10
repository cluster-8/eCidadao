import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components'
import { i18nConfig } from './src/data/I18n'
import theme from './src/global/styles/theme'
import { useApp } from './src/hooks/useApp'
// import { AuthProvider } from './src/hooks/useAuth'
import { Routes } from './src/routes'

import { LocationProvider } from './src/hooks/useLocation'
import { RequestsProvider } from './src/hooks/useRequests'
import { AuthProvider } from './src/hooks/useAuth'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const { getStoredTheme, fontsLoaded, selectedTheme } = useApp()

  useEffect(() => {
    i18nConfig()
    getStoredTheme()
  }, [getStoredTheme])

  if (fontsLoaded) {
    SplashScreen.hideAsync()
  }

  return (
    <ThemeProvider theme={theme[selectedTheme]}>
      <AuthProvider>
        <RequestsProvider>
          <LocationProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <SafeAreaProvider>
                <StatusBar
                  barStyle={
                    selectedTheme === 'dark' ? 'light-content' : 'dark-content'
                  }
                  backgroundColor="transparent"
                  translucent
                />
                <SafeAreaView style={{ flex: 1 }}>
                  <Routes />
                </SafeAreaView>
              </SafeAreaProvider>
            </GestureHandlerRootView>
          </LocationProvider>
        </RequestsProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

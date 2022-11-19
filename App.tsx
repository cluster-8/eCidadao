import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect } from 'react'
import { ActivityIndicator, StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components'
import { i18nConfig } from './src/data/I18n'
import theme from './src/global/styles/theme'
import { useApp } from './src/hooks/useApp'
import { Routes } from './src/routes'

import { LocationProvider } from './src/hooks/useLocation'
import { RequestsProvider } from './src/hooks/useRequests'
import { AuthProvider } from './src/hooks/useAuth'
import { TypesProvider } from './src/hooks/useTypes'
import { CameraProvider } from './src/hooks/useCamera'
import { DateProvider } from './src/hooks/useDate'

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
        <DateProvider>
          <TypesProvider>
            <CameraProvider>
              <RequestsProvider>
                <LocationProvider>
                  <GestureHandlerRootView style={{ flex: 1 }}>
                    <SafeAreaProvider>
                      <StatusBar
                        barStyle={
                          selectedTheme === 'dark'
                            ? 'light-content'
                            : 'dark-content'
                        }
                        backgroundColor="transparent"
                        translucent
                      />
                      <SafeAreaView style={{ flex: 1 }}>
                        {fontsLoaded ? <Routes /> : <ActivityIndicator />}
                      </SafeAreaView>
                    </SafeAreaProvider>
                  </GestureHandlerRootView>
                </LocationProvider>
              </RequestsProvider>
            </CameraProvider>
          </TypesProvider>
        </DateProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

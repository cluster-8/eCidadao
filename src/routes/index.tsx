// import { BaseNavigationContainer } from "@react-navigation/core";
import { NavigationContainer } from '@react-navigation/native'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import * as React from 'react'
// import { StatusBar } from 'react-native'
import { useTheme } from 'styled-components'
import { useAuth } from '../hooks/useAuth'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export interface NavigatorProps {
  screenOptions: NativeStackNavigationOptions
}

export const Routes: React.FC = () => {
  const theme = useTheme()

  const { authUser } = useAuth()

  // eslint-disable-next-line no-unused-vars
  const screenOptions: NativeStackNavigationOptions = React.useMemo(
    () => ({
      headerShown: false,
      contentStyle: { backgroundColor: theme.colors.background },
      animation: 'slide_from_right',
    }),
    [theme],
  )

  console.log(authUser.id)

  return (
    <NavigationContainer>
      {!authUser.id ? (
        <AuthRoutes screenOptions={screenOptions} />
      ) : (
        <AppRoutes />
      )}
    </NavigationContainer>
  )
}

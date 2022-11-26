import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import * as React from 'react'

import { useTheme } from 'styled-components'
import { AuthRoutes } from './auth.routes'
import { useAuth } from '../hooks/useAuth'
import { AppRoutes } from './app.routes'

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

  return (
    <NavigationContainer>
      {!authUser?.id ? (
        <AuthRoutes screenOptions={screenOptions} />
      ) : (
        <AppRoutes />
      )}
    </NavigationContainer>
  )
}

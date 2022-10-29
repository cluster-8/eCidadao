import React, { useMemo } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useCamera } from '../hooks/useCamera'
// import Home from '../screens/Home'
import NewRequest from '../screens/NewRequest'
import Profile from '../screens/Profile'
import Requests from '../screens/Requests'
import MyRequests from '../screens/MyRequests'
// import SignIn from '../screens/SignIn'

import { Feather } from '@expo/vector-icons'
import { RFHeight } from '../utils/getResponsiveSizes'
// import SignUp from '../screens/SignUp'

const Tab = createBottomTabNavigator()

export const AppRoutes = () => {
  const { openCamera } = useCamera()

  const screenOptions = useMemo(() => {
    const options = {
      style: {
        borderTopColor: 'transparent',
      },
      tabBarActiveTintColor: '#004997',
      tabBarStyle: {
        height: '8%',
        paddingBottom: RFHeight(5),
        paddingTop: RFHeight(5),
      },
    }

    // eslint-disable-next-line no-unused-expressions
    openCamera ? (options.tabBarStyle.display = 'none') : null
    return options
  }, [openCamera])
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Início"
        component={MyRequests}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Solicitações"
        component={Requests}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="map-pin" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Nova Solicitação"
        component={NewRequest}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="plus-circle" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}

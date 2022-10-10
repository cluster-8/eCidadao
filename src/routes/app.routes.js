import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// import Home from '../screens/Home'
import NewRequest from '../screens/NewRequest'
import Profile from '../screens/Profile'
import Requests from '../screens/Requests'
import MyRequests from '../screens/MyRequests'
// import SignIn from '../screens/SignIn'

import { Feather } from '@expo/vector-icons'
// import SignUp from '../screens/SignUp'

const Tab = createBottomTabNavigator()

export const AppRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        style: {
          borderTopColor: 'transparent',
        },
        tabBarActiveTintColor: '#004997',
        tabBarStyle: {
          height: '8%',
          paddingBottom: 5,
          paddingTop: 5,
        },
      }}
    >
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

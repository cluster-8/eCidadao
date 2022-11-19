import React, { useMemo, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useCamera } from '../hooks/useCamera'
import { useTerms } from '../hooks/useTerms'
import NewRequest from '../screens/NewRequest'
import Profile from '../screens/Profile'
import Requests from '../screens/Requests'
import MyRequests from '../screens/MyRequests'
import Dashboard from '../screens/Dashboard'

import { Feather } from '@expo/vector-icons'
import { RFHeight } from '../utils/getResponsiveSizes'

const Tab = createBottomTabNavigator()

export const AppRoutes = () => {
  const { openCamera } = useCamera()
  const { tabNavigatorState, setTabNavigatorState } = useTerms()

  // const [tabNavigatorState, setTabNavigatorState] = useState()

  function handleStateChange(state: any) {
    setTabNavigatorState(state)
  }

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

  // async function handleStateChange(state: any) {
  //   console.log("mudou o state...");
  //   setTabNavigatorState(state)
  // }

  // useEffect(() => {
  //     console.log("mudou o state...");
  // }, [tabNavigatorState])

  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      screenListeners={{
        state: (e) => {
          handleStateChange(e.data)
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
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            // console.log(e);
            // e.preventDefault();
          },
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
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="bar-chart" size={size} color={color} />
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

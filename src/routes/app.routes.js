import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// import Home from '../screens/Home'
import NewRequest from '../screens/NewRequest'
import Profile from '../screens/Profile'
import Requests from '../screens/Requests'
import MyRequests from '../screens/MyRequests'
import SignIn from '../screens/SignIn'

import { Feather } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export const AppRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        style: {
          // backgroundColor:
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
        name="SignIn"
        component={SignIn}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="map-pin" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
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

// import { useNavigation } from "@react-navigation/core";
// import {
//   createNativeStackNavigator,
//   NativeStackNavigationOptions,
// } from "@react-navigation/native-stack";
// import React, { useEffect, useMemo } from "react";
// import { BackHandler, Image } from "react-native";
// import { useTheme } from "styled-components";
// import { NavigatorProps } from ".";
// // import Logo from '../assets/images/logo-dark.png';
// import { AppRoutesParams } from "../data/routes/app";
// import Home from "../screens/Home";

// const Stack = createNativeStackNavigator<AppRoutesParams>();

// export const AppRoutes: React.FC<NavigatorProps> = ({ screenOptions }) => {
//   const theme = useTheme();
//   const navigation = useNavigation();

//   useEffect(() => {
//     const handleBackAction = () => {
//       if (navigation.canGoBack()) {
//         navigation.goBack();
//       } else {
//         BackHandler.exitApp();
//       }
//       return true;
//     };
//     const backHandler = BackHandler.addEventListener(
//       "hardwareBackPress",
//       handleBackAction
//     );
//     return () => backHandler.remove();
//   }, [navigation]);

//   const options = useMemo<NativeStackNavigationOptions>(
//     () => ({
//       headerTitleAlign: "center",
//       headerStyle: { backgroundColor: theme.colors.primary },
//       headerTintColor: theme.colors.white,
//       headerShadowVisible: false,

//       // headerTitle: () => (
//       //   <Image
//       //     style={{
//       //       width: 150,
//       //       height: 50,
//       //       resizeMode: 'contain'
//       //     }}
//       //     source={Logo}
//       //   />
//       // )
//     }),
//     [theme]
//   );
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         ...screenOptions,
//         headerShown: true,
//         headerTintColor: theme.colors.white,
//       }}
//       initialRouteName="Home"
//     >
//       <Stack.Screen
//         name="Home"
//         component={Home}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };

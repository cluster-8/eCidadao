import { useNavigation } from '@react-navigation/core';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions
} from '@react-navigation/native-stack';
import React, { useEffect, useMemo } from 'react';
import { BackHandler, Image } from 'react-native';
import { useTheme } from 'styled-components';
import { NavigatorProps } from '.';
// import Logo from '../assets/images/logo-dark.png';
import { AppRoutesParams } from '../data/routes/app';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator<AppRoutesParams>();

export const AppRoutes: React.FC<NavigatorProps> = ({ screenOptions }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    const handleBackAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        BackHandler.exitApp();
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackAction
    );
    return () => backHandler.remove();
  }, [navigation]);

  const options = useMemo<NativeStackNavigationOptions>(
    () => ({
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: theme.colors.primary },
      headerTintColor: theme.colors.white,
      headerShadowVisible: false,

      // headerTitle: () => (
      //   <Image
      //     style={{
      //       width: 150,
      //       height: 50,
      //       resizeMode: 'contain'
      //     }}
      //     source={Logo}
      //   />
      // )
    }),
    [theme]
  );
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        headerShown: true,
        headerTintColor: theme.colors.white
      }}
      initialRouteName="Home"
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
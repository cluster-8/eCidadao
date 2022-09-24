import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type AppRoutesParams = {
  Home: undefined
}

export type HomeScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'Home'
>

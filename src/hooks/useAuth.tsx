import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNetInfo } from '@react-native-community/netinfo'
import * as WebBrowser from 'expo-web-browser'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { FieldValues } from 'react-hook-form'
import { Alert } from 'react-native'
import { User } from '../data/Model/User'
import { api } from '../data/services/api'

interface AuthContextData {
  signInWithPassword: (data: FieldValues) => Promise<void>
  signUp: (data: FieldValues) => Promise<void>
  signOut: () => Promise<void>
  authUser: User
  isLoading: boolean
  isConnected: boolean
  usageTerms: any
  getUsageTerms: () => Promise<any>
}

type AuthContextProps = {
  children: ReactNode
}

type SignInRequestProps = {
  user: User
  token: string
}

type SignUpRequestProps = {
  id: string
  token: string
}

WebBrowser.maybeCompleteAuthSession()

const AuthContext = createContext({} as AuthContextData)

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [authUser, setAuthUser] = useState<User>({} as User)
  const [isLoading, setLoading] = useState(true)
  const [usageTerms, setUsageTerms] = useState(0)
  const info = useNetInfo()

  const isConnected = useMemo(() => {
    if (info.isConnected) {
      return true
    }
    return false
  }, [info.isConnected])

  const getUsageTerms = useCallback(async () => {
    try {
      const { data } = await api.get<any>('/usage-terms')
      setUsageTerms(data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const storeUser = async (user: User, token: string) => {
    setAuthUser(user)

    api.defaults.headers.common.Authorization = `Bearer ${token}`

    await AsyncStorage.multiSet([
      ['@ecidadao:user', JSON.stringify(user)],
      ['@ecidadao:token', token],
    ])
  }

  const signInWithPassword = useCallback(
    async ({ email, password }: FieldValues) => {
      setLoading(true)

      try {
        const {
          data: { user, token },
        } = await api.post<SignInRequestProps>('/auth/sign-in', {
          email: email.toLowerCase(),
          password,
        })

        await storeUser(user, token)
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível fazer o login, tente novamente mais tarde - 111111',
        )
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const signUp = useCallback(async (data: FieldValues) => {
    try {
      const {
        data: { id, token },
      } = await api.post<SignUpRequestProps>('/user', data)

      const user = { ...data, id } as User
      await storeUser(user, token)

      Alert.alert(
        'Bem vindo(a)!',
        'Olá, Seja muito bem vindo(a) ao eCidadão! Você já pode registrar solicitações de manutenção.',
      )
    } catch (err) {
      console.log(err)
    }
  }, [])

  const signOut = useCallback(async () => {
    api.defaults.headers.common.Authorization = ''

    setAuthUser({} as User)

    await AsyncStorage.multiRemove(['@ecidadao:token', '@ecidadao:user'])
  }, [])

  useEffect(() => {
    const loadStoragedData = async (): Promise<void> => {
      const [token, user] = await AsyncStorage.multiGet([
        '@ecidadao:token',
        '@ecidadao:user',
      ])

      if (token[1] && user[1]) {
        api.defaults.headers.common.Authorization = `Bearer ${token[1]}`
        setAuthUser(JSON.parse(user[1]))
      }

      setLoading(false)
    }
    loadStoragedData()
    getUsageTerms()
  }, [])

  const providerValue = useMemo(
    () => ({
      signInWithPassword,
      signOut,
      authUser,
      isLoading,
      signUp,
      isConnected,
      usageTerms,
      getUsageTerms,
    }),
    [
      signInWithPassword,
      signOut,
      authUser,
      isLoading,
      signUp,
      isConnected,
      usageTerms,
      getUsageTerms,
    ],
  )
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { useAuth, AuthProvider }

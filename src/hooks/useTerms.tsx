import React, {
  createContext,
  useCallback,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useMemo,
} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { useAuth } from '../hooks/useAuth'

import { api } from '../data/services/api'

interface TermsContextData {
  tabNavigatorState: any
  setTabNavigatorState: any
  getUsageTerms: () => Promise<any>
  usageTerms: any
  setUsageTerms: any
  hasNewUsageTerms: any
  setHasNewUsageTerms: any
  acceptNewUsageTerms: any
}

type TermsContextProps = {
  children?: ReactNode
}

const TermsContext = createContext({} as TermsContextData)

const TermsProvider: React.FC<TermsContextProps> = ({ children }) => {
  const { getUserById } = useAuth()

  const [tabNavigatorState, setTabNavigatorState] = useState()

  const [hasNewUsageTerms, setHasNewUsageTerms] = useState<boolean>(false)

  const [usageTerms, setUsageTerms] = useState(0)

  const getUsageTerms = useCallback(async () => {
    try {
      const { data } = await api.get<any>('/usage-terms')
      setUsageTerms(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }, [])

  const getUserLastUsageTerms: any = async () => {
    const [user]: any = await AsyncStorage.multiGet(['@ecidadao:user'])
    const parsedUser = JSON.parse(user[1])

    if (!parsedUser) return

    const userTermsAcceptedList = parsedUser.usageTermsAccepted
    if (!userTermsAcceptedList.length) {
      //* usuário possui apenas um termo aceito
      return userTermsAcceptedList
    }
    const lastTerm = userTermsAcceptedList[userTermsAcceptedList.length - 1]

    return lastTerm
  }

  // todo - função para aceitar novos termos de uso
  const acceptNewUsageTerms = useCallback(async (usageTermsAcceptedAt: any) => {
    try {
      const [storedUser]: any = await AsyncStorage.multiGet(['@ecidadao:user'])
      const user = JSON.parse(storedUser[1])

      const userLastTerm = await getUserLastUsageTerms()
      const lastUsageTerm = await getUsageTerms()

      const usageTermsAccepted = {
        usageTermsAcceptedAt,
        usageTermsAcceptedItens: lastUsageTerm.itens.map((i: any) => i.id),
        usageTermsId: lastUsageTerm.id,
      }

      if (userLastTerm.usageTermsId === lastUsageTerm.id) return

      const response = await api.put<any>('/user/usage-terms', {
        usageTermsAccepted,
      })

      // console.log(response.status)
      if (response.status === 200) {
        console.log('USER ACCEPTED NEW USAGE TERMS\t', new Date())
        setHasNewUsageTerms(false)

        const updatedUser = await getUserById(user.id)

        await AsyncStorage.multiSet([
          ['@ecidadao:user', JSON.stringify(updatedUser)],
        ])
      }

      return
    } catch (error) {
      console.log(error)
    }
  }, [])

  const getLastVerification: any = async () => {
    const [termVerification] = await AsyncStorage.multiGet([
      '@ecidadao:termVerification',
    ])
    return termVerification[1]
  }

  const setLastVerification: any = async () => {
    const verificationTime = String(new Date())
    // console.log()
    // console.log(`VERIFICATION DONE AT \t\t${new Date()}`)
    // console.log();
    await AsyncStorage.multiSet([
      ['@ecidadao:termVerification', verificationTime],
    ])
    return verificationTime
  }

  const handleStateChange: any = async () => {
    console.log()
    console.log(`STATE CHANGED`)

    let lastVerification: any = await getLastVerification()
    if (lastVerification === null)
      lastVerification = await setLastVerification()

    // const interval = 3600000 * 8 // ? 8 horas
    const interval = 60000 * 3 // ? 3 minutos
    const now = String(new Date())

    const nextVerification: any = new Date(
      Date.parse(lastVerification) + interval,
    )

    //! verificar termos
    console.log(`LAST VERIFICATION AT \t\t${lastVerification}`)
    console.log(`CURRENT TIME \t\t\t${now}`)
    console.log(`NEXT VERIFICATION TIME\t\t${nextVerification}`)

    if (Date.parse(now) > Date.parse(nextVerification)) {
      console.log('STARTING VERIFICATION\t\t', String(new Date()))
      const userLastTerm = await getUserLastUsageTerms()
      const lastTerm = await getUsageTerms()
      if (!userLastTerm) {
        console.log('USER LAST TERM ACCEPTED NOT FOUND')
        return
      }
      //! novo termo a ser aceito
      if (userLastTerm.usageTermsId !== lastTerm.id) {
        console.log('NEW USAGE TERMS TO BE ACCEPTED...')
        setHasNewUsageTerms(true)
      } else {
        //! teste
        console.log('NO NEW USAGE TERMS TO BE ACCEPTED... ')
        setHasNewUsageTerms(false)
      }
      await setLastVerification()
    }
  }

  useEffect(() => {
    handleStateChange()
  }, [tabNavigatorState])

  const providerValue = useMemo(
    () => ({
      hasNewUsageTerms,
      setHasNewUsageTerms,
      tabNavigatorState,
      setTabNavigatorState,
      usageTerms,
      setUsageTerms,
      acceptNewUsageTerms,
      getUsageTerms,
    }),
    [
      hasNewUsageTerms,
      setHasNewUsageTerms,
      tabNavigatorState,
      setTabNavigatorState,
      usageTerms,
      setUsageTerms,
      acceptNewUsageTerms,
      getUsageTerms,
    ],
  )

  return (
    <TermsContext.Provider value={providerValue}>
      {children}
    </TermsContext.Provider>
  )
}

const useTerms = () => {
  const context = useContext(TermsContext)

  if (!context) {
    throw new Error('useTerms must be used within an RequestsProvider')
  }

  return context
}

export { useTerms, TermsProvider }

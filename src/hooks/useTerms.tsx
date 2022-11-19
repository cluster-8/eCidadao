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

import { api } from '../data/services/api'

interface TermsContextData {
  //   setDateInputOnFocus: any;
  //   dateInputOnFocus: any;
  //   setOpenModalDate: any;
  //   setSelectedDate: any;
  //   openModalDate: any;
  //   selectedDate: any;
  //   getDateValue: any;
  //   dates: any[];
  tabNavigatorState: any
  setTabNavigatorState: any
  // getUsageTerms: () => Promise<any>
  usageTerms: any
  setUsageTerms: any
  hasNewUsageTerms: any
  setHasNewUsageTerms: any
}

type TermsContextProps = {
  children?: ReactNode
}

const TermsContext = createContext({} as TermsContextData)

const TermsProvider: React.FC<TermsContextProps> = ({ children }) => {
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
    const userTermsAcceptedList = [parsedUser.usageTermsAccepted]
    const sortedArr: any = userTermsAcceptedList.sort(
      (a: any, b: any) => a.usageTermsAcceptedAt - b.usageTermsAcceptedAt,
    )
    const lastTerm = sortedArr[0]
    return lastTerm[0]
  }

  // todo - função para aceitar novos termos de uso
  const acceptNewUsageTerms = useCallback(async (data: FieldValues) => {
    try {
      const { email, password, newUsageTermsAccepted } = data
      console.log(email, password, newUsageTermsAccepted)

      // await storeUser(user, token);
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
    await AsyncStorage.multiSet([
      ['@ecidadao:termVerification', verificationTime],
    ])
    return verificationTime
  }

  const handleStateChange: any = async () => {
    let lastVerification = await getLastVerification()
    if (lastVerification === null)
      lastVerification = await setLastVerification()

    const interval = 28800 * 1000 // ? 8 horas
    const now = String(new Date())

    //! verificar termos
    if (Date.parse(now) - Date.parse(lastVerification) > interval) {
      const userLastTerm = await getUserLastUsageTerms()
      const lastTerm = await getUsageTerms()
      if (!userLastTerm) return
      //! novo termo a ser aceito
      if (userLastTerm.usageTermsId !== lastTerm.id) {
        setHasNewUsageTerms(true)
      } else {
        // setHasNewUsageTerms(false)
        //! teste
        setHasNewUsageTerms(false)
      }
    }

    //! teste
    // const userLastTerm = await getUserLastUsageTerms();
    // const lastTerm = await getUsageTerms();
    // if (userLastTerm.usageTermsId !== lastTerm.id) {
    //   console.log("tem novo termo para aceitar...");
    //   setHasNewUsageTerms(true);
    // }
  }

  useEffect(() => {
    handleStateChange()
  }, [tabNavigatorState])

  const providerValue = useMemo(
    () => ({
      //   setDateInputOnFocus,
      //   setOpenModalDate,
      //   dateInputOnFocus,
      //   setSelectedDate,
      //   openModalDate,
      //   selectedDate,
      //   getDateValue,
      //   dates,
      hasNewUsageTerms,
      setHasNewUsageTerms,
      tabNavigatorState,
      setTabNavigatorState,
      usageTerms,
      setUsageTerms,
    }),
    [
      //   setDateInputOnFocus,
      //   setOpenModalDate,
      //   dateInputOnFocus,
      //   setSelectedDate,
      //   openModalDate,
      //   selectedDate,
      //   getDateValue,
      //   dates,
      hasNewUsageTerms,
      setHasNewUsageTerms,
      tabNavigatorState,
      setTabNavigatorState,
      usageTerms,
      setUsageTerms,
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

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
} from 'react'

import { api } from '../data/services/api'
import { useAuth } from '../hooks/useAuth'
import { Alert } from 'react-native'
interface RequestType {
  value: string
  label: string
}

interface Address {
  formattedAddress: string
  neighborhood: string
  zipcode: string
  number: number
  street: string
  state: string
  city: string
  long: number
  lat: number
}

export interface Request {
  description?: string
  identifier?: number
  createdAt?: string
  type?: RequestType
  address?: Address
  status?: string
  image?: string
  id: string
}

interface RequestsContextData {
  createRequest: (data: any) => Promise<any>
  getUserRequests: () => Promise<any>
  getRequests: () => Promise<any>
  userRequests: any
  getData: any
  reqData: any
}

type RequestsContextProps = {
  children?: ReactNode
}

const RequestsContext = createContext({} as RequestsContextData)

const RequestsProvider: React.FC<RequestsContextProps> = ({ children }) => {
  const [reqData, setReqData] = useState<any>()

  const { authUser } = useAuth()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getRequests = async (queryParams: String = '') => {
    const queryStr =
      'identifier image address type status createdAt description'
    const { data } = await api.get(`/requests?select=${queryStr}`)
    return data
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUserRequests = async () => {
    if (!authUser.id) return
    const queryStr =
      'identifier image address type status createdAt description'
    const { data } = await api.get(
      `/requests?=id${authUser.id}&select=${queryStr}`,
    )
    return data
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const createRequest = async (data: any) => {
    try {
      const response = await api.post(`/requests`, data)

      if (response.status === 201) {
        Alert.alert(
          'Nova solicitação',
          'Solicitação de manutenção realizada com sucesso!',
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('Ok pressed')
              },
            },
          ],
        )
      } else {
        Alert.alert(
          'Falha',
          'Algo deu errado durante o registro de sua solicitação. Tente novamente.',
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('Ok pressed')
              },
            },
          ],
        )
      }

      await getData()
      console.log('passei pelo getData')

      return response
    } catch (error) {
      console.log(error)
    }
  }

  const userRequests = useMemo(async () => {
    if (authUser.id) {
      // const data = await getUserRequests()
      // console.log(JSON.stringify(data, null, 4))
      // return data
    }
  }, [authUser])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getData() {
    const data = await getUserRequests()
    setReqData(data)
  }

  const providerValue = useMemo(
    () => ({
      getUserRequests,
      createRequest,
      userRequests,
      getRequests,
      getData,
      reqData,
    }),
    [
      getUserRequests,
      createRequest,
      userRequests,
      getRequests,
      getData,
      reqData,
    ],
  )

  return (
    <RequestsContext.Provider value={providerValue}>
      {children}
    </RequestsContext.Provider>
  )
}

const useRequests = () => {
  const context = useContext(RequestsContext)

  if (!context) {
    throw new Error('useLocation must be used within an RequestsProvider')
  }

  return context
}

export { useRequests, RequestsProvider }

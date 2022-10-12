import React, { createContext, ReactNode, useContext, useMemo } from 'react'
import { Alert } from 'react-native'

import { api } from '../data/services/api'

interface RequestType {
  value: string
  label: string
}

interface Address {
  lat: number
  long: number
  number: number
  city: string
  state: string
  street: string
  zipcode: string
  neighborhood: string
  formattedAddress: string
}

export interface Request {
  id: string
  identifier?: number
  image?: string
  address?: Address
  type?: RequestType
  status?: string
  description?: string
  createdAt?: string
}

interface RequestsContextData {
  getRequests: () => Promise<any>
  createRequest: (data: any) => Promise<any>
}

type RequestsContextProps = {
  children?: ReactNode
}

const RequestsContext = createContext({} as RequestsContextData)

const RequestsProvider: React.FC<RequestsContextProps> = ({ children }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getRequests = async (queryParams: String = '') => {
    const queryStr =
      'identifier image address type status createdAt description'
    const { data } = await api.get(`/requests?select=${queryStr}`)
    return data
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const createRequest = async (data: any) => {
    const response = await api.post(`/requests`, data)
    console.log('Response...', response)
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
    return response
  }

  const providerValue = useMemo(
    () => ({
      getRequests,
      createRequest,
    }),
    [getRequests, createRequest],
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

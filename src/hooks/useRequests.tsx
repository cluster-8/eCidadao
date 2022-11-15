import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
} from 'react'

import { api } from '../data/services/api'
import { useAuth } from '../hooks/useAuth'
import { useDate } from '../hooks/useDate'
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
  finishedDescription?: string
  finishedImage?: string
  description?: string
  identifier?: number
  finishedAt?: string
  createdAt?: string
  updatedAt?: string
  type?: RequestType
  address?: Address
  status?: string
  image?: string
  id: string
}

interface RequestsContextData {
  finalizeRequest: (data: any, id: any) => Promise<any>
  createRequest: (data: any) => Promise<any>
  getTechnicalRequests: () => Promise<any>
  getUserRequests: () => Promise<any>
  getRequests: () => Promise<any>
  countRequestsByStatus: (status: any) => Promise<any>
  countRequestsByType: () => Promise<any>
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
  const { selectedDate } = useDate()

  // todo {{baseurl}}/v1/requests/count-to-dashboard

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const countRequestsByType = async () => {
    try {
      // const { data } = await api.get(`/requests/count-to-dashboard?select=all`)
      // console.log('Count by type...', data)
      // return data

      if (!selectedDate || !authUser.role) return
      let endDate = new Date(selectedDate.key)
      endDate = new Date(endDate.setMonth(selectedDate.key.getMonth() + 1))

      const path =
        authUser.role === 'technical'
          ? 'requests/technical'
          : `requests/${authUser.id}`

      const { data } = await api.get(
        `requests/count-to-dashboard?select=all&filter[0][path]=createdAt&filter[0][value]=${selectedDate.key}&filter[0][operator]=gte&filter[0][type]=date&filter[1][path]=createdAt&filter[1][value]=${endDate}&filter[1][operator]=lte&filter[1][type]=date&limit=999`,
      )
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  // // const { data } = await api.get(`/requests?select=$all`)
  // const { data } = await api.get(
  //   `requests/technical?select=all&filter[0][path]=status&filter[0][value]=opened`
  // );

  // const { data } = await api.get(
  //   `requests/technical?select=all&filter[0][path]=status&filter[0][value]=${queryParams}&filter[1][path]=createdAt&filter[1][value]=${selectedDate.key}&filter[1][operator]=gte&filter[1][type]=date&filter[2][path]=createdAt&filter[2][value]=${endDate}&filter[2][operator]=lte&filter[2][type]=date&limit=999`,
  // )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const countRequestsByStatus = async (status: String = '') => {
    try {
      if (!selectedDate || !authUser.role) return
      let endDate = new Date(selectedDate.key)
      endDate = new Date(endDate.setMonth(selectedDate.key.getMonth() + 1))

      const path =
        authUser.role === 'technical'
          ? 'requests/technical'
          : `requests/${authUser.id}`

      const { data } = await api.get(
        `${path}?select=id&filter[0][path]=status&filter[0][value]=${status}&filter[1][path]=createdAt&filter[1][value]=${selectedDate.key}&filter[1][operator]=gte&filter[1][type]=date&filter[2][path]=createdAt&filter[2][value]=${endDate}&filter[2][operator]=lte&filter[2][type]=date&limit=999`,
      )

      return data.length
    } catch (error) {
      console.log(error)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getRequests = async (queryParams: String = '') => {
    const { data } = await api.get(`/requests?select=all`)
    return data
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTechnicalRequests = async (queryParams: String = '') => {
    const { data } = await api.get(`requests/technical?select=all`)
    return data
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUserRequests = async () => {
    if (!authUser.id) return
    const { data } = await api.get(`/requests?=id${authUser.id}&select=all`)
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
      return response
    } catch (error) {
      console.log(error)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const finalizeRequest = async (data: any, id: any) => {
    try {
      const response = await api.put(`requests/technical/${id}`, data)
      if (response.status === 200) {
        Alert.alert(
          'Finalizar solicitação',
          'Finalização de solicitação de manutenção realizada com sucesso!',
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
          'Algo deu errado durante o registro de finalização de solicitação. Tente novamente.',
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
    let data
    if (authUser.role === 'technical') {
      data = await getTechnicalRequests()
    } else {
      data = await getUserRequests()
    }
    setReqData(data)
  }

  // useEffect(() => {
  //   countRequestsByStatus('opened')
  //   countRequestsByStatus('closed')
  // }, [selectedDate])

  const providerValue = useMemo(
    () => ({
      countRequestsByType,
      countRequestsByStatus,
      getTechnicalRequests,
      getUserRequests,
      finalizeRequest,
      createRequest,
      userRequests,
      getRequests,
      getData,
      reqData,
    }),
    [
      countRequestsByType,
      countRequestsByStatus,
      getTechnicalRequests,
      getUserRequests,
      finalizeRequest,
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

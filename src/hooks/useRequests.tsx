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
import { useTypes } from '../hooks/useTypes'
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
  const { getTypeValue } = useTypes()

  // todo {{baseurl}}/v1/requests/count-to-dashboard

  const graphArraysData = (data: any) => {
    if (!data) return
    const yAxis = []
    const xAxis = []
    for (const [key, value] of Object.entries(data)) {
      const requestType = getTypeValue(key)
      let formatedType = requestType.split('/')
      if (formatedType.length > 0) {
        formatedType = formatedType[0]
      }
      xAxis.push(formatedType)
      yAxis.push(value)
    }
    return {
      y: yAxis,
      x: xAxis,
    }
  }

  const pieChartData = (data: any) => {
    const colors = [
      '#914fa1',
      '#de5b91',
      '#ff8274',
      '#ffbb5e',
      '#f9f871',
      '#4f53a9',
      '#7f5cb8',
      '#8f1d39',
      '#c95568',
      '#d3a518',
    ]

    if (!data) {
      console.log('sem data...')
      return
    }

    const chartData = []
    let i = 0
    for (const [key, value] of Object.entries(data)) {
      const requestType = getTypeValue(key)
      chartData.push({
        name: requestType,
        total: value,
        color: colors[i],
        legendFontColor: '#7F7F7F',
        legendFontSize: 10,
      })
      i += 1
    }
    // return chartData
    return chartData.length > 10 ? chartData.slice(0, 10) : chartData
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const countRequestsByType = async () => {
    try {
      if (!selectedDate || !authUser.role) return
      let endDate = new Date(selectedDate.key)
      endDate = new Date(endDate.setMonth(selectedDate.key.getMonth() + 1))

      // const path =
      //   authUser.role === 'technical' ? 'requests/technical' : `requests`

      const path = 'requests'

      const { data } = await api.get(
        `${path}/count-to-dashboard?select=all&filter[0][path]=createdAt&filter[0][value]=${selectedDate.key}&filter[0][operator]=gte&filter[0][type]=date&filter[1][path]=createdAt&filter[1][value]=${endDate}&filter[1][operator]=lte&filter[1][type]=date&limit=999`,
      )
      // const graphData = graphArraysData(data)
      const graphData = pieChartData(data)

      return graphData
    } catch (error) {
      console.log('countRequestByType() -> catch()')
      console.log(error)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const countRequestsByStatus = async (status: String = '') => {
    try {
      if (!selectedDate || !authUser.role) return
      let endDate = new Date(selectedDate.key)
      endDate = new Date(endDate.setMonth(selectedDate.key.getMonth() + 1))

      const path =
        authUser.role === 'technical' ? 'requests/technical' : `requests`
      console.log(path)
      const { data } = await api.get(
        `${path}?select=id&filter[0][path]=status&filter[0][value]=${status}&filter[1][path]=createdAt&filter[1][value]=${selectedDate.key}&filter[1][operator]=gte&filter[1][type]=date&filter[2][path]=createdAt&filter[2][value]=${endDate}&filter[2][operator]=lte&filter[2][type]=date&limit=999`,
      )
      console.log(data)
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
    if (data) {
      setReqData(data)
    }
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

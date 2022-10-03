import * as Location from 'expo-location'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { api } from '../data/services/api'
interface LocationContextData {
  coords: any
  getAddress: () => Promise<any>
}

type LocationContextProps = {
  children: ReactNode
}

const LocationContext = createContext({} as LocationContextData)

const LocationProvider: React.FC<LocationContextProps> = ({ children }) => {
  const [coords, setCoords] = useState({
    latitude: -23.211820056667055,
    longitude: -45.891863188855105,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAddress = async () => {
    const queryStr = `?lat=${coords.latitude}&long=${coords.longitude}`
    const res: any = await api.get(`/requests/address${queryStr}`)
    if (!res) return

    return res.data.formattedAdress
  }

  useEffect(() => {
    ;(async function getLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        console.log('Permission to access location was denied')
        return
      }

      const location = await Location.getCurrentPositionAsync({})

      if (location)
        setCoords({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      return location
    })()
  }, [])

  const providerValue = useMemo(
    () => ({
      coords,
      getAddress,
    }),
    [coords, getAddress],
  )
  return (
    <LocationContext.Provider value={providerValue}>
      {children}
    </LocationContext.Provider>
  )
}

const useLocation = () => {
  const context = useContext(LocationContext)

  if (!context) {
    throw new Error('useLocation must be used within an LocationProvider')
  }

  return context
}

export { useLocation, LocationProvider }

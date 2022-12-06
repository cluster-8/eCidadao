import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Dimensions, View, Text } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps'

import { Container, GetLocationButton, GetLocationIcon } from './styles'

import ModalDetails from '../../components/ModalDetails'
import SearchBar from '../../components/SearchBar'

import { useLocation } from '../../hooks/useLocation'
import { useRequests } from '../../hooks/useRequests'
import { useTypes } from '../../hooks/useTypes'

import formatReqStatus from '../../utils/formatReqStatus'
import formatReqType from '../../utils/formatReqType'
import { RFHeight } from '../../utils/getResponsiveSizes'

const { height, width } = Dimensions.get('window')
const delta = {
  latitudeDelta: 0.001,
  longitudeDelta: 0.001 * (width / height),
}

const Requests: React.FC = () => {
  const mapRef = useRef<MapView | null>(null)

  const { coords, getLocation } = useLocation()

  const { reqData, getTechnicalRequests, getRequests } = useRequests()

  const { getTypeValue } = useTypes()

  const [data, setData] = useState<any[]>()

  const [modalVisible, setModalVisible] = useState(false)

  const [currentSolicitacao, setCurrentSolicitacao] = useState({})

  const [currentRegion, setCurrentRegion] = useState({
    latitude: Number(coords.latitude),
    longitude: Number(coords.longitude),
    ...delta,
  })

  const [searchTerm, setSearchTerm] = useState('')

  const requests: any = useMemo(() => {
    console.log(searchTerm, data)
    if (!data) return
    if (!searchTerm) return data
    return data?.filter(
      (el) =>
        getTypeValue(el.type).includes(searchTerm) ||
        el.address.formattedAddress.includes(searchTerm),
    )
  }, [searchTerm, data, getTypeValue])

  // const requests: any = useMemo(() => {
  //   let data = reqData
  //   if (!reqData) return []
  //   if (!searchTerm) return data
  //   data = reqData?.filter(
  //     (el: any) =>
  //       getTypeValue(el.type).includes(searchTerm) ||
  //       el.address.formattedAddress.includes(searchTerm),
  //   )
  //   console.log(data)
  //   return data
  // }, [searchTerm, reqData, getTypeValue])

  const [solicitacoes, setSolicitacoes] = useState<any>([])

  const handleSelect = (request: any) => {
    setCurrentSolicitacao({
      createdAt: request.createdAt,
      identifier: request.identifier,
      image: request.image,
      status: request.status,
      type: request.type,
      address: request.address,
      description: request.description,
    })
  }

  const handleGoToMyLocation = () => {
    mapRef.current?.animateCamera({
      center: {
        latitude: Number(coords.latitude),
        longitude: Number(coords.longitude),
      },
    })
  }

  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      setCurrentRegion({
        latitude: Number(coords.latitude),
        longitude: Number(coords.longitude),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })
    }
    console.log('coords has changed...')
  }, [coords])

  useEffect(() => {
    if (requests?.length && searchTerm) {
      setCurrentRegion({
        latitude: Number(requests[0].address.lat),
        longitude: Number(requests[0].address.long),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })
    }
    console.log('search term...')
  }, [requests, searchTerm])

  // useEffect(() => {
  //   getLocation().then((loc) =>
  //     console.log(
  //       'Coords ---------->',
  //       loc.coords.latitude,
  //       loc.coords.longitude,
  //     ),
  //   )
  // }, [])

  const getData = async (searchTerm?: any) => {
    try {
      let data = await getTechnicalRequests()
      if (searchTerm) {
        data = data.filter(
          (el: any) =>
            getTypeValue(el.type)
              .toUpperCase()
              .includes(searchTerm.toUpperCase()) ||
            el.address.formattedAddress.includes(searchTerm),
        )
      }
      setSolicitacoes(data)
      setCurrentRegion({
        latitude: Number(data[0].address.lat),
        longitude: Number(data[0].address.long),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })
      console.log()
      console.log(data)
      console.log()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData(searchTerm)
  }, [searchTerm])

  return (
    <Container>
      <MapView
        // provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        showsMyLocationButton={false}
        showsUserLocation={true}
        // userLocationUpdateInterval={5000}
        // followsUserLocation={true}
        // showsMyLocationButton={true}
        // showsCompass={true}
        loadingEnabled={true}
        moveOnMarkerPress={true}
        initialRegion={currentRegion}
        region={currentRegion}
      >
        {solicitacoes?.map((request: any) => {
          return (
            <View key={request.id}>
              {request.status === 'opened' && (
                <Marker
                  key={request.id}
                  coordinate={{
                    latitude: Number(request.address.lat),
                    longitude: Number(request.address.long),
                  }}
                  title={formatReqType(request.type)}
                  pinColor={
                    formatReqStatus(request.status) === 'Fechada'
                      ? '#02842a'
                      : '#cd0019'
                  }
                  onPress={() => {
                    handleSelect(request)
                    setCurrentRegion({
                      latitude: Number(request.address.lat),
                      longitude: Number(request.address.long),
                      latitudeDelta: currentRegion.latitudeDelta,
                      longitudeDelta: currentRegion.longitudeDelta,
                    })
                    setModalVisible(true)
                  }}
                >
                  {/* <Callout>
                    <Text>{request?.type}</Text>
                  </Callout> */}
                </Marker>
              )}
            </View>
          )
        })}
      </MapView>

      <SearchBar
        onChangeText={(text: any) => setSearchTerm(text)}
        name="searchTerm"
        icon="search"
        placeholder="Buscar"
      />

      <GetLocationButton onPress={handleGoToMyLocation}>
        <GetLocationIcon name="crosshair" size={RFHeight(20)} />
      </GetLocationButton>

      <ModalDetails
        data={currentSolicitacao}
        modalVisible={modalVisible}
        handleClose={() => setModalVisible(false)}
      />
    </Container>
  )
}

export default Requests

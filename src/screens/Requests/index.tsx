import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Dimensions, View } from 'react-native'

import MapView, { Marker } from 'react-native-maps'

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

  const { coords } = useLocation()

  const { reqData, getTechnicalRequests } = useRequests()

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
    // console.log(data)
    if (!searchTerm) return data

    return data?.filter(
      (el) =>
        getTypeValue(el.type).includes(searchTerm) ||
        el.address.formattedAddress.includes(searchTerm),
    )
  }, [searchTerm, data, getTypeValue])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getData = async () => {
    const data: any = await getTechnicalRequests()
    if (data) setData(data)
  }

  const handleSelect = (request: any) => {
    console.log(request)
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
    getData()
  }, [reqData, getData])

  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      setCurrentRegion({
        latitude: Number(coords.latitude),
        longitude: Number(coords.longitude),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })
    }
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
  }, [requests, searchTerm])

  return (
    <Container>
      <MapView
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
        // region={currentRegion}
      >
        {reqData?.map((request: any) => {
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
                    // setCurrentSolicitacao(request);
                    setCurrentRegion({
                      latitude: Number(request.address.lat),
                      longitude: Number(request.address.long),
                      latitudeDelta: currentRegion.latitudeDelta,
                      longitudeDelta: currentRegion.longitudeDelta,
                    })
                    setModalVisible(true)
                  }}
                />
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

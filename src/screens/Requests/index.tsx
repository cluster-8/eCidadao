import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Dimensions } from 'react-native'

import MapView, { Marker } from 'react-native-maps'

import {
  Container,
  GetLocationButton,
  GetLocationIcon,
  Icon,
  SearchBar,
  SearchbarContent,
} from './styles'

import ModalDetails from '../../components/ModalDetails'

import { useLocation } from '../../hooks/useLocation'
import { useRequests } from '../../hooks/useRequests'

import formatReqStatus from '../../utils/formatReqStatus'
import formatReqType from '../../utils/formatReqType'

const { height, width } = Dimensions.get('window')
const delta = {
  latitudeDelta: 0.001,
  longitudeDelta: 0.001 * (width / height),
}

const Requests: React.FC = () => {
  const mapRef = useRef<MapView | null>(null)

  const { coords } = useLocation()

  const { getRequests, reqData } = useRequests()

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
    if (!searchTerm) return data

    return data?.filter(
      (el) =>
        formatReqType(el.type).includes(searchTerm) ||
        el.address.formattedAddress.includes(searchTerm),
    )
  }, [searchTerm, data])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getData = async () => {
    const data: any = await getRequests()
    if (data) setData(data)
  }

  const handleSelect = (request: any) => {
    setCurrentSolicitacao({
      createdAt: request.createdAt,
      identifier: request.identifier,
      image: request.image,
      status: request.status,
      type: request.type,
      address: request.address.formattedAddress,
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

  // useEffect(() => {
  //   ;(async () => await getData())()
  // }, [getData])

  useEffect(() => {
    getData()
  }, [reqData])

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
      {/* MAPA */}
      <MapView
        ref={mapRef}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
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
        {requests?.map((request: any, index: any) => (
          <Marker
            key={index}
            coordinate={{
              latitude: Number(request.address.lat),
              longitude: Number(request.address.long),
            }}
            title={formatReqType(request.type)}
            pinColor={
              formatReqStatus(request.status) === "Fechada"
                ? "#02842a"
                : "#cd0019"
            }
            onPress={() => {
              handleSelect(request);
              // setCurrentSolicitacao(request);
              setCurrentRegion({
                latitude: Number(request.address.lat),
                longitude: Number(request.address.long),
                latitudeDelta: currentRegion.latitudeDelta,
                longitudeDelta: currentRegion.longitudeDelta,
              });
              setModalVisible(true);
            }}
          />
        ))}
      </MapView>
      {/* BARRA DE PESQUISA */}
      <SearchbarContent>
        <Icon name="magnifying-glass" size={25} color={"#004997"} />
        <SearchBar
          placeholder={"Buscar"}
          placeholderTextColor={"#666"}
          onChangeText={(text: any) => setSearchTerm(text)}
        />
      </SearchbarContent>
      {/* BOTÃO LOCALIZAÇÃO ATUAL */}
      <GetLocationButton onPress={handleGoToMyLocation}>
        <GetLocationIcon name="crosshair" size={25} />
      </GetLocationButton>
      {/* MODAL DETALHES */}
      <ModalDetails
        data={currentSolicitacao}
        modalVisible={modalVisible}
        handleClose={() => setModalVisible(false)}
      />
    </Container>
  );
}

export default Requests

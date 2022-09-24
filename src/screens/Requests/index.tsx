import React, { useState, useEffect, useMemo } from 'react'
import { Dimensions } from 'react-native'

import MapView, { Marker } from 'react-native-maps'

import {
  Container,
  SearchbarContent,
  SearchBar,
  Icon,
  GetLocationButton,
} from './styles'

import ModalDetails from '../../components/ModalDetails'

import { useLocation } from '../../hooks/useLocation'
import { useRequests } from '../../hooks/useRequests'

import formatReqType from '../../utils/formatReqType'
import formatReqStatus from '../../utils/formatReqStatus'

const Requests: React.FC = () => {
  const { coords } = useLocation()

  const { getRequests } = useRequests()

  const [data, setData] = useState<any[]>()

  const [modalVisible, setModalVisible] = useState(false)

  const [currentSolicitacao, setCurrentSolicitacao] = useState({})

  const [currentRegion, setCurrentRegion] = useState({
    latitude: Number(coords.latitude),
    longitude: Number(coords.longitude),
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  })

  const [searchTerm, setSearchTerm] = useState('')

  const requests: any = useMemo(() => {
    if (!searchTerm) return data
    return data?.filter(
      (el) =>
        formatReqType(el.type).includes(searchTerm) ||
        el.adress.formattedAdress.includes(searchTerm),
    )
  }, [searchTerm, data])

  const getData = async () => {
    // const query = {
    //   select: "name city state picture",
    //   populate: [{ path: "cultives", select: "id" }],
    //   filter: [{ path: "userId", operator: "equals", value: authUser.id }],
    // };
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
      adress: request.adress.formattedAdress,
      description: request.description,
    })
  }

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  useEffect(() => {
    ;(async () => await getData())()
  }, [])

  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      setCurrentRegion({
        latitude: Number(coords.latitude),
        longitude: Number(coords.longitude),
        latitudeDelta: 0.00001,
        longitudeDelta: 0.00001,
      })
    }
  }, [coords])

  useEffect(() => {
    if (requests?.length && searchTerm) {
      setCurrentRegion({
        latitude: Number(requests[0].adress.lat),
        longitude: Number(requests[0].adress.long),
        latitudeDelta: 0.00001,
        longitudeDelta: 0.00001,
      })
    }
  }, [requests])

  return (
    <Container>
      {/* MAPA */}
      <MapView
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
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
        {requests?.map((request: any, index: any) => (
          <Marker
            key={index}
            coordinate={{
              latitude: Number(request.adress.lat),
              longitude: Number(request.adress.long),
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
                latitude: Number(request.adress.lat),
                longitude: Number(request.adress.long),
                latitudeDelta: currentRegion.latitudeDelta,
                longitudeDelta: currentRegion.longitudeDelta,
              })
              setModalVisible(true)
            }}
          />
        ))}
      </MapView>
      {/* BARRA DE PESQUISA */}
      <SearchbarContent>
        <Icon name="magnifying-glass" size={25} color={'#004997'} />
        <SearchBar
          placeholder={'Buscar'}
          placeholderTextColor={'#666'}
          onChangeText={(text: any) => setSearchTerm(text)}
        />
      </SearchbarContent>
      {/* BOTÃO LOCALIZAÇÃO ATUAL */}
      <GetLocationButton></GetLocationButton>
      {/* MODAL DETALHES */}
      <ModalDetails
        data={currentSolicitacao}
        modalVisible={modalVisible}
        handleClose={() => setModalVisible(false)}
      />
    </Container>
  )
}

export default Requests

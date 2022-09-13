import React, { useState, useEffect, useMemo } from "react";
import { Dimensions } from "react-native";

import MapView, { Marker } from "react-native-maps";

import { Container, SearchbarContent, SearchBar, Icon } from './styles'

import ModalDetails from "../../components/ModalDetails";

import { useLocation } from "../../hooks/useLocation";

import { mockSolicitacoes } from '../../utils/data';

const Requests: React.FC = () => {
  const { coords } = useLocation();

  const [modalVisible, setModalVisible] = useState(false);

  const [currentSolicitacao, setCurrentSolicitacao] = useState({});

  const [currentRegion, setCurrentRegion] = useState({
    latitude: coords.latitude,
    longitude: coords.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const solicitacoes = useMemo(() => {
    if (!searchTerm) return mockSolicitacoes;
    return mockSolicitacoes.filter((el) => {
      el.tipo.includes(searchTerm) ||
        el.endereco.logradouro.includes(searchTerm) ||
        el.endereco.bairro.includes(searchTerm);
    });
  }, [searchTerm]);

  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      setCurrentRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.00001,
        longitudeDelta: 0.00001,
      });
    }
  }, [coords]);

  return (
    <Container>
      {/* MAPA */}
      <MapView
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
        showsUserLocation={true}
        userLocationUpdateInterval={5000}
        followsUserLocation={true}
        // showsMyLocationButton={true}
        // showsCompass={true}
        loadingEnabled={true}
        moveOnMarkerPress={true}
        initialRegion={currentRegion}
        region={currentRegion}
      >
        {solicitacoes.map((solicitacao, index) => (
          <Marker
            key={index}
            coordinate={solicitacao.coordinate}
            title={solicitacao.tipo}
            pinColor={solicitacao.status === "fechado" ? "#02842a" : "#cd0019"}
            onPress={() => {
              setCurrentSolicitacao(solicitacao);
              setCurrentRegion({
                latitude: solicitacao.coordinate.latitude,
                longitude: solicitacao.coordinate.longitude,
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
        <Icon
          name="magnifying-glass"
          size={25}
          color={"#004997"}
        />
        <SearchBar
          placeholder={"Buscar"}
          placeholderTextColor={"#666"}
          onChangeText={(text: any) => setSearchTerm(text)}
        />
      </SearchbarContent>
      {/* MODAL DETALHES */}
      <ModalDetails
        data={currentSolicitacao}
        modalVisible={modalVisible}
        handleClose={() => setModalVisible(false)}
      />
    </Container>
  );
};

export default Requests;

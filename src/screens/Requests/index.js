import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet, View, Dimensions, TextInput } from "react-native";

import MapView, { Marker } from "react-native-maps";

import ModalDetails from "../../components/ModalDetails";

import { useLocation } from "../../hooks/useLocation";

import { Entypo } from "@expo/vector-icons";

let mockSolicitacoes = [
  {
    id: "0",
    tipo: "Poda",
    descricao: "Poda da árvore que está na calçada em frente minha casa",
    status: "aberto",
    imagem: {
      uri: "https://images.unsplash.com/photo-1615175501566-bf70987183b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1463&q=80",
    },
    endereco: {
      logradouro: "",
      numero: "",
      bairro: "",
      cep: "",
    },
    coordinate: {
      latitude: -23.374296179999995,
      longitude: -45.671764369999984,
    },
  },
  {
    id: "1",
    tipo: "Iluminação",
    descricao: "Troca de lâmpada do poste que está em frente a minha casa",
    status: "fechado",
    imagem: {
      uri: "https://images.unsplash.com/photo-1615175501566-bf70987183b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1463&q=80",
    },
    endereco: {
      logradouro: "",
      numero: "",
      bairro: "",
      cep: "",
    },
    coordinate: {
      latitude: -23.3740262,
      longitude: -45.673219,
    },
  },
  {
    id: "2",
    tipo: "Roçado",
    descricao: "Roçado do terreno baldio ao lado de casa",
    status: "aberto",
    imagem: {
      uri: "https://images.unsplash.com/photo-1615175501566-bf70987183b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1463&q=80",
    },
    endereco: {
      logradouro: "",
      numero: "",
      bairro: "",
      cep: "",
    },
    coordinate: {
      latitude: -23.3735461,
      longitude: -45.6742159,
    },
  },
];

const Requests = () => {
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

    return mockSolicitacoes.filter(
      (el) =>
        el.tipo.includes(searchTerm) ||
        el.endereco.logradouro.includes(searchTerm) ||
        el.endereco.bairro.includes(searchTerm)
    );
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

  useEffect(() => {
    console.log(solicitacoes);
  }, [solicitacoes]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
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
      <View style={{ position: "absolute", top: 10, width: "100%" }}>
        <Entypo
          name="magnifying-glass"
          size={25}
          style={styles.icon}
          color={"#004997"}
        />
        <TextInput
          style={styles.searchBar}
          placeholder={"Buscar"}
          placeholderTextColor={"#666"}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>
      <ModalDetails
        data={currentSolicitacao}
        modalVisible={modalVisible}
        handleClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchBar: {
    borderRadius: 10,
    margin: 20,
    color: "#000",
    borderColor: "#004997",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  icon: {
    position: "absolute",
    top: 30,
    zIndex: 1,
    right: 35,
  },
});

export default Requests;

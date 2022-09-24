// import React, { useState, useEffect } from "react";
// import {
//   Modal,
//   StyleSheet,
//   Text,
//   Pressable,
//   ImageBackground,
//   View,
//   Dimensions,
//   TextInput,
// } from "react-native";

// import MapView from "react-native-maps";
// import { Marker } from "react-native-maps";

// import ModalDetails from "../../components/ModalDetails";

// // import { Container } from './styles';

// let mockSolicitacoes = [
//   {
//     id: "0",
//     tipo: "Poda",
//     descricao: "Poda da árvore que está na calçada em frente minha casa",
//     status: "aberto",
//     imagem: {
//       uri: "https://images.unsplash.com/photo-1615175501566-bf70987183b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1463&q=80",
//     },
//     endereco: {
//       logradouro: "",
//       numero: "",
//       bairro: "",
//       cep: "",
//     },
//     coordinate: {
//       latitude: -23.374296179999995,
//       longitude: -45.671764369999984,
//     },
//   },
//   {
//     id: "1",
//     tipo: "Iluminação",
//     descricao: "Troca de lâmpada do poste que está em frente a minha casa",
//     status: "fechado",
//     imagem: {
//       uri: "https://images.unsplash.com/photo-1615175501566-bf70987183b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1463&q=80",
//     },
//     endereco: {
//       logradouro: "",
//       numero: "",
//       bairro: "",
//       cep: "",
//     },
//     coordinate: {
//       latitude: -23.3740262,
//       longitude: -45.673219,
//     },
//   },
//   {
//     id: "2",
//     tipo: "Roçado",
//     descricao: "Roçado do terreno baldio ao lado de casa",
//     status: "aberto",
//     imagem: {
//       uri: "https://images.unsplash.com/photo-1615175501566-bf70987183b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1463&q=80",
//     },
//     endereco: {
//       logradouro: "",
//       numero: "",
//       bairro: "",
//       cep: "",
//     },
//     coordinate: {
//       latitude: -23.3735461,
//       longitude: -45.6742159,
//     },
//   },
// ];

// const SignIn = () => {
//   const [modalVisible, setModalVisible] = useState(false);

//   const [currentSolicitacao, setCurrentSolicitacao] = useState({});

//   const [currentRegion, setCurrentRegion] = useState({
//     latitude: -23.374296179999995,
//     longitude: -45.671764369999984,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//   });

//   useEffect(() => {
//     // setCurrentRegion();
//   }, []);

//   return (
//     // <View>
//     //   <Text>Tela de Login</Text>
//     // </View>
//     <View style={styles.container}>
//       {/* MAPA */}
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: -23.374296179999995,
//           longitude: -45.671764369999984,
//           latitudeDelta: 1.1022,
//           longitudeDelta: 1.0921,
//         }}
//         region={currentRegion}
//       >
//         {mockSolicitacoes.map((solicitacao, index) => (
//           <Marker
//             key={index}
//             coordinate={solicitacao.coordinate}
//             title={solicitacao.tipo}
//             // description={solicitacao.descricao}
//             pinColor={solicitacao.status === "fechado" ? "#02842a" : "#cd0019"}
//             onPress={() => {
//               setCurrentSolicitacao(solicitacao);
//               setCurrentRegion({
//                 latitude: solicitacao.coordinate.latitude,
//                 longitude: solicitacao.coordinate.longitude,
//                 // latitudeDelta: currentRegion.latitudeDelta,
//                 // longitudeDelta: currentRegion.longitudeDelta,
//               });
//               setModalVisible(true);
//             }}
//           />
//         ))}
//       </MapView>
//       {/* BARRA DE PESQUISA */}
//       <View style={{ position: "absolute", top: 10, width: "100%" }}>
//         <TextInput
//           style={styles.searchBar}
//           placeholder={"Buscar"}
//           placeholderTextColor={"#666"}
//         />
//       </View>
//       {/* MODAL DETALHES */}
//       <ModalDetails
//         data={currentSolicitacao}
//         modalVisible={modalVisible}
//         handleClose={() => setModalVisible(false)}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   map: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
//   searchBar: {
//     borderRadius: 30,
//     margin: 20,
//     color: "#000",
//     borderColor: "#004997",
//     backgroundColor: "#FFF",
//     borderWidth: 1,
//     height: 45,
//     paddingHorizontal: 10,
//     fontSize: 18,
//   },
// });

// export default SignIn;

import React from 'react'

import { Container, Title } from './styles'

const SignIn: React.FC = () => {
  return (
    <Container>
      <Title>Sign In</Title>
    </Container>
  )
}

export default SignIn

import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  ImageBackground,
  View,
} from "react-native";

import { Entypo } from "@expo/vector-icons";

const ModalDetails = (props) => {
  //   const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          //   Alert.alert("Modal has been closed.");
          props.handleClose();
        }}
      >
        <View style={styles.centeredView} onPress={props.handleClose}>
          <View style={styles.modalView}>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={props.data.imagem}
                imageStyle={{
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
                resizeMode="cover"
                style={styles.image}
              >
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={props.handleClose}
                >
                  <Entypo name="cross" size={20} />
                </Pressable>
              </ImageBackground>
            </View>

            <View style={styles.descriptionView}>
              <Text style={styles.title}>Solicitação: #0001</Text>
              <View style={styles.infoRowContainer}>
                <View style={styles.iconContainer}>
                  <Entypo
                    name="location-pin"
                    size={22}
                    style={styles.icon}
                    color={"#d1345b"}
                  />
                </View>
                <Text style={styles.info}>
                  {`Rua Germano Vieira Gonçalves, nº 77 - Bairro Bela Vista - CEP: 12260-000`}
                </Text>
              </View>
              <View style={styles.infoRowContainer}>
                <View style={styles.iconContainer}>
                  <Entypo
                    name="calendar"
                    size={22}
                    style={styles.icon}
                    color={"#d1345b"}
                  />
                </View>
                <Text style={styles.info}>{`Submetido em: 09/09/2022`}</Text>
              </View>
              <View style={styles.infoRowContainer}>
                <View style={styles.iconContainer}>
                  <Entypo
                    name="tag"
                    size={22}
                    style={styles.icon}
                    color={"#d1345b"}
                  />
                </View>
                <Text style={styles.info}>{`Árvore - Poda`}</Text>
              </View>
              <View style={styles.infoRowContainer}>
                <View style={styles.iconContainer}>
                  <Entypo
                    name="text"
                    size={22}
                    style={styles.icon}
                    color={"#d1345b"}
                  />
                </View>
                <Text
                  style={styles.info}
                >{`Necessário a realização da poda do Ypê`}</Text>
              </View>
              <View style={styles.infoRowContainer}>
                <View style={styles.iconContainer}>
                  <Entypo
                    name="warning"
                    size={22}
                    style={styles.icon}
                    color={"#d1345b"}
                  />
                </View>
                <Text style={styles.info}>{`Aberta`}</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    marginBottom: -20,
  },
  modalView: {
    margin: 20,
    width: "100%",
    height: "90%",
    marginTop: "auto",
    marginBottom: 0,
    backgroundColor: "#F6F6F6",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  buttonClose: {
    backgroundColor: "#F6F6F6",
    opacity: 0.5,
    position: "absolute",
    top: 10,
    left: "90%",
    // width: 50,
    // height: 50,
    // backgroundColor: "skyblue",
  },
  imageContainer: {
    flex: 1,
    width: "100%",
  },
  descriptionView: {
    flex: 2,
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },
  title: {
    color: "#3F3E40",
    fontSize: 30,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },
  infoRowContainer: {
    padding: 6,
    flexDirection: "row",
  },
  iconContainer: {
    width: "15%",
    flex: 1,
  },
  info: {
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    fontSize: "14",
    fontFamily: "Poppins_400Regular",
    // color: "#777777",
  },
});

export default ModalDetails;

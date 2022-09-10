import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  ImageBackground,
  View,
} from "react-native";

import { Entypo, Feather } from "@expo/vector-icons";

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
            <ImageBackground
              source={props.data.imagem}
              imageStyle={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
              resizeMode="cover"
              style={styles.image}
            >
              <Pressable
                style={[styles.button, styles.buttonClose]}
                //   onPress={() => setModalVisible(!modalVisible)}
                onPress={props.handleClose}
              >
                {/* <Text style={styles.textStyle}>Hide Modal</Text> */}
                <Entypo name="cross" size={20} />
              </Pressable>
            </ImageBackground>

            <View style={styles.descriptionView}>
              <Text style={styles.text}>Inside</Text>
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
    // height: "100%",
  },
  descriptionView: {},
  modalView: {
    margin: 20,
    width: "100%",
    height: "90%",
    marginTop: "auto",
    marginBottom: 0,
    // marginBottom: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#fff",
    opacity: 0.5,
    position: "absolute",
    top: 10,
    left: "85%",
    // width: 50,
    // height: 50,
    // backgroundColor: "skyblue",
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
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    height: "50%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },
  text: {
    color: "black",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#fff",
    opacity: 0.9,
    marginBottom: 20,
    borderRadius: 30,
  },
});

export default ModalDetails;

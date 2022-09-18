import React from "react";
import { Modal } from "react-native";

import {
  Container,
  Content,
  ModalContent,
  CloseButton,
  ImageContent,
  DescriptionContainer,
  Image,
  Title,
  InfoRow,
  IconContainer,
  Info,
} from './styles';

import { Entypo } from "@expo/vector-icons";

interface IModalDetails {
  data: any;
  modalVisible: boolean;
  handleClose: any;
}

const ModalDetails: React.FC<IModalDetails> = (props) => {
  //   const [modalVisible, setModalVisible] = useState(false);

  return (
    <Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          //   Alert.alert("Modal has been closed.");
          props.handleClose();
        }}
      >
        <Content onPress={props.handleClose}>
          <ModalContent>
            <ImageContent>
              <Image
                source={props.data.imagem}
                imageStyle={{
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
                resizeMode="cover"
              >
                <CloseButton
                  onPress={props.handleClose}
                >
                  <Entypo name="cross" size={20} />
                </CloseButton>
              </Image>
            </ImageContent>

            <DescriptionContainer>
              <Title>Solicitação: #0001</Title>

              <InfoRow>
                <IconContainer>
                  <Entypo
                    name="location-pin"
                    size={22}
                    color={"#d1345b"}
                  />
                </IconContainer>

                <Info>
                  {`Rua Germano Vieira Gonçalves, nº 77 - Bairro Bela Vista - CEP: 12260-000`}
                </Info>
              </InfoRow>

              <InfoRow>
                <IconContainer>
                  <Entypo
                    name="calendar"
                    size={22}
                    color={"#d1345b"}
                  />
                </IconContainer>

                <Info>{`Submetido em: 09/09/2022`}</Info>
              </InfoRow>

              <InfoRow>
                <IconContainer>
                  <Entypo
                    name="tag"
                    size={22}
                    color={"#d1345b"}
                  />
                </IconContainer>

                <Info>{`Árvore - Poda`}</Info>
              </InfoRow>

              <InfoRow>
                <IconContainer>
                  <Entypo
                    name="text"
                    size={22}
                    color={"#d1345b"}
                  />
                </IconContainer>

                <Info>{`Necessário a realização da poda do Ypê`}</Info>
              </InfoRow>

              <InfoRow>
                <IconContainer>
                  <Entypo
                    name="warning"
                    size={22}
                    color={"#d1345b"}
                  />
                </IconContainer>

                <Info>{`Aberta`}</Info>
              </InfoRow>
            </DescriptionContainer>
          </ModalContent>
        </Content>
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
    </Container>
  );
};

// const styles = StyleSheet.create({
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center",
//   },
//   container: {
//     flex: 1,
//   },
//   iconContainer: {
//     width: "15%",
//     flex: 1,
//   },
//   info: {
//     alignItems: "center",
//     justifyContent: "center",
//     width: "85%",
//     fontSize: "14",
//     fontFamily: "Poppins_400Regular",
//     // color: "#777777",
//   },
// });

export default ModalDetails;
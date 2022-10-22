/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { Modal, ScrollView } from 'react-native'

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
} from './styles'

import { Entypo } from '@expo/vector-icons'

import formatReqStatus from '../../utils/formatReqStatus'
import formatReqType from '../../utils/formatReqType'

interface IModalDetails {
  data: any
  modalVisible: boolean
  handleClose: any
}

const ModalDetails: React.FC<IModalDetails> = (props) => {
  return (
    <Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => props.handleClose()}
      >
        <Content onPress={props.handleClose}>
          <ModalContent>
            <ImageContent>
              <Image
                source={{ uri: props?.data.image }}
                resizeMode="cover"
              >
                <CloseButton onPress={props.handleClose}>
                  <Entypo name="cross" size={33} />
                </CloseButton>
              </Image>
            </ImageContent>

            <DescriptionContainer>
              <ScrollView>
                <Title>{`Solicitação: #${props?.data.identifier}`}</Title>

                <InfoRow>
                  <IconContainer>
                    <Entypo name="location-pin" size={22} color={'#d1345b'} />
                  </IconContainer>

                  <Info>{props?.data.address}</Info>
                </InfoRow>

                <InfoRow>
                  <IconContainer>
                    <Entypo name="calendar" size={22} color={'#d1345b'} />
                  </IconContainer>

                  <Info>{`Submetido em ${new Date(
                    props?.data.createdAt,
                  ).toLocaleDateString()}`}</Info>
                </InfoRow>

                <InfoRow>
                  <IconContainer>
                    <Entypo name="tag" size={22} color={'#d1345b'} />
                  </IconContainer>

                  <Info>{props?.data.type}</Info>
                </InfoRow>

                <InfoRow>
                  <IconContainer>
                    <Entypo name="text" size={22} color={'#d1345b'} />
                  </IconContainer>

                  <Info>{props?.data.description}</Info>
                </InfoRow>

                <InfoRow>
                  <IconContainer>
                    <Entypo name="warning" size={22} color={'#d1345b'} />
                  </IconContainer>

                  <Info>{formatReqStatus(props?.data.status)}</Info>
                </InfoRow>
              </ScrollView>
            </DescriptionContainer>
          </ModalContent>
        </Content>
      </Modal>
    </Container>
  )
}

export default ModalDetails

/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react'
import { Modal, ScrollView } from 'react-native'
import { RFHeight } from '../../utils/getResponsiveSizes'
import { useRoute } from '@react-navigation/native'

import {
  DescriptionContainer,
  FinalizeButton,
  TitleContainer,
  IconContainer,
  ModalContent,
  ImageContent,
  CloseButton,
  Container,
  InfoRow,
  Content,
  BtnText,
  Image,
  Title,
  Info,
} from './styles'

import formatReqStatus from '../../utils/formatReqStatus'
import formatDate from '../../utils/formatDate'

import { useCamera } from '../../hooks/useCamera'
import { useAuth } from '../../hooks/useAuth'

import { Entypo } from '@expo/vector-icons'

interface IModalDetails {
  modalVisible: boolean
  handleClose: any
  data: any
}

const ModalDetails: React.FC<IModalDetails> = (props) => {
  const { authUser } = useAuth()

  const route = useRoute()

  const {
    // hasCameraPermission,
    // getCameraPermissions,
    setOpenCamera,
    // orientation,
    // openCamera,
    // camType,
  } = useCamera()

  function handleClick() {
    setOpenCamera(true)
  }

  useEffect(() => {}, [])

  return (
    <>
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
                <Image source={{ uri: props?.data.image }} resizeMode="cover">
                  <CloseButton onPress={props.handleClose}>
                    <Entypo name="cross" size={RFHeight(30)} />
                  </CloseButton>
                </Image>
              </ImageContent>
              <ScrollView>
              <DescriptionContainer>
                  <TitleContainer>
                    <Title>{`Solicitação: #${props?.data.identifier}`}</Title>
                    {authUser.role !== 'client' &&
                    props?.data.status === 'opened' &&
                    route.name === 'Início' ? (
                      <FinalizeButton onPress={() => handleClick()}>
                        <BtnText>Finalizar</BtnText>
                        <Entypo
                          name="check"
                          size={RFHeight(22)}
                          color={'#fff'}
                        />
                      </FinalizeButton>
                    ) : (
                      <></>
                    )}
                  </TitleContainer>

                  <InfoRow>
                    <IconContainer>
                      <Entypo
                        name="location-pin"
                        size={RFHeight(22)}
                        color={'#d1345b'}
                      />
                    </IconContainer>

                    <Info>{props?.data.address}</Info>
                  </InfoRow>

                  <InfoRow>
                    <IconContainer>
                      <Entypo
                        name="calendar"
                        size={RFHeight(22)}
                        color={'#d1345b'}
                      />
                    </IconContainer>

                    <Info>{`Submetido em ${formatDate(
                      props?.data.createdAt,
                    )}`}</Info>
                  </InfoRow>

                  <InfoRow>
                    <IconContainer>
                      <Entypo
                        name="tag"
                        size={RFHeight(22)}
                        color={'#d1345b'}
                      />
                    </IconContainer>

                    <Info>{props?.data.type}</Info>
                  </InfoRow>

                  <InfoRow>
                    <IconContainer>
                      <Entypo
                        name="text"
                        size={RFHeight(22)}
                        color={'#d1345b'}
                      />
                    </IconContainer>

                    <Info>{props?.data.description}</Info>
                  </InfoRow>

                  <InfoRow>
                    <IconContainer>
                      <Entypo
                        name="warning"
                        size={RFHeight(22)}
                        color={'#d1345b'}
                      />
                    </IconContainer>

                    <Info>{formatReqStatus(props?.data.status)}</Info>
                  </InfoRow>
              </DescriptionContainer>
              </ScrollView>
            </ModalContent>
          </Content>
        </Modal>
      </Container>
    </>
  )
}

export default ModalDetails

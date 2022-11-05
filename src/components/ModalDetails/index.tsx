/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react'
import { Modal, ScrollView } from 'react-native'
import { RFHeight } from '../../utils/getResponsiveSizes'
import { useRoute } from '@react-navigation/native'

import {
  DescriptionContainer,
  FinalizeButton,
  TitleContainer,
  ImageCarousel,
  IconContainer,
  ModalContent,
  ImageContent,
  CloseButton,
  FinishedTag,
  ImageView,
  Container,
  InfoRow,
  Content,
  BtnText,
  Image,
  Title,
  Info,
  DescriptionScrollView,
} from './styles'

import formatDate from '../../utils/formatDate'
import { useCamera } from '../../hooks/useCamera'
import { useTypes } from '../../hooks/useTypes'
import { useAuth } from '../../hooks/useAuth'

import { Entypo } from '@expo/vector-icons'

interface IModalDetails {
  modalVisible: boolean
  handleClose: any
  data: any
}

const ModalDetails: React.FC<IModalDetails> = (props) => {
  const { getTypeValue } = useTypes()
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

  if (!props.data) {
    return <></>
  }

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
              {props?.data?.status !== 'closed' ? (
                <>
                  <ImageContent>
                    <Image
                      source={{ uri: props?.data?.image }}
                      resizeMode="cover"
                    >
                      <CloseButton onPress={props.handleClose}>
                        <Entypo name="cross" size={RFHeight(30)} />
                      </CloseButton>
                    </Image>
                  </ImageContent>
                </>
              ) : (
                <>
                  <CloseButton onPress={props.handleClose}>
                    <Entypo name="cross" size={RFHeight(30)} />
                  </CloseButton>
                  <ImageCarousel horizontal>
                    <ImageView>
                      <Image source={{ uri: props?.data?.image }}></Image>
                    </ImageView>
                    <ImageView>
                      <Image
                        source={{ uri: props?.data?.finishedImage }}
                      ></Image>
                    </ImageView>
                  </ImageCarousel>
                </>
              )}

              <DescriptionContainer>
                <DescriptionScrollView>
                  <TitleContainer>
                    <Title>{`Solicitação: #${props?.data?.identifier}`}</Title>
                    {authUser.role !== 'client' &&
                    props?.data?.status === 'opened' &&
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
                      <>
                        {route.name !== 'Solicitações' && (
                          <FinishedTag>
                            <BtnText>Concluída</BtnText>
                            <Entypo
                              name="check"
                              size={RFHeight(22)}
                              color={'#fff'}
                            />
                          </FinishedTag>
                        )}
                      </>
                    )}
                  </TitleContainer>
                  <InfoRow>
                    <IconContainer>
                      <Entypo
                        name="tag"
                        size={RFHeight(22)}
                        color={'#d1345b'}
                      />
                    </IconContainer>

                    <Info>{getTypeValue(props?.data?.type)}</Info>
                  </InfoRow>

                  <InfoRow>
                    <IconContainer>
                      <Entypo
                        name="text"
                        size={RFHeight(22)}
                        color={'#d1345b'}
                      />
                    </IconContainer>

                    <Info>{props?.data?.description}</Info>
                  </InfoRow>

                  <InfoRow>
                    <IconContainer>
                      <Entypo
                        name="location-pin"
                        size={RFHeight(22)}
                        color={'#d1345b'}
                      />
                    </IconContainer>

                    <Info>{props?.data?.address?.formattedAddress}</Info>
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
                      props?.data?.createdAt,
                    )}`}</Info>
                  </InfoRow>

                  {/* <InfoRow>
                    <IconContainer>
                      <Entypo
                        name="warning"
                        size={RFHeight(22)}
                        color={"#d1345b"}
                      />
                    </IconContainer>

                    <Info>{formatReqStatus(props?.data.status)}</Info>
                  </InfoRow> */}

                  {props?.data?.finishedAt && (
                    <InfoRow>
                      <IconContainer>
                        <Entypo
                          name="check"
                          size={RFHeight(22)}
                          color={'#d1345b'}
                        />
                      </IconContainer>

                      <Info>{`Concluída em ${formatDate(
                        props?.data?.finishedAt,
                      )}`}</Info>
                    </InfoRow>
                  )}

                  {props?.data?.finishedDescription && (
                    <InfoRow>
                      <IconContainer>
                        <Entypo
                          name="flag"
                          size={RFHeight(22)}
                          color={'#d1345b'}
                        />
                      </IconContainer>

                      <Info>{`${props?.data?.finishedDescription}`}</Info>
                    </InfoRow>
                  )}
                </DescriptionScrollView>
              </DescriptionContainer>
            </ModalContent>
          </Content>
        </Modal>
      </Container>
    </>
  )
}

export default ModalDetails

import React, { useState, useRef, useEffect, useMemo } from 'react'
import {
  Alert,
  ScrollView,
  Dimensions,
  Text,
  Modal,
  Platform,
} from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'

import { Camera } from 'expo-camera'

import { PictureInput } from '../../components/PictureInput'
import { SelectInput } from '../../components/SelectInput'
import { TextInput } from '../../components/TextInput'
import { Button } from '../../components/Button'
import ModalTypes from '../../components/ModalTypes'

import { useLocation } from '../../hooks/useLocation'
import { useCamera } from '../../hooks/useCamera'
import { useTypes } from '../../hooks/useTypes'
import { useRequests } from '../../hooks/useRequests'

import { Feather } from '@expo/vector-icons'

import {
  Container,
  HeaderContainer,
  HeaderTitle,
  HeaderText,
  FormContainer,
  PictureContainer,
  CancelButtonContainer,
  ConfirmButtonContainer,
  CamBtnContainer,
  TouchableOpacity,
  ModalBody,
  ModalImage,
  ModalFooter,
  TouchableOpacityCam,
  RotateCamMessage,
  RotateCamContainer,
} from './styles'

import { firebase } from '../../../config'

const { height } = Dimensions.get('window')

// import ModalTypes from '../../components/ModalTypes'

const requestData = yup.object().shape({
  // image: yup.string().required('Imagem obrigatório'),
  // location: yup.string().required('Email obrigatório'),
  selectedType: yup.string(),
  description: yup.string(),
  addres: yup.string(),
})

const NewRequest: React.FC = () => {
  const { createRequest } = useRequests()
  const { getAddress } = useLocation()
  const {
    openCamera,
    setOpenCamera,
    // hasCameraPermission,
    // setHasCameraPermission,
    getCameraPermissions,
    camType,
    orientation,
  } = useCamera()
  const { openModalType, setOpenModalType, selectedType } = useTypes()

  // const [location, setLocation] = useState()
  const [type, setType] = useState()
  const [description, setDescription] = useState()
  const [address, setAddress] = useState<string | undefined>()
  const [photo, setPhoto] = useState<any>(null)

  const cameraRef: any = useRef()
  // const [hasCameraPermission, setHasCameraPermission] = useState<any>()
  const [modalVisible, setModalVisible] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(requestData),
  })

  useEffect(() => {
    // ;(async () => {
    //   const cameraPermission = await Camera.requestCameraPermissionsAsync()
    //   setHasCameraPermission(cameraPermission.status === 'granted')
    // })()
    getCameraPermissions()
  }, [])

  async function takePicture() {
    // const options = {
    //   quality: 1,
    //   base64: true,
    //   exif: false,
    // }

    if (cameraRef) {
      const data = await cameraRef?.current?.takePictureAsync()
      if (data) {
        setPhoto(data.uri)
        const res = await getAddress()
        if (res) setAddress(res)
        setModalVisible(true)
      }
    }
  }

  function discardPicture() {
    setOpenCamera(false)
    setPhoto(null)
    setModalVisible(false)
    setAddress('')
  }

  function confirmPicture() {
    setOpenCamera(false)
    setModalVisible(false)
  }

  async function uploadPicture(photo: any) {
    const response = await fetch(photo)
    const blob = await response.blob()
    const filename = photo.substring(photo.lastIndexOf('/') + 1)
    // const ref = firebase.storage().ref().child(filename).put(blob)
    const ref = firebase.storage().ref().child(filename)

    try {
      // await ref
      return ref.put(blob)
    } catch (error) {
      console.log(error)
    }
  }

  async function submitRequest() {
    const data = {
      selectedType,
      description,
      address,
      photo,
    }

    const res = await uploadPicture(photo)
    console.log('OOOOOppppaa', res)

    Alert.alert('Enviar', 'Solicitação de manutenção realizada com sucesso!', [
      {
        text: 'OK',
        onPress: () => {
          console.log('Ok pressed')
          // setImage('image')
          // setLocation(data.location)
          setType(data.selectedType)
          setDescription(data.description)
          setAddress(data.address)
        },
      },
    ])
  }

  const CamButton = useMemo(() => {
    return (
      <>
        {orientation === 'LANDSCAPE' ? (
          <CamBtnContainer>
            <TouchableOpacityCam onPress={takePicture}>
              <Feather name="camera" size={33} color={'#fff'} />
              <Text
                style={{ color: 'white', fontFamily: 'Poppins_600SemiBold' }}
              >
                capturar
              </Text>
            </TouchableOpacityCam>
          </CamBtnContainer>
        ) : (
          <RotateCamContainer>
            <RotateCamMessage>
              <Feather name="rotate-cw" size={33} color={'#fff'} />
              <Text
                style={{ color: 'white', fontFamily: 'Poppins_600SemiBold' }}
              >
                Vire a camera
              </Text>
            </RotateCamMessage>
          </RotateCamContainer>
        )}
      </>
    )
  }, [orientation])

  useEffect(() => {
    setPhoto(null)
  }, [])

  useEffect(() => {
    console.log(orientation)
    console.log(description)
  }, [orientation, description])

  return (
    <ScrollView style={{ height: '100%' }}>
      {openCamera ? (
        <>
          <Camera
            ref={cameraRef}
            type={camType}
            style={{ height, flexDirection: 'row' }}
          >
            {CamButton}
            {/* <CamBtnContainer>{CamButton}</CamBtnContainer> */}
          </Camera>
          {photo && (
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
            >
              <ModalBody>
                <HeaderContainer>
                  <HeaderTitle>Confirmar foto</HeaderTitle>
                  <HeaderText>
                    Verifique atentamente a foto registrada para garantir a
                    identificação do problema
                  </HeaderText>
                </HeaderContainer>
                <ModalImage source={{ uri: photo }} />
                <ModalFooter>
                  <CancelButtonContainer>
                    <TouchableOpacity onPress={discardPicture}>
                      <Feather name="x" size={33} color={'#fff'} />
                    </TouchableOpacity>
                  </CancelButtonContainer>
                  <ConfirmButtonContainer>
                    <TouchableOpacity onPress={confirmPicture}>
                      <Feather name="check" size={33} color={'#fff'} />
                    </TouchableOpacity>
                  </ConfirmButtonContainer>
                </ModalFooter>
              </ModalBody>
            </Modal>
          )}
        </>
      ) : (
        <>
          <Container
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={60}
          >
            <HeaderContainer>
              <HeaderTitle>Nova solicitação</HeaderTitle>
              <HeaderText>
                Adicione uma foto, um tipo e uma breve descrição do problema
              </HeaderText>
            </HeaderContainer>

            <FormContainer>
              <PictureContainer>
                <PictureInput
                  uri={photo}
                  placeholder="Foto"
                  updatePictureLabel="Foto selecionada"
                  onPress={() => setOpenCamera(true)}
                ></PictureInput>
              </PictureContainer>
              <TextInput
                label="Endereço"
                name="address"
                icon="map-pin"
                placeholder="Endereço"
                control={control}
                disabled
                defaultValue={address}
                errorMessage={errors?.address?.message}
              />

              <SelectInput
                label="Tipo"
                name="type"
                icon="chevron-down"
                placeholder="Tipo"
                control={control}
                defaultValue={selectedType?.value}
                errorMessage={errors?.type?.message}
                onPress={() => setOpenModalType(!openModalType)}
              />

              <TextInput
                label="Descrição"
                name="description"
                icon="info"
                placeholder="Descrição"
                control={control}
                // editable={false}
                defaultValue={description}
                errorMessage={errors?.description?.message}
              />

              <Button
                style={{ marginTop: 24 }}
                title="Enviar"
                onPress={handleSubmit(submitRequest)}
              />
            </FormContainer>
          </Container>
          <ModalTypes
            modalVisible={openModalType}
            handleClose={(val: boolean) => setOpenModalType(!val)}
          />
        </>
      )}
    </ScrollView>
  )
}

export default NewRequest

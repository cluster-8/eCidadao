import React, { useState, useRef, useEffect } from 'react'
import { Alert, ScrollView, Dimensions, Text, Modal } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'

import { Camera, CameraType } from 'expo-camera'

import { PictureInput } from '../../components/PictureInput'
import { SelectInput } from '../../components/SelectInput'
import { TextInput } from '../../components/TextInput'
import { Button } from '../../components/Button'
import ModalTypes from '../../components/ModalTypes'

import { useLocation } from '../../hooks/useLocation'
import { useCamera } from '../../hooks/useCamera'
import { useTypes } from '../../hooks/useTypes'

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
} from './styles'

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
  const { getAddress } = useLocation()
  const { openCamera, setOpenCamera } = useCamera()
  const { openModalType, setOpenModalType, selectedType } = useTypes()

  const camType = CameraType.back

  // const [location, setLocation] = useState()
  const [type, setType] = useState()
  const [description, setDescription] = useState()
  const [address, setAddress] = useState<String | undefined>()
  const [photo, setPhoto] = useState(null)

  const cameraRef = useRef()
  const [hasCameraPermission, setHasCameraPermission] = useState<any>()
  const [modalVisible, setModalVisible] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(requestData),
  })

  useEffect(() => {
    ;(async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync()
      setHasCameraPermission(cameraPermission.status === 'granted')
    })()
  }, [])

  async function takePicture() {
    // const options = {
    //   quality: 1,
    //   base64: true,
    //   exif: false,
    // }

    if (cameraRef) {
      const data = await cameraRef?.current?.takePictureAsync()
      console.log(data)
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

  function submitRequest() {
    console.log('Enviando solicitação...')
    const data = {
      // location,
      selectedType,
      description,
      address,
      photo,
    }

    console.log(data)

    // setLocation(data.location)
    setType(data.selectedType)
    setDescription(data.description)
    setAddress(data.address)

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

  useEffect(() => {
    setPhoto(null)
  }, [])

  return (
    <ScrollView style={{ height: '100%' }}>
      {openCamera ? (
        <>
          <Camera
            ref={cameraRef}
            type={camType}
            style={{ height, flexDirection: 'row' }}
          >
            <CamBtnContainer>
              <TouchableOpacity onPress={takePicture}>
                <Feather name="camera" size={33} color={'#fff'} />
                <Text
                  style={{ color: 'white', fontFamily: 'Poppins_400Regular' }}
                >
                  capturar
                </Text>
              </TouchableOpacity>
            </CamBtnContainer>
          </Camera>
          {photo && (
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
            >
              <ModalBody>
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
          <Container>
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

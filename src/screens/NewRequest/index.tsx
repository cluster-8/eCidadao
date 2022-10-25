import React, { useState, useRef, useEffect, useMemo } from 'react'
import { firebase } from '../../../config'
import {
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Platform,
  Modal,
  Text,
} from 'react-native'

import { yupResolver } from '@hookform/resolvers/yup'
import { Feather } from '@expo/vector-icons'
import { Camera } from 'expo-camera'
import * as yup from 'yup'

import { PictureInput } from '../../components/PictureInput'
import { SelectInput } from '../../components/SelectInput'
import { TextInput } from '../../components/TextInput'
import ModalTypes from '../../components/ModalTypes'
import { Button } from '../../components/Button'

import { useLocation } from '../../hooks/useLocation'
import { useRequests } from '../../hooks/useRequests'
import { useCamera } from '../../hooks/useCamera'
import { useTypes } from '../../hooks/useTypes'

import {
  ConfirmButtonContainer,
  ActivityIndicatorView,
  CancelButtonContainer,
  TouchableOpacityCam,
  RotateCamContainer,
  PictureContainer,
  RotateCamMessage,
  TouchableOpacity,
  HeaderContainer,
  CamBtnContainer,
  FormContainer,
  HeaderTitle,
  ModalFooter,
  HeaderText,
  ModalImage,
  Container,
  ModalBody,
} from './styles'
import { useForm } from 'react-hook-form'
import { RFHeight } from '../../utils/getResponsiveSizes'

const { height } = Dimensions.get('window')

const schema = yup.object().shape({
  selectedType: yup.string(),
  description: yup.string(),
  imageUrl: yup.string(),
  address: yup.string(),
})

const NewRequest: React.FC = () => {
  const { openModalType, setOpenModalType, selectedType, setSelectedType } =
    useTypes()

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { getAddress, coords } = useLocation()
  const { createRequest, reqData } = useRequests()

  const {
    hasCameraPermission,
    getCameraPermissions,
    setOpenCamera,
    orientation,
    openCamera,
    camType,
  } = useCamera()

  const [description, setDescription] = useState<string | undefined>('')
  const [modalVisible, setModalVisible] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [address, setAddress] = useState<string | undefined>()
  const [location, setLocation] = useState<any>()
  const [photo, setPhoto] = useState<any>(null)
  // const [type, setType] = useState(null)
  const [image, setImage] = useState('')
  const [data, setData] = useState<any>()

  const cameraRef: any = useRef()

  async function takePicture() {
    if (cameraRef) {
      const data = await cameraRef?.current?.takePictureAsync()
      if (data) {
        setPhoto(data.uri)
        const res = await getAddress()
        if (res) {
          console.log(res)
          setAddress(res.formattedAddress)
          setLocation(res)
        }
        setModalVisible(true)
      }
    }
  }

  function discardPicture() {
    setOpenCamera(false)
    setPhoto(null)
    setModalVisible(false)
    setAddress('')
    setSelectedType(null)
  }

  function confirmPicture() {
    setOpenCamera(false)
    setModalVisible(false)
  }

  const uploadImage = async () => {
    const blob: any = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.onload = function () {
        resolve(xhr.response)
      }

      xhr.onerror = function () {
        reject(new TypeError('Network request failed'))
      }

      xhr.responseType = 'blob'

      xhr.open('GET', photo, true)

      xhr.send(null)
    })

    const filename = photo.substring(photo.lastIndexOf('/') + 1)

    const ref = firebase.storage().ref().child(filename)

    const snapshot = ref.put(blob)

    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true)
        console.log('Uploading image...')
      },
      (error) => {
        setUploading(false)
        console.log(error)
        blob.close()
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          console.log('Download URL: ', url)
          setUploading(false)
          setImage(url)
          blob.close()
          return url
        })
      },
    )
  }

  async function submitRequest(data: any) {
    await uploadImage()
    setData({
      type: selectedType?.key,
      description: data.description,
      image,
      address: {
        lat: coords.latitude,
        long: coords.longitude,
        city: location.city,
        formattedAddress: location.formattedAddress,
        number: location.number,
        state: location.state,
        street: location.street,
        zipcode: location.zipcode,
      },
    })
  }

  const CamButton = useMemo(() => {
    return (
      <>
        {orientation === 'LANDSCAPE' ? (
          <CamBtnContainer>
            <TouchableOpacityCam onPress={takePicture}>
              <Feather name="camera" size={RFHeight(33)} color={'#fff'} />
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
              <Feather name="rotate-cw" size={RFHeight(33)} color={'#fff'} />
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

  async function handleRequestSubmit() {
    const res = await createRequest(data)
    if (res) {
      setAddress('')
      setPhoto(null)
      setValue('description', '')
      setValue('selectedType', '')
      setSelectedType(null)
    }
  }

  useEffect(() => {
    getCameraPermissions()
  }, [])

  useEffect(() => {
    setPhoto(null)
  }, [])

  useEffect(() => {
    register('description')
  }, [register])

  useEffect(() => {
    if (!selectedType || image.length === 0) return
    setData({ ...data, type: selectedType.key, image })
  }, [image])

  useEffect(() => {
    handleRequestSubmit()
  }, [data])

  useEffect(() => {
    if (hasCameraPermission !== 'granted') getCameraPermissions()
  }, [openCamera])

  return (
    <>
      {uploading ? (
        <ActivityIndicatorView>
          <HeaderContainer>
            <HeaderTitle>Enviando solicitação</HeaderTitle>
            <HeaderText>
              Aguarde enquanto registramos sua solicitação
            </HeaderText>
          </HeaderContainer>
          <ActivityIndicator size="large" color="#004997" />
        </ActivityIndicatorView>
      ) : (
        <ScrollView style={{ height: '100%' }}>
          {openCamera ? (
            <>
              <Camera
                ref={cameraRef}
                type={camType}
                style={{ height, flexDirection: 'row' }}
              >
                {CamButton}
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
                          <Feather name="x" size={RFHeight(33)} color={'#fff'} />
                        </TouchableOpacity>
                      </CancelButtonContainer>
                      <ConfirmButtonContainer>
                        <TouchableOpacity onPress={confirmPicture}>
                          <Feather name="check" size={RFHeight(33)} color={'#fff'} />
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
                    errorMessage={errors?.address?.message}
                    defaultValue={address}
                    control={control}
                    placeholder="Endereço"
                    label="Endereço"
                    name="address"
                    icon="map-pin"
                    disabled
                  />

                  <SelectInput
                    onPress={() => setOpenModalType(!openModalType)}
                    errorMessage={errors?.type?.message}
                    defaultValue={selectedType?.value}
                    control={control}
                    icon="chevron-down"
                    placeholder="Tipo"
                    label="Tipo"
                    name="type"
                  />

                  <TextInput
                    onChangeText={(text: string) =>
                      setValue('description', text)
                    }
                    errorMessage={errors?.description?.message}
                    control={control}
                    defaultValue={description}
                    placeholder="Descrição"
                    label="Descrição"
                    name="description"
                    icon="info"
                  />

                  <Button
                    onPress={handleSubmit(submitRequest)}
                    style={{ marginTop: 24 }}
                    title="Enviar"
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
      )}
    </>
  )
}

export default NewRequest

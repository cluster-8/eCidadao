import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Dimensions, Text, Modal, ActivityIndicator } from 'react-native'
import { RequestCard } from '../../components/RequestCard'
import { TextInput } from '../../components/TextInput'
import { useRequests } from '../../hooks/useRequests'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useCamera } from '../../hooks/useCamera'
import { Camera } from 'expo-camera'
import { Feather } from '@expo/vector-icons'
import { firebase } from '../../../config'

import {
  FilterButtonsContainer,
  TabSelectorButtonTitle,
  ActivityIndicatorView,
  TabSelectorContainer,
  TouchableOpacityCam,
  TabSelectorButton,
  SearchContainer,
  FilterButtonText,
  FilterContainer,
  CamBtnContainer,
  HeaderContainer,
  TitleContainer,
  CardsContainer,
  FormContainer,
  ConfirmButton,
  DiscardButton,
  FilterButton,
  BtnContainer,
  HeaderTitle,
  HeaderText,
  ModalImage,
  ButtonText,
  Container,
  ModalBody,
  SubTitle,
  Title,
  Icon,
} from './styles'

import { RFHeight } from '../../utils/getResponsiveSizes'

const { height } = Dimensions.get('window')

const schema = yup.object().shape({
  searchTerm: yup.string(),
  solutionDescription: yup.string(),
})

const MyRequests: React.FC = () => {
  const [solutionDescription, setSolutionsDescription] = useState<string>()
  const [uploading, setUploading] = useState<boolean>(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [photo, setPhoto] = useState<any>(null)
  const [dataToSubmit, setDataToSubmit] = useState<any>()
  const [opened, setOpened] = useState(true)
  const [closed, setClosed] = useState(false)
  const [requestId, setRequestId] = useState<string>()
  const [image, setImage] = useState<string>()
  const cameraRef: any = useRef()

  const { getData, reqData, finalizeRequest } = useRequests()

  const {
    // hasCameraPermission,
    // getCameraPermissions,
    setOpenCamera,
    // orientation,
    openCamera,
    camType,
  } = useCamera()

  const [searchTerm, setSearchTerm] = useState<any>('')
  const [sortByDate, setSortByDate] = useState(1)
  const [sortByCode, setSortByCode] = useState(1)
  const [sortByType, setSortByType] = useState(1)
  const [activeSort, setActiveSort] = useState('')

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleChangeTab = (selectedTab: 'opened' | 'closed') => {
    if (selectedTab === 'opened') {
      setOpened(true)
      setClosed(false)
    } else {
      setClosed(true)
      setOpened(false)
    }
  }

  function handleSort(sortBy: any) {
    setActiveSort(sortBy)
    if (sortBy === 'byDate') setSortByDate(sortByDate * -1)
    if (sortBy === 'byCode') setSortByCode(sortByCode * -1)
    if (sortBy === 'byType') setSortByType(sortByType * -1)
  }

  function discard() {
    setOpenCamera(false)
    setPhoto(null)
    setModalVisible(false)
  }

  async function confirm(data: any) {
    setDataToSubmit(data)
    setUploading(true)
    setOpenCamera(false)
    setModalVisible(false)
    await uploadImage()
  }

  const sortedData = useMemo(() => {
    if (!reqData) return
    if (activeSort === 'byDate') {
      if (sortByDate === 1) {
        const sorted = reqData.sort(
          (a: any, b: any) => a.createdAt > b.createdAt,
        )
        return sorted
      } else {
        const sorted = reqData.sort(
          (a: any, b: any) => a.createdAt < b.createdAt,
        )
        return sorted
      }
    }
    if (activeSort === 'byCode') {
      if (sortByCode === 1) {
        console.log('asc')
        const sorted = reqData.sort(
          (a: any, b: any) => a.identifier - b.identifier,
        )
        return sorted
      } else {
        const sorted = reqData.sort(
          (a: any, b: any) => b.identifier - a.identifier,
        )
        return sorted
      }
    }
    if (activeSort === 'byType') {
      if (sortByType === 1) {
        console.log('asc')
        const sorted = reqData.sort((a: any, b: any) => a.type > b.type)
        return sorted
      } else {
        const sorted = reqData.sort((a: any, b: any) => a.type < b.type)
        return sorted
      }
    } else {
      return reqData
    }
  }, [handleSort])

  async function takePicture() {
    if (cameraRef) {
      const data = await cameraRef?.current?.takePictureAsync()
      if (data) {
        setPhoto(data.uri)
        // const res = await getAddress();
        // if (res) {
        //   console.log(res);
        //   setAddress(res.formattedAddress);
        //   setLocation(res);
        // }
        setModalVisible(true)
      }
    }
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
          // setUploading(false)
          setImage(url)
          blob.close()
          return url
        })
      },
    )
  }

  const CamButton = useMemo(() => {
    return (
      <>
        <CamBtnContainer>
          <TouchableOpacityCam onPress={takePicture}>
            <Feather name="camera" size={RFHeight(33)} color={'#fff'} />
            <Text style={{ color: 'white', fontFamily: 'Poppins_600SemiBold' }}>
              capturar
            </Text>
          </TouchableOpacityCam>
        </CamBtnContainer>
      </>
    )
  }, [])

  async function handleFinalizeSubmit() {
    if (!image || !dataToSubmit || !requestId) return
    const data = {
      finishedDescription: dataToSubmit.solutionDescription,
      finishedImage: image,
    }
    await finalizeRequest(data, requestId)
    setUploading(false)
    setValue('solutionDescription', '')
    setImage('')
    setDataToSubmit(null)
    setSolutionsDescription(null)
  }

  useEffect(() => {
    handleFinalizeSubmit()
  }, [image])

  useEffect(() => {
    register('searchTerm')
    register('solutionDescription')
    getData()
  }, [])

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
        <>
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
                      <HeaderTitle>Finalizar solicitação</HeaderTitle>
                      <HeaderText>
                        Verifique atentamente a foto registrada para garantir a
                        identificação da solução do problema
                      </HeaderText>
                    </HeaderContainer>

                    <ModalImage source={{ uri: photo }} />

                    <FormContainer>
                      <TextInput
                        onChangeText={(text: string) =>
                          setValue('solutionDescription', text)
                        }
                        errorMessage={errors?.solutionDescription?.message}
                        control={control}
                        defaultValue={solutionDescription}
                        placeholder="Descrição da solução"
                        label="Descrição"
                        name="solutionDescription"
                        icon="info"
                      />

                      <BtnContainer>
                        <DiscardButton onPress={discard}>
                          <Feather
                            name="x"
                            size={RFHeight(33)}
                            color={'#fff'}
                          />
                          <ButtonText>Cancelar</ButtonText>
                        </DiscardButton>
                        <ConfirmButton onPress={handleSubmit(confirm)}>
                          <Feather
                            name="check"
                            size={RFHeight(33)}
                            color={'#fff'}
                          />
                          <ButtonText>Confirmar</ButtonText>
                        </ConfirmButton>
                      </BtnContainer>
                    </FormContainer>
                  </ModalBody>
                </Modal>
              )}
            </>
          ) : (
            <>
              <TitleContainer>
                <Title>Minhas Solicitações</Title>
                <SubTitle>Visualize suas solicitações em aberto!</SubTitle>
              </TitleContainer>

              <TabSelectorContainer>
                <TabSelectorButton
                  active={opened}
                  onPress={() => handleChangeTab('opened')}
                >
                  <TabSelectorButtonTitle active={opened}>
                    EM ABERTO
                  </TabSelectorButtonTitle>
                </TabSelectorButton>

                <TabSelectorButton
                  active={closed}
                  onPress={() => handleChangeTab('closed')}
                >
                  <TabSelectorButtonTitle active={closed}>
                    FINALIZADAS
                  </TabSelectorButtonTitle>
                </TabSelectorButton>
              </TabSelectorContainer>

              <Container>
                <FilterContainer>
                  <SearchContainer>
                    <TextInput
                      onChangeText={setSearchTerm}
                      name="searchTerm"
                      icon="search"
                      placeholder="Busque por nome ou local"
                      control={control}
                      errorMessage={errors?.filter?.message}
                    />
                  </SearchContainer>

                  <FilterButtonsContainer>
                    <FilterButton
                      onPress={() => handleSort('byDate')}
                      active={activeSort === 'byDate'}
                    >
                      <Icon name="filter" />
                      <FilterButtonText>Data</FilterButtonText>
                    </FilterButton>

                    <FilterButton
                      onPress={() => handleSort('byCode')}
                      active={activeSort === 'byCode'}
                    >
                      <Icon name="filter" />
                      <FilterButtonText>Código</FilterButtonText>
                    </FilterButton>

                    <FilterButton
                      onPress={() => handleSort('byType')}
                      active={activeSort === 'byType'}
                    >
                      <Icon name="filter" />
                      <FilterButtonText>Tipo</FilterButtonText>
                    </FilterButton>
                  </FilterButtonsContainer>
                </FilterContainer>

                {opened && (
                  <CardsContainer
                    data={sortedData}
                    keyExtractor={(item: any) => item.id}
                    renderItem={({ item }: any) =>
                      item?.status === 'opened' &&
                      opened && (
                        <RequestCard
                          onPress={(id) => setRequestId(id)}
                          request={item}
                        />
                      )
                    }
                  />
                )}
                {closed && (
                  <CardsContainer
                    data={sortedData}
                    keyExtractor={(item: any) => item?.id}
                    renderItem={({ item }: any) =>
                      item.status === 'closed' &&
                      closed && (
                        <RequestCard
                          onPress={(id) => setRequestId(id)}
                          request={item}
                        />
                      )
                    }
                  />
                )}
              </Container>
            </>
          )}
        </>
      )}
    </>
  )
}

export default MyRequests

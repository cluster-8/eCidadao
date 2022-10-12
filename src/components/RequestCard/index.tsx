import React, { useState } from 'react'
import ModalDetails from '../ModalDetails'
// import { translate } from '../../data/I18n'
import {
  RequestInformationContainer,
  TestContainer,
  HeaderContainer,
  TitleContainer,
  IdText,
  TitleText,
  Icon,
  InformationContainer,
  RequestDescription,
  RequestDate,
} from './styles'

interface RequestCardProps {
  request: {
    id: string
    title: string
    type: string
    status: string
    createdAt: string
    image: string
    description: string
    date: string
    address: {
      formattedAddress: string
    }
  }
  onPress: (requestId: string) => void
}

export const RequestCard: React.FC<RequestCardProps> = ({
  request,
  onPress,
}) => {
  const [visible, setVisible] = useState(false)
  const [modalInfo, setModalInfo] = useState({})

  const handleModalShow = () => {
    setVisible(true)
    setModalInfo({
      createdAt: request.createdAt,
      identifier: request.id,
      image: request.image,
      status: request.status,
      type: request.type,
      address: request.address.formattedAddress,
      description: request.description,
    })
  }

  return (
    <RequestInformationContainer
      onPress={() => {
        onPress(request.id)
        handleModalShow()
      }}
    >
      <TestContainer>
        <HeaderContainer>
          <TitleContainer>
            <IdText>{request.id}</IdText>
            <TitleText>{request.title}</TitleText>
          </TitleContainer>

          <Icon
            name={request.status === 'open' ? 'more-horizontal' : 'check'}
            color={request.status === 'open' ? '#F89521' : '#4AEF10'}
            size={20}
          />
        </HeaderContainer>

        <InformationContainer>
          <RequestDescription>{request.description || ''}</RequestDescription>

          <RequestDate>{request.date || ''}</RequestDate>
        </InformationContainer>
      </TestContainer>

      <ModalDetails
        data={modalInfo}
        modalVisible={visible}
        handleClose={() => setVisible(false)}
      />
    </RequestInformationContainer>
  )
}

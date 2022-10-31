import React, { useMemo, useState } from 'react'
import ModalDetails from '../ModalDetails'

import {
  RequestInformationContainer,
  InformationContainer,
  RequestDescription,
  HeaderContainer,
  TitleContainer,
  RequestDate,
  TitleText,
  IdText,
  Icon,
  CardContainer,
} from './styles'

import formatDate from '../../utils/formatDate'
import { useTypes } from '../../hooks/useTypes'

interface RequestCardProps {
  request: {
    description: string
    identifier: string
    createdAt: string
    status: string
    title: string
    image: string
    type: string
    address: any
    id: string
    // date: string
    // address: {
    //   formattedAddress: string
    // }
  }
  onPress: (requestId: string) => void
}

export const RequestCard: React.FC<RequestCardProps> = ({
  request,
  onPress,
}) => {
  const [visible, setVisible] = useState(false)
  const [modalInfo, setModalInfo] = useState({})

  const option = useMemo(() => {
    return {
      month: 'long' || 'short' || 'numeric',
      timeZoneName: 'long' || 'short',
      weekday: 'long' || 'short',
      era: 'long' || 'short',
      minute: 'numeric',
      second: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      day: 'numeric',
    }
  }, [])

  const { getTypeValue } = useTypes()

  const handleModalShow = () => {
    setVisible(true)
    setModalInfo({
      address: request.address.formattedAddress,
      description: request.description,
      identifier: request.identifier,
      createdAt: request.createdAt,
      status: request.status,
      image: request.image,
      type: getTypeValue(request.type),
    })
  }

  return (
    <RequestInformationContainer
      onPress={() => {
        onPress(request?.id)
        handleModalShow()
      }}
    >
      <CardContainer>
        <HeaderContainer>
          <TitleContainer>
            <IdText>#{request?.identifier}</IdText>
            <TitleText>{getTypeValue(request?.type)}</TitleText>
          </TitleContainer>

          <Icon
            name={request?.status === 'opened' ? 'more-horizontal' : 'check'}
            color={request?.status === 'opened' ? '#F89521' : '#4AEF10'}
            size={20}
          />
        </HeaderContainer>

        <InformationContainer>
          <RequestDescription>{request?.description || ''}</RequestDescription>

          <RequestDate>{formatDate(request?.createdAt)}</RequestDate>
        </InformationContainer>
      </CardContainer>

      <ModalDetails
        data={modalInfo}
        modalVisible={visible}
        handleClose={() => setVisible(false)}
      />
    </RequestInformationContainer>
  )
}

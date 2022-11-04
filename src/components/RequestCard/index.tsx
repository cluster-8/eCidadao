import React from 'react'

import {
  RequestInformationContainer,
  InformationContainer,
  RequestDescription,
  HeaderContainer,
  TitleContainer,
  CardContainer,
  RequestDate,
  TitleText,
  IdText,
  Icon,
} from './styles'

import formatDate from '../../utils/formatDate'
import { useTypes } from '../../hooks/useTypes'

interface RequestCardProps {
  request: {
    finishedDescription: string
    finishedImage: string
    description: string
    identifier: string
    finishedAt: string
    createdAt: string
    updatedAt: string
    status: string
    title: string
    image: string
    type: string
    address: any
    id: string
  }
  onPress: (requestId: string) => void
}

export const RequestCard: React.FC<RequestCardProps> = ({
  request,
  onPress,
}) => {
  const { getTypeValue } = useTypes()

  return (
    <RequestInformationContainer onPress={() => onPress(request?.id)}>
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
    </RequestInformationContainer>
  )
}

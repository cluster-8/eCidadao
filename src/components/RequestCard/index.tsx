import React from 'react'
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
    description: string
    date: string
  }
  onPress: (requestId: string) => void
}

export const RequestCard: React.FC<RequestCardProps> = ({
  request,
  onPress,
}) => {
  return (
    <RequestInformationContainer onPress={() => onPress(request.id)}>
      <TestContainer>
        <HeaderContainer>
          <TitleContainer>
            <IdText>{request.id}</IdText>
            <TitleText>{request.title}</TitleText>
          </TitleContainer>

          <Icon
            name={request.type === 'open' ? 'more-horizontal' : 'check'}
            color={request.type === 'open' ? '#4AEF10' : '#F89521'}
          />
        </HeaderContainer>

        <InformationContainer>
          <RequestDescription>{request.description || ''}</RequestDescription>

          <RequestDate>{request.date || ''}</RequestDate>
        </InformationContainer>
      </TestContainer>
    </RequestInformationContainer>
  )
}

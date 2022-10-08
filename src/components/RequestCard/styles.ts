import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { RFWidth } from '../../utils/getResponsiveSizes'

export const RequestInformationContainer = styled.TouchableOpacity`
  flex-flow: row;
  align-items: center;
  padding: ${RFWidth(16)}px;
  background-color: ${({ theme }) => theme.colors.background_over};
  border-radius: ${RFWidth(6)}px;
  margin: 10px 0;
`

export const TestContainer = styled.View`
  flex-direction: column;
`

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const IdText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
`

export const TitleText = styled.Text`
  margin-left: 10px;
`

export const Icon = styled(Feather)``

export const InformationContainer = styled.View`
  flex: 1;
  flex-direction: column;
  padding-left: ${RFWidth(16)}px;
`

export const RequestDescription = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  margin: 10px 0;
`

export const RequestDate = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`

import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { RFWidth } from '../../utils/getResponsiveSizes'

export const RequestInformationContainer = styled.TouchableOpacity`
  flex-flow: row;
  align-items: center;
  padding: ${RFWidth(16)}px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${RFWidth(10)}px;
  margin: 10px 0;
`

export const CardContainer = styled.View``

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Icon = styled(Feather)`
  margin-left: ${RFWidth(10)}px;
`

export const IdText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
`

export const TitleText = styled.Text`
  margin-left: 10px;
`

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

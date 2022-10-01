import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { RFWidth } from '../../utils/getResponsiveSizes'

export const RequestInformationContainer = styled.TouchableOpacity`
  flex-flow: row;
  align-items: center;
  padding: ${RFWidth(16)}px;
  background-color: ${({ theme }) => theme.colors.background};
  /* box-shadow: 10px 5px 5px black; */
  border-radius: ${RFWidth(6)}px;
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
  gap: 10px;
`

export const IdText = styled.Text``

export const TitleText = styled.Text``

export const Icon = styled(Feather)``

export const InformationContainer = styled.View`
  flex: 1;
  flex-direction: column;
  padding-left: ${RFWidth(16)}px;
`

export const RequestDescription = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`

export const RequestDate = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`

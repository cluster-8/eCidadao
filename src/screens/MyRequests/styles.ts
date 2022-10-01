import styled from 'styled-components/native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { Feather } from '@expo/vector-icons'
import { RFHeight } from '../../utils/getResponsiveSizes'

export const Container = styled.View`
  padding: 0px ${RFHeight(24)}px ${getBottomSpace() + RFHeight(24)}px
    ${RFHeight(24)}px;
  justify-content: space-between;
`

export const TitleContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 20%;
`

export const Title = styled.Text`
  font-size: 25px;
  font-family: 'Poppins_600SemiBold';
  margin-top: ${RFHeight(40)}px;
`

export const SubTitle = styled.Text`
  font-size: 15px;
  margin-top: ${RFHeight(25)}px;
  font-family: 'Poppins_400Regular';
`

export const Content = styled.View`
  /* background-color: ${({ theme }) => theme.colors.background_over}; */
`

export const TabSelectorContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const TabSelectorButton = styled.View`
  height: 70px;
  align-items: center;
  justify-content: center;
`

export const TabSelectorButtonTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-left: 25px;
  margin-right: 25px;
  font-size: 15px;
`

export const FilterContainer = styled.View`
  flex-direction: column;
`

export const FilterButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`

export const FilterButton = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`

export const Icon = styled(Feather)``

export const FilterButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  margin-left: 5px;
`

export const CardsContainer = styled.View``

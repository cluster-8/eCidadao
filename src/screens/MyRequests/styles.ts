import styled, { css } from 'styled-components/native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { Feather } from '@expo/vector-icons'
import { RFHeight, RFWidth } from '../../utils/getResponsiveSizes'

interface TabSelectorProps {
  active: boolean
}

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
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

export const TabSelectorButton = styled.TouchableOpacity<TabSelectorProps>`
  height: ${RFHeight(56)}px;
  width: 50%;
  background: ${({ theme }) => theme.colors.background};
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.active &&
    css`
      border-bottom-width: ${RFWidth(2)}px;
      border-color: ${({ theme }) => theme.colors.primary};
    `}
`

export const TabSelectorButtonTitle = styled.Text<TabSelectorProps>`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-left: 25px;
  margin-right: 25px;
  font-size: 15px;

  ${(props) =>
    props.active &&
    css`
      color: ${({ theme }) => theme.colors.primary};
    `}
`

export const FilterContainer = styled.View`
  margin-top: ${RFHeight(15)}px;
  flex-direction: column;
`

export const FilterButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`

export const FilterButton = styled.TouchableOpacity`
  height: ${RFHeight(46)}px;
  width: 25%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  background-color: ${({ theme }) => theme.colors.background_over};
  border-radius: 50px;
`

export const Icon = styled(Feather)``

export const FilterButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  margin-left: 5px;
`

export const CardsContainer = styled.FlatList`
  margin-top: 10px;
  height: 50%;
`

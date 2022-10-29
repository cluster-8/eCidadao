import styled, { css } from 'styled-components/native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { Feather } from '@expo/vector-icons'
import { RFHeight, RFWidth, RFFontSize } from '../../utils/getResponsiveSizes'

interface TabSelectorProps {
  active: boolean
}

interface FilterButtonProps {
  active: boolean
}

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background_over};
  padding: 0px ;
  justify-content: space-between;
`

export const TitleContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 20%;
  margin-bottom: ${RFHeight(10)}px;
`

export const Title = styled.Text`
  font-size: ${RFFontSize(25)}px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  margin-top: ${RFHeight(40)}px;
`

export const SubTitle = styled.Text`
font-size: ${RFFontSize(16)}px;
margin-top: ${RFHeight(15)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const Content = styled.View`
  /* background-color: ${({ theme }) => theme.colors.background_over}; */
`

export const TabSelectorContainer = styled.View`
  background: ${({ theme }) => theme.colors.background_over};
  flex-direction: row;
  justify-content: space-between;

  shadowColor: "#000";
  shadow-offset: {
	width: ${RFWidth(0)}px,
	height: ${RFWidth(5)}px,
},
  shadow-opacity: 0.34;
  shadow-radius: ${RFWidth(6.27)}px;
  elevation: 10;
`

export const TabSelectorButton = styled.TouchableOpacity<TabSelectorProps>`
  height: ${RFHeight(58)}px;
  width: 50%;
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
  margin-left: ${RFHeight(25)}px;
  margin-right: ${RFHeight(25)}px
  font-size: ${RFFontSize(16)}px;

  ${(props) =>
    props.active &&
    css`
      color: ${({ theme }) => theme.colors.primary};
    `}
`
export const SearchContainer = styled.TouchableOpacity`
margin-left:${RFHeight(25)}px;
margin-right:${RFHeight(25)}px;
`

export const FilterContainer = styled.View`
  background: ${({ theme }) => theme.colors.background_over};
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${RFHeight(15)}px;
  flex-direction: column;
  
`

export const FilterButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: ${RFHeight(10)}px;

`

export const FilterButton = styled.TouchableOpacity<FilterButtonProps>`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  height: ${RFHeight(46)}px;
  width: 25%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 ${RFHeight(10)}px;
  border-radius: ${RFHeight(10)}px;

  shadowColor: "#000";
  shadow-offset: {
	width: ${RFWidth(0)}px,
	height: ${RFWidth(5)}px,
},
  shadow-opacity: 0.34;
  shadow-radius: ${RFWidth(6.27)}px;
  elevation: 10;

  ${(props) =>
    props.active &&
    css`
      background-color: ${({ theme }) => theme.colors.yellow};
    `};
`

export const Icon = styled(Feather)``

export const FilterButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  margin-left: ${RFHeight(5)}px;
`

export const CardsContainer = styled.FlatList`
  margin-top: ${RFHeight(10)}px;
  height: 50%;
  width: 100%;
`

export const SearchbarContent = styled.View`
  position: absolute;
  top: ${RFHeight(20)}px;
  width: 100%;
  margin-left: ${RFHeight(20)}px;
  margin-right: ${RFHeight(20)}px;
`

export const SearchBar = styled.TextInput`
  border-radius: ${RFHeight(10)}px;
  margin: ${RFHeight(5)}px ${RFHeight(20)}px;
  color: ${({ theme }) => theme.colors.black};
  border-color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  border-width: ${RFHeight(1)}px;
  height: ${RFHeight(45)}px;
  padding: ${RFHeight(10)}px;
  font-size: ${RFFontSize(18)}px;
  width: 90%;
`

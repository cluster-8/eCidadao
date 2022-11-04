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
  padding: 0px;
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
	height: ${RFWidth(1)}px,
},
  shadow-opacity: 0.22;
  shadow-radius: ${RFWidth(2.22)}px;
  elevation: 3;
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
  margin-left: ${RFHeight(25)}px;
  margin-right: ${RFHeight(25)}px;
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
	height: ${RFWidth(1)}px,
},
  shadow-opacity: 0.22;
  shadow-radius: ${RFWidth(2.22)}px;
  elevation: 3;


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
  height: 100%;
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

export const CamBtnContainer = styled.View`
  flex: 1;
  background-color: 'transparent';
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: ${RFHeight(50)}px;
`

export const TouchableOpacityCam = styled.TouchableOpacity<TypeProps>`
  height: ${RFHeight(56)}px;
  border-radius: ${RFHeight(8)}px;
  justify-content: center;
  align-items: center;
  transform: rotate(90deg);
  ${(props) =>
    props.type === 'secondary' &&
    css`
      border-width: ${RFWidth(2)}px;
      border-color: ${({ theme }) => theme.colors.primary};
    `}
`

export const RotateCamContainer = styled.View`
  flex: 1;
  background-color: 'transparent';
  background-color: '#123567'
  flex-direction: column;
  justify-content: center;
  padding-bottom: ${RFHeight(50)}px;
`

export const RotateCamMessage = styled.View`
  height: ${RFHeight(56)}px;
  border-radius: ${RFHeight(8)}px;
  justify-content: center;
  align-items: center;
  animation: fadeIn 5s;
`

export const ModalBody = styled.View`
  flex: 1;
  /* justify-content: center; */
  align-items: center;
  margin: ${RFHeight(20)}px;
`

export const ModalImage = styled.Image`
  width: 100%;
  height: 40%
  border-radius: ${RFHeight(10)}px;
`
export const BtnContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: ${RFHeight(60)}px;
`

export const CancelButtonContainer = styled.View`
  margin: ${RFHeight(24)}px;
  width: ${RFHeight(70)}px;
  height: ${RFHeight(70)}px;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.attention};
  border-radius: ${RFHeight(80)}px;
  /* position: fixed; */
`

export const ConfirmButtonContainer = styled.View`
  margin: ${RFHeight(24)}px;
  width: ${RFHeight(70)}px;
  height: ${RFHeight(70)}px;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.success};
  border-radius: ${RFHeight(80)}px;
`

export const ActivityIndicatorView = styled.View`
  flex: 1;
  justify-content: center;
  padding: ${RFHeight(10)}px;
`

export const HeaderContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 20%;
`

export const HeaderTitle = styled.Text`
  font-size: ${RFFontSize(25)}px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  margin-top: ${RFHeight(10)}px;
`

export const HeaderText = styled.Text`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  font-size: ${RFFontSize(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const FormContainer = styled.View`
  background: #fff;
  flex: 1;
  width: 100%;
  height: 100%;
  border-top-left-radius: ${RFHeight(32)}px;
  border-top-right-radius: ${RFHeight(32)}px;
  padding: ${RFHeight(24)}px;
`

// export const ModalFooter = styled.View`
//   flex: 1;
//   flex-direction: row;

// `

export const ConfirmButton = styled.TouchableOpacity`
  /* height: ${RFHeight(40)}px; */
  height: ${RFHeight(56)}px;
  border-radius: ${RFHeight(8)}px;
  background: ${({ theme }) => theme.colors.success};
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  width: ${RFWidth(120)}px;
  padding: ${RFWidth(8)}px;
`

export const DiscardButton = styled.TouchableOpacity`
  /* height: ${RFHeight(40)}px; */
  height: ${RFHeight(56)}px;
  border-radius: ${RFHeight(8)}px;
  background: ${({ theme }) => theme.colors.red};
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  width: ${RFWidth(120)}px;
  padding: ${RFWidth(8)}px;
`

export const ButtonText = styled.Text`
  font-size: ${RFFontSize(15)}px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  /* margin-top: ${RFHeight(40)}px; */
  /* align-items: center; */
  /* text-align: center; */
  /* justify-content: center; */
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${RFHeight(10)}px;
`

export const StyledActivityIndicator = styled.ActivityIndicator`
  color: ${({ theme }) => theme.colors.primary};
`

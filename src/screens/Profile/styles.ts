import styled from 'styled-components/native'

// import { getBottomSpace } from 'react-native-iphone-x-helper'
import { RFHeight, RFFontSize, RFWidth } from '../../utils/getResponsiveSizes'

export const Container = styled.ScrollView`
`

export const HeaderContainer = styled.View`
  align-items: center;
  justify-content: center;
  resizemode: contain;
  width: 100%;
  height: 20%;
`
export const LogOffButton = styled.Pressable`
background-color: #f6f6f6;
opacity: 0.7;
position: absolute;
top: ${RFHeight(20)}px;
left: 90%;
width: ${RFHeight(45)}px;
height: ${RFHeight(45)}px;
`

export const HeaderTitle = styled.Text`
  font-size: ${RFFontSize(25)}px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  margin-top: ${RFHeight(40)}px;  
`

export const HeaderText = styled.Text`
  font-size: ${RFFontSize(16)}px;
  margin-top: ${RFHeight(15)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const BodyContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  border-top-left-radius: ${RFHeight(30)}px;
  border-top-right-radius: ${RFHeight(30)}px;
  padding: 0 ${RFHeight(24)}px;
  height: 80%;
  margin-bottom: ${RFHeight(20)}px;
`

export const ButtonContainer = styled.View`
margin-top: ${RFHeight(20)}px;
margin-bottom: ${RFHeight(30)}px;
`

export const ExcludeContainer = styled.View`
border-width: ${RFWidth(1)}px;
width: 100%;
height: ${RFHeight(150)}px;
background-color: ${({ theme }) => theme.colors.background};
border-radius: ${RFHeight(8)}px;
border-color: ${({ theme }) => theme.colors.details};
margin-bottom: ${RFHeight(50)}px;
padding: ${RFHeight(10)}px;
`

export const ExcludeTitleContainer = styled.View`
  padding-bottom: ${RFHeight(6)}px;
  flex-direction: row;
`
export const ExcludeTitle = styled.Text`
  font-size: ${RFFontSize(18)}px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  margin-left: ${RFHeight(10)}px;
`
export const DescriptionContainer = styled.View`

`

export const DescriptionText = styled.Text`
font-size: ${RFFontSize(16)}px;
font-family: ${({ theme }) => theme.fonts.regular};
`

export const ExcludeButtonContainer = styled.View`
flex-direction: row;
justify-content: flex-end;
margin-top: ${RFHeight(5)}px;

`

export const ExcludeButton = styled.TouchableOpacity`
width: ${RFWidth(140)}px;
height: ${RFHeight(35)}px;
border-radius: ${RFHeight(6)}px;
background: #F54B50;
justify-content: center;
align-items: center;
`
export const ExcludeText = styled.Text`
font-family: ${({ theme }) => theme.fonts.semiBold};
font-size: ${RFFontSize(16)}px;
color: ${({ theme }) => theme.colors.white}
`





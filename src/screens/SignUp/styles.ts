import styled from 'styled-components/native'

// import { getBottomSpace } from 'react-native-iphone-x-helper'
import { RFHeight, RFFontSize } from '../../utils/getResponsiveSizes'

export const Container = styled.ScrollView``

export const FormContainer = styled.View`
  justify-content: space-between;
`
export const HeaderContainer = styled.View`
align-items: center;
justify-content: center;
resizemode: contain;
width: 100%;
height: 20%;
`

export const Title = styled.Text`
  font-size: ${RFFontSize(25)}px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  margin-top: ${RFHeight(10)}px;
  margin-bottom: ${RFHeight(5)}px;
`

export const TextHeader = styled.Text`
font-size: ${RFFontSize(16)}px;
margin-top: ${RFHeight(15)}px;
font-family: ${({ theme }) => theme.fonts.regular};
text-align: center;
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

export const TermsUseView = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: ${RFHeight(10)}px;
  margin-bottom: ${RFHeight(20)}px;
`

export const TermsUseText = styled.Text`
  margin-left: ${RFHeight(8)}px;
  font-size: ${RFFontSize(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const TermsUseLink = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFFontSize(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const LoginView = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: ${RFHeight(20)}px;
  margin-bottom: ${RFHeight(20)}px;
  justify-content: center;
  align-items: center;
`

export const LoginText = styled.Text`
  font-size: ${RFFontSize(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-right: ${RFHeight(5)}px;
`

export const LoginLink = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFFontSize(14)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`
export const ButtonView = styled.View`
margin-bottom: ${RFHeight(30)}px;

`
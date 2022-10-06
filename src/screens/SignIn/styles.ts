import styled from 'styled-components/native'

import { getBottomSpace } from 'react-native-iphone-x-helper'
import { RFHeight, RFFontSize } from '../../utils/getResponsiveSizes'

export const Container = styled.View`
  justify-content: space-between;
`

export const HeaderContainer = styled.View`
  align-items: center;
  resizeMode: contain;
  width: 100%;
  justify-content: center;
  height: 40%
`

export const BodyContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  border-top-left-radius: ${RFHeight(30)}px;
  border-top-right-radius: ${RFHeight(30)}px;
  padding: 0 ${RFHeight(24)}px;
  height: 60%;
  `

export const Title = styled.Text`
  color:${({ theme }) => theme.colors.text};
  font-size: ${RFFontSize(28)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  margin-top: ${RFHeight(10)}px;
  margin-bottom:${RFHeight(20)}px;
  text-align: center;
  `

export const ForgotPasswdButton = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color:${({ theme }) => theme.colors.primary};
  margin-top: ${RFHeight(10)}px;
  margin-bottom: ${RFHeight(20)}px;
  font-size: ${RFFontSize(14)}px;
  `

export const ContainerButton = styled.View`
  margin-top:${RFHeight(30)}px;
  width: 100%;
  `

export const SubscribeButton = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFFontSize(14)}px;
  align-self: center;
  margin-top: ${RFHeight(15)}px;
  `
import styled from 'styled-components/native'

// import { getBottomSpace } from 'react-native-iphone-x-helper'
import { RFHeight, RFFontSize } from '../../utils/getResponsiveSizes'

export const Container = styled.View`
  padding: 0px;
  justify-content: space-between;
`

export const HeaderContainer = styled.View`
  align-items: center;
  justify-content: center;
  resizemode: contain;
  width: 100%;
  height: 20%;
`

export const HeaderTitle = styled.Text`
  font-size: ${RFFontSize(25)}px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  margin-top: ${RFHeight(10)}px;
`

export const HeaderText = styled.Text`
  font-size: ${RFFontSize(15)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const ExcludeButton = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFFontSize(18)}px;
  align-self: center;
  margin-top: ${RFHeight(15)}px;
  margin-bottom: ${RFHeight(30)}px;
`

import styled from 'styled-components/native'

import { getBottomSpace } from 'react-native-iphone-x-helper'
import { RFHeight, RFFontSize } from '../../utils/getResponsiveSizes'

export const Container = styled.View`
  padding: 0px ${RFHeight(24)}px ${getBottomSpace() + RFHeight(24)}px
    ${RFHeight(24)}px;
  justify-content: space-between;
`

export const HeaderContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 20%;
`

export const HeaderTitle = styled.Text`
  font-size: 25px;
  font-family: 'Poppins_600SemiBold';
  margin-top: ${RFHeight(10)}px;
`

export const HeaderText = styled.Text`
  font-size: 15px;
  font-family: 'Poppins_400Regular';
`

export const FormContainer = styled.View`
  margin-top: ${RFHeight(5)}px;
`

export const ExcludeButton = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFFontSize(18)}px;
  align-self: center;
  margin-top: ${RFHeight(15)}px;
`

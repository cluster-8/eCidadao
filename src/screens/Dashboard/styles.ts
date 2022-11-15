import styled from 'styled-components/native'
import { RFHeight, RFFontSize } from '../../utils/getResponsiveSizes'

export const Container = styled.ScrollView`
  height: 100%;
`

export const HeaderContainer = styled.View`
  align-items: center;
  justify-content: center;
  resizemode: contain;
  width: 100%;
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
  padding: ${RFHeight(24)}px ${RFHeight(24)}px;
  height: 100%;
`;

export const CardContainer = styled.View`
  width: 100%;
  height: ${RFHeight(130)}px;
  flex-direction: row;
  justify-content: center;
`
export const FilterContainer = styled.View`
  width: 100%;
  height: ${RFHeight(110)}px;
  flex-direction: row;
  justify-content: flex-start;
`

export const GraphContainer = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: center;
`;

export const DateSelectButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.yellow};
  width: 95%;
  height: ${RFHeight(50)}px;
  flex-direction: row;
  justify-content: center;
  margin: ${RFHeight(10)}px;
`;
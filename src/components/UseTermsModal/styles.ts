import styled from 'styled-components/native'
import { RFFontSize, RFHeight, RFWidth } from '../../utils/getResponsiveSizes'

export const Container = styled.View`
  flex: 1%;
  justify-content: center;
  align-items: center;
  margin-top: ${RFHeight(22)}px;
  margin-bottom: ${RFHeight(-20)}px;
`

export const Content = styled.View`
  flex: 1%;
  justify-content: center;
  align-items: center;
  margin-top: ${RFHeight(22)}px;
  margin-bottom: ${RFHeight(20)}px;
`

export const ModalContent = styled.View`
  margin: ${RFHeight(20)}px;
  width: 100%;
  height: 100%;
  margin-top: auto;
  margin-bottom: 0;
  background-color: #f6f6f6;
  border-top-left-radius: ${RFHeight(20)}px;
  border-top-right-radius: ${RFHeight(20)}px;
  /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2); */78
`
export const ButtonView = styled.View`
  align-itens: center;
  justify-content: center;
  margin-top: ${RFHeight(30)}px;
  margin-left: ${RFHeight(20)}px;
  margin-right: ${RFHeight(20)}px;
  margin-bottom: ${RFHeight(50)}px;
`

export const CloseButton = styled.Pressable`
  height: ${RFHeight(56)}px;
  border-radius: ${RFHeight(8)}px;
  background: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
`
export const CloseText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFFontSize(18)}px;
  color: ${({ theme }) => theme.colors.white};
`
export const TitleView = styled.View`
  align-items: center;
`

export const Title = styled.Text`
  font-size: ${RFFontSize(25)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  margin-top: ${RFHeight(10)}px;
  margin-bottom: ${RFHeight(5)}px;
`

export const TermsView = styled.ScrollView`
  margin-top: ${RFHeight(5)}px;
  margin-left: ${RFHeight(10)}px;
  margin-right: ${RFHeight(10)}px;
`

export const TextDescription = styled.Text`
  font-size: ${RFFontSize(12)}px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  text-align: center;
`

export const Subtitle = styled.Text`
  font-size: ${RFFontSize(16)}px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  margin-top: ${RFHeight(10)}px;
  margin-bottom: ${RFHeight(5)}px;
  margin-left: ${RFHeight(10)}px;
  margin-right: ${RFHeight(10)}px;
`

export const TextItens = styled.Text`
  font-size: ${RFFontSize(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-top: ${RFHeight(10)}px;
  margin-bottom: ${RFHeight(5)}px;
  margin-left: ${RFHeight(10)}px;
  margin-right: ${RFHeight(10)}px;
`

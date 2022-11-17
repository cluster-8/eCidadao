import styled from 'styled-components/native'
import { RFFontSize, RFHeight } from '../../utils/getResponsiveSizes'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: ${RFHeight(22)}px;

`
export const CloseButton = styled.Pressable`
  background-color: #f6f6f6;
  opacity: 0.7;
  position: absolute;
  top: ${RFHeight(15)}px;
  left: 88%;
  width: ${RFHeight(45)}px;
  height: ${RFHeight(45)}px;
`

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: 'rgba(0,0,0,0.5)'

`

export const ModalContent = styled.View`
  margin: ${RFHeight(20)}px;
  width: 100%;
  height: 40%;
  margin-top: auto;
  margin-bottom: 0;
  background-color: #f6f6f6;
  border-radius: ${RFHeight(20)}px;

  /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2); */78
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

export const InputView = styled.View`
    margin-top: ${RFHeight(20)}px;
    margin-left: ${RFHeight(20)}px;
    margin-right: ${RFHeight(20)}px;
`
export const TextDescription = styled.Text`
  font-size: ${RFFontSize(14)}px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  text-align: center;
`

export const ButtonView = styled.View`
  align-itens: center;
  justify-content: center;
  margin-top: ${RFHeight(20)}px;
  margin-left: ${RFHeight(20)}px;
  margin-right: ${RFHeight(20)}px;
  margin-bottom: ${RFHeight(10)}px;
`

export const SubmitButton = styled.Pressable`
  height: ${RFHeight(56)}px;
  border-radius: ${RFHeight(8)}px;
  background: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
`
export const SubmitText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFFontSize(18)}px;
  color: ${({ theme }) => theme.colors.white};
`




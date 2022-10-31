import { ImageBackground } from 'react-native'
import styled from 'styled-components/native'
import { RFHeight, RFWidth, RFFontSize } from '../../utils/getResponsiveSizes'

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
  margin-bottom: ${RFHeight(-20)}px;
`

export const ModalContent = styled.View`
  margin: ${RFHeight(20)}px;
  width: 100%;
  height: 75%;
  margin-top: auto;
  margin-bottom: 0;
  background-color: #f6f6f6;
  border-top-left-radius: ${RFHeight(10)}px;
  border-top-right-radius: ${RFHeight(10)}px;
  align-items: center;
  /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2); */
`

export const CloseButton = styled.Pressable`
  background-color: #f6f6f6;
  opacity: 0.7;
  position: absolute;
  top: ${RFHeight(10)}px;
  left: 90%;
  width: ${RFHeight(30)}px;
  height: ${RFHeight(30)}px;
`

export const ImageContent = styled.View`
  flex: 1;
  width: 90%;
  margin-top: ${RFHeight(10)}px;
  margin-bottom: ${RFHeight(30)}px;
`

export const DescriptionContainer = styled.View`
  flex: 2;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  padding: ${RFHeight(10)}px;
  margin-top: ${RFHeight(100)}px;
  margin-bottom: ${RFHeight(40)}px;
  margin-left: ${RFHeight(30)}px;
`

export const Image = styled(ImageBackground as any)`
  width: 100%;
  height: ${RFHeight(265)}px;
  /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);*/
`

export const TitleContainer = styled.View`
  flex: 2;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: #3f3e40;
  font-size: ${RFFontSize(30)}px;
  line-height: ${RFHeight(84)}px;
  font-weight: bold;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.semiBold};
`

export const InfoRow = styled.View`
  /* padding: ${RFHeight(6)}px; */
  padding-bottom: ${RFHeight(6)}px;
  flex-direction: row;
`

export const IconContainer = styled.View`
  flex: 1;
  width: 15%;
`

export const Info = styled.Text`
  align-items: center;
  justify-content: center;
  width: 90%;
  font-size: ${RFFontSize(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-bottom: ${RFHeight(10)}px;
`

export const FinalizeButton = styled.TouchableOpacity`
  height: ${RFHeight(40)}px;
  border-radius: ${RFHeight(8)}px;
  background: ${({ theme }) => theme.colors.red};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: ${RFWidth(80)}px;
  padding: ${RFWidth(8)}px;
`

export const BtnText = styled.Text`
  /* margin-bottom: ${RFHeight(10)}px; */
  /* justify-content: center; */
  /* align-items: center; */
  /* width: 90%; */
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFFontSize(14)}px;
`

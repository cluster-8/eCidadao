import { ImageBackground, Image as RNImage, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { RFHeight, RFWidth, RFFontSize } from '../../utils/getResponsiveSizes'

const { width } = Dimensions.get('window')

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
  background-color: 'rgba(0,0,0,0.5)';
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
`

export const CloseButton = styled.Pressable`
  background-color: #f6f6f6;
  opacity: 0.7;
  position: absolute;
  top: ${RFHeight(10)}px;
  left: 90%;
  width: ${RFHeight(30)}px;
  height: ${RFHeight(30)}px;
  z-index: 1;
`

export const ImageContent = styled.View`
  flex: 1;
  width: 90%;
  margin-top: ${RFHeight(10)}px;
  margin-bottom: ${RFHeight(10)}px;
`

export const DescriptionContainer = styled.View`
  flex: 1;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  padding: ${RFHeight(10)}px;
  padding-top: ${RFHeight(0)}px;
  margin-left: ${RFHeight(70)}px;
  margin-right: ${RFHeight(45)}px;
`

export const Image = styled(ImageBackground as any)`
  width: 100%;
  height: ${RFHeight(265)}px;
`

export const BtnBackground = styled(ImageBackground as any)`
  width: 100%;
  height: ${RFHeight(265)}px;
  flex-direction: row;
`

export const TitleContainer = styled.View`
  flex: 2;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-right: ${RFWidth(8)}px;
`

export const Title = styled.Text`
  color: #3f3e40;
  font-size: ${RFFontSize(30)}px;
  line-height: ${RFHeight(84)}px;
  font-weight: bold;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.semiBold};
`

export const InfoRow = styled.View`
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
  margin-right: ${RFHeight(10)}px;
`

export const FinalizeButton = styled.TouchableOpacity`
  height: ${RFHeight(40)}px;
  border-radius: ${RFHeight(10)}px;
  background: ${({ theme }) => theme.colors.red};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: ${RFWidth(85)}px;
  padding: ${RFWidth(5)}px;
  margin-right: ${RFWidth(11)}px;
`

export const FinishedTag = styled.View`
  height: ${RFHeight(40)}px;
  border-radius: ${RFHeight(8)}px;
  background: ${({ theme }) => theme.colors.success};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: ${RFWidth(93)}px;
  padding: ${RFWidth(5)}px;
  border-radius: ${RFHeight(10)}px;
  margin-right: ${RFWidth(10)}px;
`

export const BtnText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFFontSize(14)}px;
`

export const ImageCarousel = styled.ScrollView`
  flex: 1;
  flex-direction: row;
  width: 90%;
  height: ${RFHeight(10)}px;
  margin-top: ${RFHeight(10)}px;
`

export const ImageView = styled.View`
  width: ${Number(width) - 60};
  height: ${RFWidth(100)}px;
  margin-right: ${RFHeight(10)}px;
`

export const RNImageComponent = styled(RNImage as any)`
  height: ${RFHeight(265)}px;
`

export const DescriptionScrollView = styled.ScrollView`
  width: 100%;
`

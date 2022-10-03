import styled from 'styled-components/native'
import { RFHeight, RFWidth } from '../../utils/getResponsiveSizes'

export const Container = styled.View`
  flex: 1%;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
  margin-bottom: -20px;
`

export const Content = styled.View`
  flex: 1%;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
  margin-bottom: -20px;
`

export const ModalContent = styled.View`
  margin: 20px;
  width: 100%;
  height: 50%;
  margin-top: auto;
  margin-bottom: 0;
  background-color: #f6f6f6;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  align-items: center;
  /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2); */
`

export const CloseButton = styled.Pressable`
  background-color: #f6f6f6;
  opacity: 0.7;
  position: absolute;
  top: 10px;
  left: 90%;
  width: 30px;
  height: 30px;
`

export const ImageContent = styled.View`
  flex: 1;
  width: 100%;
`

export const DescriptionContainer = styled.View`
  flex: 2;
  width: 90%;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
  margin-top: 100px;
`

// export const Image = styled(ImageBackground)`
//   width: 100%;
//   height: 280px;
//   /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);   */
// `;

export const Title = styled.Text`
  color: #3f3e40;
  font-size: 30px;
  line-height: 84px;
  font-weight: bold;
  text-align: center;
  font-family: 'Poppins_600SemiBold';
`

export const InfoRow = styled.View`
  /* padding: 6px; */
  padding-bottom: 6px;
  flex-direction: row;
`

export const IconContainer = styled.View`
  flex: 1;
  width: 15%;
`

export const Info = styled.Text`
  align-items: center;
  justify-content: center;
  width: 85%;
  font-size: 14px;
  font-family: 'Poppins_400Regular';
  margin-bottom: 10px;
`

export const TypesList = styled.ScrollView`
  flex: 1;
  margin: ${RFHeight(16)}px;
  width: 100%;

  /* background-color: #f6f6; */
  /* margin: ${RFWidth(16)}px; */
  /* padding: ${RFWidth(16)}px; */
  /* align-items: center;
  justify-content: center; */
`

export const TypeItem = styled.Text`
  flex: 1;
  margin: ${RFWidth(16)}px;
  /* height: ${RFWidth(16)}px; */
  flex-direction: row;
  justify-content: flex-start;
  /* justify-content: space-between; */

  width: ${RFWidth(50)}px;
  /* background-color: #f6f6; */
`

export const TouchableOpacity = styled.TouchableOpacity`
  /* flex: 1; */
  /* height: ${RFHeight(76)}px; */
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  /* margin: ${RFHeight(16)}px; */
  /* background-color: #f6f6; */
  /* border-radius: ${RFHeight(8)}px; */
`

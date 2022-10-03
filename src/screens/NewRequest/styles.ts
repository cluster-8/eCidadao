import styled, { css } from 'styled-components/native'
import { RFFontSize, RFHeight, RFWidth } from '../../utils/getResponsiveSizes'

interface TypeProps {
  type: 'primary' | 'secondary' | 'tertiary'
}

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  height: 100%;

  /* align-items: center; */
  /* padding-top: ${RFHeight(60)}px; */
  /* padding: ${RFHeight(24)}px; */
`

// export const Container = styled.View`
//   padding: 0px ${RFHeight(24)}px ${getBottomSpace() + RFHeight(24)}px
//     ${RFHeight(24)}px;
//   justify-content: space-between;
// `;

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
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  font-size: 15px;
  font-family: 'Poppins_400Regular';
`

export const PictureContainer = styled.View`
  flex: 1;
  align-items: center;

  /* justify-content: center; */
  /* margin: ${RFHeight(24)}px auto; */
`

export const FormContainer = styled.View`
  background: #fff;
  flex: 1;
  width: 100%;
  height: 100%;
  border-top-left-radius: ${RFHeight(32)}px;
  border-top-right-radius: ${RFHeight(32)}px;
  padding: ${RFHeight(24)}px;
  /* padding: ${RFHeight(24)}px ${RFWidth(24)}px; */
  /* background: ${({ theme }) => theme.colors.background}; */
  /* justify-content: center; */
  /* margin-bottom: ${RFHeight(32)}px; */
`

export const CancelButtonContainer = styled.View`
  margin: ${RFHeight(24)}px;
  width: 70px;
  height: 70px;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.attention};
  border-radius: ${RFHeight(80)}px;
`

export const ConfirmButtonContainer = styled.View`
  margin: ${RFHeight(24)}px;
  width: 70px;
  height: 70px;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.success};
  border-radius: ${RFHeight(80)}px;
`

export const Title = styled.Text``

export const CameraContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const CamBtnContainer = styled.View`
  flex: 1;
  background-color: 'transparent';
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: ${RFHeight(50)}px;

  /* align-items: center;
  justify-content: center; */
`

export const CamButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 20;
  left: 20;
`
export const TouchableOpacity = styled.TouchableOpacity<TypeProps>`
  height: ${RFHeight(56)}px;
  border-radius: ${RFHeight(8)}px;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.type === 'secondary' &&
    css`
      border-width: ${RFWidth(2)}px;
      border-color: ${({ theme }) => theme.colors.primary};
    `}
`
export const ButtonText = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFFontSize(18)}px;
  ${(props) =>
    props.type === 'primary' &&
    css`
      color: #ffffff;
    `}
  ${(props) =>
    (props.type === 'secondary' || props.type === 'tertiary') &&
    css`
      color: ${({ theme }) => theme.colors.primary};
    `}
`

export const ModalBody = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin: ${RFHeight(20)}px;
`

export const ModalImage = styled.Image`
  width: 100%;
  height: 80%;
  border-radius: ${RFHeight(10)}px;
`
export const ModalFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

import { Feather } from '@expo/vector-icons'
import styled, { css } from 'styled-components/native'
import { RFFontSize, RFHeight } from '../../utils/getResponsiveSizes'

interface Model {
  model: 'RETANGLE' | 'SQUARE' | 'CIRCLE'
}
export const PictureStyled = styled.Image<Model>`
  ${({ model }) => {
    if (model === 'RETANGLE') {
      return css`
        width: 320px;
        height: 240px;
      `
    }
    if (model === 'SQUARE') {
      return css`
        width: 320px;
        height: 320px;
      `
    }
    return css`
      width: 120px;
      height: 120px;
      border-radius: 80px;
    `
  }}
`

export const Placeholder = styled.TouchableOpacity<Model>`
  ${({ model }) => {
    if (model === 'RETANGLE') {
      return css`
        width: 320px;
        height: 240px;
      `
    }
    if (model === 'SQUARE') {
      return css`
        width: 320px;
        height: 320px;
      `
    }
    return css`
      width: 120px;
      height: 120px;
      border-radius: 80px;
    `
  }}
  justify-content: center;
  align-items: center;
  border: 1px dashed ${({ theme }) => theme.colors.details};
  background-color: ${({ theme }) => theme.colors.background_over};
  margin-bottom: ${RFHeight(32)}px;
`

export const PlaceholderIcon = styled(Feather)`
  color: ${({ theme }) => theme.colors.details};
`

export const PlaceholderText = styled.Text`
  font-size: ${RFFontSize(14)}px;
  text-align: center;
  margin: ${RFHeight(8)}px;
  color: ${({ theme }) => theme.colors.details};
`

export const UpdateImageButton = styled.TouchableOpacity`
  margin-top: ${RFHeight(8)}px;
  margin-bottom: ${RFHeight(32)}px;
`

export const UpdateImageText = styled.Text`
  font-size: ${RFFontSize(14)}px;
  /* font-family: ${({ theme }) => theme.fonts.bold}; */
  /* color: ${({ theme }) => theme.colors.primary}; */
`

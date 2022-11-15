import { Entypo } from '@expo/vector-icons'
import styled, { css } from 'styled-components/native'
import { RFFontSize, RFHeight, RFWidth } from '../../utils/getResponsiveSizes'

interface DashboardIconProps {
  type: 'opened' | 'closed'
}

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  /* resizemode: contain; */
  width: 45%;
  height: ${RFHeight(100)}px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${RFHeight(15)}px;
  border-color: ${({ theme }) => theme.colors.details};
  border-width: ${RFWidth(1)}px;
  margin: ${RFHeight(15)}px;
`

export const CardTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFFontSize(12)}px;
  color: ${({ theme }) => theme.colors.text_secondary};
  /* margin-top: ${RFHeight(15)}px; */
`

export const CardBody = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
`

export const CardData = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFFontSize(24)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const CardIcon = styled(Entypo)<DashboardIconProps>`
  /* color: ${({ theme }) => theme.colors.primary}; */
  ${({ type, theme }) =>
    type === 'opened' &&
    css`
      color: ${theme.colors.yellow};
    `}
  ${({ type, theme }) =>
    type === 'closed' &&
    css`
      color: ${theme.colors.success};
    `}
`

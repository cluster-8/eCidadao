import styled from 'styled-components/native'
import { Entypo, Feather } from '@expo/vector-icons'
import { RFHeight, RFFontSize } from '../../utils/getResponsiveSizes'

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  padding-top: ${RFHeight(60)}px;
`

export const SearchbarContent = styled.View`
  position: absolute;
  top: ${RFHeight(20)}px; ;
  width: 100%;
  margin-left: ${RFHeight(20)}px;
  margin-right: ${RFHeight(20)}px;
`

export const SearchBar = styled.TextInput`
  border-radius: ${RFHeight(10)}px;
  margin: ${RFHeight(5)}px ${RFHeight(20)}px;
  color: ${({ theme }) => theme.colors.black};
  border-color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.white};
  border-width: ${RFHeight(1)}px;
  height: ${RFHeight(45)}px;
  padding: ${RFHeight(10)}px
  font-size: ${RFFontSize(18)}px;
  width: 90%;
`

export const Icon = styled(Entypo)`
  position: absolute;
  top: ${RFHeight(15)}px;
  z-index: 1;
  right: ${RFHeight(30)}px;
`

export const GetLocationButton = styled.TouchableOpacity`
  position: absolute;
  right: ${RFHeight(0)}px;
  bottom: ${RFHeight(0)}px;
  background-color: ${({ theme }) => theme.colors.background};
  border-color: ${({ theme }) => theme.colors.text};
  border-width: ${RFHeight(2)}px;
  height: ${RFHeight(50)}px;
  width: ${RFHeight(50)}px;
  margin-bottom: ${RFHeight(20)}px;
  margin-right: ${RFHeight(20)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${RFHeight(50)}px;
`

export const GetLocationIcon = styled(Feather)``

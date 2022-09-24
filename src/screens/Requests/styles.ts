import styled from 'styled-components/native'
import { Entypo, Feather } from '@expo/vector-icons'
import { RFHeight } from '../../utils/getResponsiveSizes'

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  padding-top: ${RFHeight(60)}px;
`

export const SearchbarContent = styled.View`
  position: absolute;
  top: 0px;
  width: 100%;
`

export const SearchBar = styled.TextInput`
  border-radius: 10px;
  margin: 5px 20px;
  margin-left: 10px;
  color: #000000;
  border-color: #004997;
  background-color: #ffffff;
  border-width: 1px;
  height: 45px;
  padding: 0 10px;
  font-size: 18px;
  width: 350px;
`

export const Icon = styled(Entypo)`
  position: absolute;
  top: 15px;
  z-index: 1;
  right: 80px;
`

export const GetLocationButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border-color: ${({ theme }) => theme.colors.text};
  border-width: 2px;
  height: 50px;
  width: 50px;
  margin-bottom: 20px;
  margin-right: 20px;

  align-items: center;
  justify-content: center;
  border-radius: 50px;
`

export const GetLocationIcon = styled(Feather)``

import styled from 'styled-components/native';
import { Entypo } from "@expo/vector-icons";

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
  align-items: center;
  justify-content: center;
`;

export const SearchbarContent = styled.View`
  position: absolute;
  top: 10px;
  width: 100%;
`;

export const SearchBar = styled.TextInput`
  border-radius: 10px;
  margin: 20px;
  color: #000000;
  border-color: #004997;
  background-color: #FFFFFF;
  border-width: 1px;
  height: 45px;
  padding: 0 10px;
  font-size: 18px;
`;

export const Icon = styled(Entypo)`
  position: absolute;
  top: 30px;
  z-index: 1;
  right: 35px;
`;

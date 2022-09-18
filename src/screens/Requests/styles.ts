import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";
import { RFHeight } from "../../utils/getResponsiveSizes";

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  padding-top: ${RFHeight(60)}px;
`;

export const SearchbarContent = styled.View`
  position: absolute;
  top: 10px;
  width: 100%;
`;

export const SearchBar = styled.TextInput`
  border-radius: 10px;
  margin: 5px 20px;
  color: #000000;
  border-color: #004997;
  background-color: #ffffff;
  border-width: 1px;
  height: 45px;
  padding: 0 10px;
  font-size: 18px;
`;

export const Icon = styled(Entypo)`
  position: absolute;
  top: 15px;
  z-index: 1;
  right: 35px;
`;

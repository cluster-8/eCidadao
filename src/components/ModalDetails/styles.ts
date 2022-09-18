import { ImageBackground } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1%;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
  margin-bottom: -20px;
`;

export const Content = styled.View`
  flex: 1%;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
  margin-bottom: -20px;
`;

export const ModalContent = styled.View`
  margin: 20px;
  width: 100%;
  height: 90%;
  margin-top: auto;
  margin-bottom: 0;
  background-color: #f6f6f6;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  align-items: center;
  /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2); */
`;

export const CloseButton = styled.Pressable`
  background-color: #f6f6f6;
  opacity: 0.5;
  position: absolute;
  top: 10px;
  left: 90%;
`;

export const ImageContent = styled.View`
  flex: 1;
  width: 100%;
`;

export const DescriptionContainer = styled.View`
  flex: 2;
  width: 90%;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
`;

export const Image = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);   */
`;

export const Title = styled.Text`
  color: #3f3e40;
  font-size: 30px;
  line-height: 84px;
  font-weight: bold;
  text-align: center;
  font-family: "Poppins_600SemiBold";
`;

export const InfoRow = styled.View`
  /* padding: 6px; */
  padding-bottom: 6px;
  flex-direction: row;
`;

export const IconContainer = styled.View`
  flex: 1;
  width: 15%;
`;

export const Info = styled.Text`
  align-items: center;
  justify-content: center;
  width: 85%;
  font-size: 14px;
  font-family: "Poppins_400Regular";
`;

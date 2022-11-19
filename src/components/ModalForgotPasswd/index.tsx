import React, { useState } from 'react'
import { View, Modal, KeyboardAvoidingView } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { TextInput } from '../../components/TextInput'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'

import {
  ModalContent,
  Container,
  TitleView,
  Title,
  CloseButton,
  Content,
  InputView,
  TextDescription,
  ButtonView,
  SubmitButton,
  SubmitText,
} from './styles'
import { RFHeight } from '../../utils/getResponsiveSizes'

const schema = yup.object().shape({
  email: yup.string().required('Email obrigatório'),
})

interface IforgotPasswdModal {
  modalVisible: boolean
  handleClose: any
}

export const ModalForgotPasswd: React.FC<IforgotPasswdModal> = (props) => {
  const [email, setEmail] = useState('')
  const navigation: any = useNavigation()

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  function handleClick() {
    navigation?.navigate('ForgotPassword')
    props.handleClose()
  }

  return (
    <Container>
      <Modal
        animationType="slide"
        visible={props.modalVisible}
        transparent={true}
      >
        <Content behavior="padding">
          <ModalContent>
            <CloseButton onPress={props.handleClose}>
              <Entypo name="cross" size={RFHeight(30)} />
            </CloseButton>
            <TitleView>
              <Title>Recuperar Senha</Title>
              <TextDescription>
                Por favor, informe seu email de cadastro.
              </TextDescription>
            </TitleView>
            <InputView>
              <TextInput
                onChangeText={(text: string) => setValue('email', text)}
                errorMessage={errors?.name?.message}
                defaultValue={email}
                control={control}
                placeholder="Digite seu Email"
                label="Email"
                name="email"
                icon="mail"
              />
              <ButtonView>
                <SubmitButton onPress={handleClick}>
                  <SubmitText>Enviar</SubmitText>
                </SubmitButton>
              </ButtonView>
            </InputView>
          </ModalContent>
        </Content>
      </Modal>
    </Container>
  )
}

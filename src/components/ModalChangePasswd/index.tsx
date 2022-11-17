import React, { useState } from 'react'
import { Modal } from 'react-native'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Entypo } from '@expo/vector-icons'

import {
  Container,
  Content,
  ModalContent,
  Title,
  TitleView,
  DescriptionView,
  TextDescription,
  InputView,
  ButtonView,
  ConfirmButton,
  ConfirmText,
  CloseButton

} from './styles'

const schema = yup.object().shape({
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null]),
  password: yup.string().min(6, 'Mínimo de 6 caracteres'),
})


import { TextInput } from '../../components/TextInput'
import { RFHeight } from '../../utils/getResponsiveSizes'



interface IModalChangePasswd {
  modalVisible: boolean
  handleClose: any
}

export const ModalChangePasswd: React.FC<IModalChangePasswd> = (props) => {

  const [password, setPassword] = useState('')

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  return (
    <Container>
      <Modal
        animationType="slide"
        visible={props.modalVisible}
        transparent={true}
              >
        <Content>
          <ModalContent>
          <CloseButton onPress={props.handleClose}>
          <Entypo name="cross" size={RFHeight(30)} />
          </CloseButton>
            <TitleView>
              <Title>Alterar Senha</Title>
            </TitleView>
            <DescriptionView>
              <TextDescription> Digite sua senha atual de acesso, em seguida sua nova senha.</TextDescription>
            </DescriptionView>
            <InputView>              
            <TextInput
              onChangeText={(text: string) => setValue('password', text)}
              errorMessage={errors?.password?.message}
              defaultValue={password}
              control={control}
              placeholder="Digite a senha atual"
              secureTextEntry
              name="password"
              label="Senha Atual"
              icon="lock"
            />

              <TextInput
              onChangeText={(text: string) => setValue('password', text)}
              errorMessage={errors?.password?.message}
              defaultValue={password}
              control={control}
              placeholder="Digite a nova senha"
              secureTextEntry
              name="password"
              label="Nova Senha"
              icon="lock"
            />

            <TextInput
              onChangeText={(text: string) =>
                setValue('passwordConfirmation', text)
              }
              errorMessage={errors?.passwordConfirmation?.message}
              control={control}
              placeholder="Digite a senha novamente"
              label="Confirme sua Senha"
              name="passwordConfirmation"
              secureTextEntry
              icon="lock"
            />

            </InputView>
            <ButtonView>
              <ConfirmButton onPress={props.handleClose}> 
                <ConfirmText>Confirmar</ConfirmText>
              </ConfirmButton>
            </ButtonView>
            </ModalContent>
            </Content>
            </Modal>
            </Container>

)
}

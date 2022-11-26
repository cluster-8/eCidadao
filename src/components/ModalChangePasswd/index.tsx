import React, { useEffect } from 'react'
import { Modal, Alert } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import { Entypo } from '@expo/vector-icons'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import {
  DescriptionView,
  TextDescription,
  ConfirmButton,
  ModalContent,
  CloseButton,
  ConfirmText,
  ButtonView,
  Container,
  InputView,
  TitleView,
  Content,
  Title,
} from './styles'

import { RFHeight } from '../../utils/getResponsiveSizes'
import { TextInput } from '../../components/TextInput'
import { useAuth } from '../../hooks/useAuth'

const schema = yup.object().shape({
  newPasswordConfirmation: yup.string().oneOf([yup.ref('newPassword'), null]),
  newPassword: yup.string().min(6, 'Mínimo de 6 caracteres'),
  oldPassword: yup.string(),
})

interface IModalChangePasswd {
  modalVisible: boolean
  handleClose: any
}

export const ModalChangePasswd: React.FC<IModalChangePasswd> = (props) => {
  const { updatePassword } = useAuth()

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  function handleClose() {
    setValue('newPassword', '')
    setValue('newPasswordConfirmation', '')
    setValue('oldPassword', '')
    props.handleClose()
  }

  async function handleUpdate(data: any) {
    const response = await updatePassword(data)
    if (response && response.status === 200) {
      Alert.alert('Alterar senha', 'Senha alterada com sucesso!', [
        {
          text: 'OK',
        },
      ])
    } else {
      Alert.alert(
        'Falha',
        'Ops! Ocorreu um erro ao alterar a senha, tente novamente!',
        [
          {
            text: 'OK',
          },
        ],
      )
    }
    handleClose()
  }

  useEffect(() => {
    register('newPasswordConfirmation')
    register('oldPassword')
    register('newPassword')
  }, [])

  return (
    <Container>
      <Modal
        animationType="slide"
        visible={props.modalVisible}
        transparent={true}
      >
        <Content>
          <ModalContent>
            <CloseButton onPress={handleClose}>
              <Entypo name="cross" size={RFHeight(30)} />
            </CloseButton>
            <TitleView>
              <Title>Alterar Senha</Title>
            </TitleView>
            <DescriptionView>
              <TextDescription>
                Digite sua senha atual de acesso, em seguida sua nova senha.
              </TextDescription>
            </DescriptionView>
            <InputView>
              <TextInput
                onChangeText={(text: string) => setValue('oldPassword', text)}
                errorMessage={errors?.oldPassword?.message}
                placeholder="Digite a senha atual"
                label="Senha Atual"
                name="oldPassword"
                defaultValue={''}
                control={control}
                secureTextEntry
                icon="lock"
              />

              <TextInput
                onChangeText={(text: string) => setValue('newPassword', text)}
                errorMessage={errors?.oldPassword?.message}
                placeholder="Digite a nova senha"
                name="newPassword"
                label="Nova Senha"
                defaultValue={''}
                control={control}
                secureTextEntry
                icon="lock"
              />

              <TextInput
                onChangeText={(text: string) =>
                  setValue('newPasswordConfirmation', text)
                }
                errorMessage={errors?.newPasswordConfirmation?.message}
                placeholder="Digite a senha novamente"
                name="newPasswordConfirmation"
                label="Confirme sua Senha"
                defaultValue={''}
                control={control}
                secureTextEntry
                icon="lock"
              />
            </InputView>
            <ButtonView>
              <ConfirmButton onPress={handleSubmit(handleUpdate)}>
                <ConfirmText>Confirmar</ConfirmText>
              </ConfirmButton>
            </ButtonView>
          </ModalContent>
        </Content>
      </Modal>
    </Container>
  )
}

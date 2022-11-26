import React, { useState } from 'react'
import { Alert } from 'react-native'
import * as yup from 'yup'

import { TextInput } from '../../components/TextInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '../../components/Button'
import { useForm } from 'react-hook-form'
import { ModalChangePasswd } from '../../components/ModalChangePasswd'

import { useAuth } from '../../hooks/useAuth'

import { Entypo, Ionicons } from '@expo/vector-icons'

import {
  HeaderContainer,
  HeaderTitle,
  HeaderText,
  Container,
  LogOffButton,
  ButtonContainer,
  ExcludeContainer,
  ExcludeTitleContainer,
  ExcludeTitle,
  DescriptionContainer,
  DescriptionText,
  ExcludeButton,
  ExcludeText,
  ExcludeButtonContainer,
  ChangePasswdContainer,
  ChangePasswd,
  ChangePasswdText,
} from './styles'

import { BodyContainer } from '../SignUp/styles'
import { RFHeight } from '../../utils/getResponsiveSizes'

interface UserData {
  name: string
  email: string
  cpf: string
}

const userData = yup.object().shape({
  password: yup.string().min(6, 'Mínimo de 6 caracteres'),
  email: yup.string().required('Email obrigatório'),
  name: yup.string().required('Nome obrigatório'),
  document: yup.string(),
})

const Profile: React.FC = () => {
  const { signOut, authUser, updateUser, deleteAccount } = useAuth()
  const [visibleModal, setVisibleModal] = useState(false)
  const [email, setEmail] = useState('vinnie@gmail.com')
  const [password, setPassword] = useState('Abc123#')
  const [name, setName] = useState('Vinnie')

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userData),
  })

  async function handleSaveChangesClick(data: any) {
    const response = await updateUser(data)
    if (response.status === 200) {
      Alert.alert('Salvar alterações', 'Alterações salvas com sucesso!', [
        {
          text: 'OK',
        },
      ])
    } else {
      Alert.alert(
        'Falha',
        'Ops! Ocorreu um erro ao salvar as alterações, tente novamente!',
        [
          {
            text: 'OK',
          },
        ],
      )
    }
  }

  async function handleDeleteAccount() {
    Alert.alert(
      'Excluir conta',
      'Tem certeza que deseja excluir essa conta? Essa ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancelar'),
          style: 'cancel',
        },
        { text: 'Excluir', onPress: () => deleteAccount() },
      ],
    )
  }

  async function logout() {
    await signOut()
  }

  return (
    <Container>
      <HeaderContainer>
        <LogOffButton onPress={logout}>
          <Entypo name="log-out" size={RFHeight(35)} />
        </LogOffButton>
        <HeaderTitle>Meu Perfil</HeaderTitle>
        <HeaderText>Visualize ou altere seus dados</HeaderText>
      </HeaderContainer>

      <BodyContainer>
        <TextInput
          errorMessage={errors?.name?.message}
          defaultValue={authUser.name}
          control={control}
          placeholder="Nome"
          label="Nome"
          name="name"
          icon="user"
        />

        <TextInput
          errorMessage={errors?.email?.message}
          defaultValue={authUser.email}
          control={control}
          placeholder="Email"
          disabled={true}
          label="Email"
          name="email"
          icon="mail"
        />

        <TextInput
          errorMessage={errors?.document?.message}
          defaultValue={authUser.cpf}
          control={control}
          disabled={true}
          icon="credit-card"
          placeholder="CPF"
          name="document"
          label="CPF"
        />

        <ChangePasswdContainer>
          <ChangePasswd onPress={() => setVisibleModal(true)}>
            <ChangePasswdText>Alterar Senha</ChangePasswdText>
          </ChangePasswd>

          <ModalChangePasswd
            modalVisible={visibleModal}
            handleClose={() => setVisibleModal(false)}
          />
        </ChangePasswdContainer>

        <ButtonContainer>
          <Button
            title="Salvar alterações"
            onPress={handleSubmit(handleSaveChangesClick)}
          />
        </ButtonContainer>

        <ExcludeContainer>
          <ExcludeTitleContainer>
            <Ionicons name="trash" size={RFHeight(25)} color={'#3F3E40'} />
            <ExcludeTitle>Deletar sua conta</ExcludeTitle>
          </ExcludeTitleContainer>
          <DescriptionContainer>
            <DescriptionText>
              Essa ação é irreversível. Você irá deletar sua conta pessoal e
              todos seus dados.{' '}
            </DescriptionText>
          </DescriptionContainer>
          <ExcludeButtonContainer>
            <ExcludeButton onPress={handleDeleteAccount}>
              <ExcludeText>Deletar Conta</ExcludeText>
            </ExcludeButton>
          </ExcludeButtonContainer>
        </ExcludeContainer>
      </BodyContainer>
    </Container>
  )
}

export default Profile

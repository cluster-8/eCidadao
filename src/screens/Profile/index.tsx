import React, { useState, useMemo } from 'react'
import { Alert, Text } from 'react-native'
import * as yup from 'yup'

import { TextInput } from '../../components/TextInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '../../components/Button'
import { useForm } from 'react-hook-form'

import { useAuth } from '../../hooks/useAuth'

import { Entypo } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

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
  ExcludeButtonContainer
} from './styles'

import { BodyContainer } from '../SignUp/styles'
import { RFHeight } from '../../utils/getResponsiveSizes'

const userData = yup.object().shape({
  password: yup.string().min(6, 'Mínimo de 6 caracteres'),
  email: yup.string().required('Email obrigatório'),
  name: yup.string().required('Nome obrigatório'),
  document: yup.string(),
})

const Profile: React.FC = () => {
  const { signOut, authUser } = useAuth()

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

  async function saveChanges() {
    const data = {
      password,
      email,
      name,
    }

    Alert.alert('Salvar alterações', 'Alterações salvas com sucesso!', [
      {
        text: 'OK',
        onPress: () => {
          console.log('Ok pressed', data)
          setPassword(data.password)
          setEmail(data.email)
          setName(data.name)
        },
      },
    ])
  }

  async function deleteAccount() {
    Alert.alert(
      'Excluir conta',
      'Tem certeza que deseja excluir essa conta? Essa ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancelar'),
          style: 'cancel',
        },
        { text: 'Excluir', onPress: () => console.log('Excluir') },
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
          <Entypo name="log-out" size={RFHeight(35)}/>
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
          label="Email"
          name="email"
          icon="mail"
        />

        <TextInput
          errorMessage={errors?.document?.message}
          defaultValue={authUser.cpf}
          control={control}
          editable={false}
          icon="credit-card"
          placeholder="CPF"
          name="document"
          label="CPF"
        />

        <TextInput
          errorMessage={errors?.password?.message}
          defaultValue={authUser.password}
          control={control}
          placeholder="Senha"
          name="password"
          label="Senha"
          icon="lock"
        />

        <ButtonContainer>
        <Button title="Salvar alterações" onPress={handleSubmit(saveChanges)} />
        </ButtonContainer>

        <ExcludeContainer>
          <ExcludeTitleContainer>
            <Ionicons
            name="trash"
            size={RFHeight(25)}
            color={'#3F3E40'}
            />
          <ExcludeTitle>Deletar sua conta</ExcludeTitle>
          </ExcludeTitleContainer>
          <DescriptionContainer>
            <DescriptionText>Essa ação é irreversível. Você irá deletar sua conta pessoal e todos seus dados. </DescriptionText>
          </DescriptionContainer>
          <ExcludeButtonContainer>

          <ExcludeButton onPress={deleteAccount}>
            <ExcludeText>Deletar Conta</ExcludeText>
          </ExcludeButton>
          </ExcludeButtonContainer>

        </ExcludeContainer>
      </BodyContainer>
    </Container>
  )
}

export default Profile

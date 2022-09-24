import React, { useState, useMemo } from 'react'
import { Alert } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'

import { TextInput } from '../../components/TextInput'
import { Button } from '../../components/Button'

import {
  Container,
  HeaderContainer,
  HeaderTitle,
  HeaderText,
  FormContainer,
  ExcludeButton,
} from './styles'

const userData = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('Email obrigatório'),
  document: yup.string(),
  password: yup.string().min(6, 'Mínimo de 6 caracteres'),
})

const Profile: React.FC = () => {
  const [name, setName] = useState('Vinnie')
  const [email, setEmail] = useState('vinnie@gmail.com')
  const [password, setPassword] = useState('Abc123#')

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userData),
  })

  //* mock
  const cpf = useMemo(() => {
    return '12312312312'
  }, [])

  async function saveChanges() {
    const data = {
      name,
      email,
      password,
    }

    Alert.alert('Salvar alterações', 'Alterações salvas com sucesso!', [
      {
        text: 'OK',
        onPress: () => {
          console.log('Ok pressed', data)
          setName(data.name)
          setPassword(data.password)
          setEmail(data.email)
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

  return (
    <Container>
      <FormContainer>
        <HeaderContainer>
          <HeaderTitle>Meu Perfil</HeaderTitle>
          <HeaderText>Visualize ou altere seus dados</HeaderText>
        </HeaderContainer>

        <TextInput
          label="Nome"
          name="name"
          icon="user"
          placeholder="Nome"
          control={control}
          defaultValue={name}
          errorMessage={errors?.name?.message}
        />

        <TextInput
          label="Email"
          name="email"
          icon="mail"
          placeholder="Email"
          control={control}
          defaultValue={email}
          errorMessage={errors?.email?.message}
        />

        <TextInput
          label="CPF"
          name="document"
          icon="credit-card"
          placeholder="CPF"
          control={control}
          editable={false}
          defaultValue={cpf}
          errorMessage={errors?.document?.message}
        />

        <TextInput
          label="Senha"
          name="password"
          icon="lock"
          placeholder="Senha"
          secureTextEntry
          control={control}
          defaultValue={password}
          errorMessage={errors?.password?.message}
        />

        <ExcludeButton onPress={deleteAccount}>Excluir Conta</ExcludeButton>
      </FormContainer>

      <Button title="Salvar alterações" onPress={handleSubmit(saveChanges)} />
    </Container>
  )
}

export default Profile

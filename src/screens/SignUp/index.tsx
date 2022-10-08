import React, { useState, useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextInput } from '../../components/TextInput'
import { TouchableOpacity } from 'react-native'
import { useForm } from 'react-hook-form'
import CheckBox from 'expo-checkbox'
import * as yup from 'yup'

import { Button } from '../../components/Button'
import {
  HeaderContainer,
  BodyContainer,
  TermsUseView,
  TermsUseText,
  TermsUseLink,
  TextHeader,
  Container,
  LoginView,
  LoginText,
  LoginLink,
  Title,
} from './styles'

const schema = yup.object().shape({
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
  password: yup.string().min(6, 'Mínimo de 6 caracteres'),
  email: yup.string().required('Email obrigatório'),
  name: yup.string().required('Nome obrigatório'),
  cpf: yup.string().required('CPF obrigatório'),
})

const SignUp: React.FC = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')

  const [isChecked, setChecked] = useState(false)

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    console.log(new Date())
  }, [isChecked])

  async function signUp(data: any) {
    console.log(data)
  }

  useEffect(() => {
    register('confirmPassword')
    register('password')
    register('email')
    register('name')
    register('cpf')
  }, [])

  return (
    <Container>
      <HeaderContainer>
        <Title>Vamos Começar!</Title>
        <TextHeader>
          Crie uma conta no eCidadão para ter acesso à todas as funcionalidades
        </TextHeader>
      </HeaderContainer>
      <BodyContainer>
        <TextInput
          onChangeText={(text: string) => setValue('name', text)}
          errorMessage={errors?.name?.message}
          defaultValue={name}
          control={control}
          placeholder="Digite seu Nome"
          label="Nome"
          name="name"
          icon="user"
        />

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

        <TextInput
          onChangeText={(text: string) => setValue('cpf', text)}
          errorMessage={errors?.document?.message}
          defaultValue={cpf}
          control={control}
          placeholder="Digite seu CPF"
          icon="credit-card"
          editable={false}
          name="document"
          label="CPF"
        />

        <TextInput
          onChangeText={(text: string) => setValue('password', text)}
          errorMessage={errors?.password?.message}
          defaultValue={password}
          control={control}
          placeholder="Digite a senha"
          secureTextEntry
          name="password"
          label="Senha"
          icon="lock"
        />

        <TextInput
          onChangeText={(text: string) => setValue('confirmPassword', text)}
          errorMessage={errors?.password?.message}
          defaultValue={password}
          control={control}
          placeholder="Digite a senha novamente"
          label="Confirme sua Senha"
          name="confirmPassword"
          secureTextEntry
          icon="lock"
        />

        <TermsUseView>
          <CheckBox value={isChecked} onValueChange={setChecked} />

          <TermsUseText>Concordo com os </TermsUseText>

          <TouchableOpacity onPress={() => console.log('asdas')}>
            <TermsUseLink>Termos de Uso</TermsUseLink>
          </TouchableOpacity>
        </TermsUseView>

        <Button title="Confirmar" onPress={handleSubmit(signUp)} />

        <LoginView>
          <LoginText>Já tem uma conta?</LoginText>

          <TouchableOpacity onPress={() => console.log('asdas')}>
            <LoginLink>Faça o login</LoginLink>
          </TouchableOpacity>
        </LoginView>
      </BodyContainer>
    </Container>
  )
}

export default SignUp
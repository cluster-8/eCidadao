import React, { useState, useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Animatable from 'react-native-animatable'
import { TouchableOpacity } from 'react-native'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { TextInput } from '../../components/TextInput'
import { Button } from '../../components/Button'

import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../hooks/useAuth'

import {
  ForgotPasswdButton,
  HeaderContainer,
  SubscribeButton,
  BodyContainer,
  Container,
  Title,
} from './styles'

const logoImage = require('../../../assets/ecidadao.png')

const schema = yup.object().shape({
  password: yup.string().min(6, 'Mínimo de 6 caracteres'),
  email: yup.string().email().required('Email obrigatório'),
  // name: yup.string().required('Nome obrigatório'),
  // document: yup.string(),
})

const SignIn: React.FC = (props: any) => {
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const navigation: any = useNavigation()

  const { signInWithPassword, authUser } = useAuth()

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  async function signIn(data: any) {
    console.log('TODO: função de signin...\n', data)
    await signInWithPassword(data)
  }


  useEffect(() => {
    register('email')
    register('password')
  }, [])

  return (
    <Container>
      <HeaderContainer>
        <Animatable.Image
          style={{ width: 250, height: 250 }}
          animation="flipInY"
          source={logoImage}
        />
      </HeaderContainer>

      <BodyContainer>
        <Title>Faça seu Login!</Title>

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
          onChangeText={(text: string) => setValue('password', text)}
          errorMessage={errors?.password?.message}
          defaultValue={password}
          control={control}
          placeholder="Senha"
          secureTextEntry
          name="password"
          label="Senha"
          icon="lock"
        />
        <TouchableOpacity
          onPress={() =>
            console.log('TODO: direcionar para a tela de "Esqueci a senha"...')
          }
        >
          <ForgotPasswdButton>Esqueci minha senha</ForgotPasswdButton>
        </TouchableOpacity>

        <Button title="Entrar" onPress={handleSubmit(signIn)} />

        <TouchableOpacity>
          <SubscribeButton onPress={() => navigation?.navigate('SingUp')}>
            Cadastre-se
          </SubscribeButton>
        </TouchableOpacity>
      </BodyContainer>
    </Container>
  )
}

export default SignIn

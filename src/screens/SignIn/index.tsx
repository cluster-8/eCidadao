import React, { useState, useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Animatable from 'react-native-animatable'
import { TouchableOpacity } from 'react-native'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ModalForgotPasswd } from '../../components/ModalForgotPasswd'

import { TextInput } from '../../components/TextInput'
import { Button } from '../../components/Button'

import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../hooks/useAuth'

import {
  HeaderContainer,
  SubscribeButton,
  BodyContainer,
  Container,
  Title,
  LogoAnimation,
  ForgotPasswdText,
  ForgotPasswdView,
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
  const [visibleModal, setVisibleModal] = useState(false)
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
    await signInWithPassword(data)
  }

  useEffect(() => {
    register('email')
    register('password')
  }, [])

  return (
    <Container>
      <HeaderContainer>
        {/* <Animatable.Image
          style={{ width: 230, height: 230 }}
          animation="flipInY"
          source={logoImage}
        /> */}
        <LogoAnimation animation="flipInY" source={logoImage} />
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
        <ForgotPasswdView>
        <TouchableOpacity onPress={() => setVisibleModal(true)}>

          <ForgotPasswdText>Esqueci minha senha</ForgotPasswdText>
          </TouchableOpacity>
          
        <ModalForgotPasswd
            modalVisible={visibleModal}
            handleClose={() => setVisibleModal(false)}
          />
          </ForgotPasswdView>

        <TouchableOpacity onPress={handleSubmit(signIn)}>
          <Button title="Entrar" onPress={handleSubmit(signIn)} />
        </TouchableOpacity>

        <TouchableOpacity>
          <SubscribeButton onPress={() => navigation?.navigate('SignUp')}>
            Cadastre-se
          </SubscribeButton>
        </TouchableOpacity>
      </BodyContainer>
    </Container>
  )
}

export default SignIn

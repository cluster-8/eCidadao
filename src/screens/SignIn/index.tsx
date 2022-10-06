import React, { useState, useMemo } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import * as Animatable from 'react-native-animatable'
import { TouchableOpacity } from 'react-native'
import {useNavigation} from '@react-navigation/native'


import { TextInput } from '../../components/TextInput'
import { Button } from '../../components/Button'

import {
  Container,
  HeaderContainer,
  Title,
  BodyContainer,
  SubscribeButton,
  ForgotPasswdButton,
} from './styles'


const userData = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('Email obrigatório'),
  document: yup.string(),
  password: yup.string().min(6, 'Mínimo de 6 caracteres'),
})

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('vinnie@gmail.com')
  const [password, setPassword] = useState('Abc123#')

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userData),
  })

  return (

      <Container>

          <HeaderContainer>
            <Animatable.Image style={{width:250, height:250}} animation="flipInY"  source={require('../../../assets/ecidadao.png')}/>
          </HeaderContainer>

          <BodyContainer>
            <Title>Faça seu Login!</Title>

              <TextInput
              label="Email"
              name="email"
              icon="mail"
              placeholder="Digite seu Email"
              control={control}
              defaultValue={email}

              errorMessage={errors?.name?.message}
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
            <TouchableOpacity onPress={() => console.log("asdas")}>
            <ForgotPasswdButton>Esqueci minha senha</ForgotPasswdButton>
            </TouchableOpacity>

            <Button title="Entrar" onPress={() => console.log("asdas")}/>

            <TouchableOpacity> 
            <SubscribeButton onPress={() => console.log("asdas")}>Cadastre-se</SubscribeButton>
            </TouchableOpacity>

          </BodyContainer>
      </Container>
  )
}

export default SignIn

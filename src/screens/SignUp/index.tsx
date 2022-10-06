import React, { useState, useEffect, useMemo } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { TouchableOpacity } from 'react-native'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import CheckBox from "expo-checkbox";
import { TextInput } from '../../components/TextInput'
import { Button } from '../../components/Button'

import {
  Container,
  HeaderContainer,
  Title,
  TextHeader,
  BodyContainer,
  TermsUseView,
  TermsUseText,
  TermsUseLink,
  LoginView,
  LoginText,
  LoginLink,
  
} from './styles'

const userData = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('Email obrigatório'),
  document: yup.string(),
  password: yup.string().min(6, 'Mínimo de 6 caracteres'),
  cpf: yup.string().required('CPF obrigatório'),
})

const SignUp: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpf, setcpf] = useState('')

  const [isChecked, setChecked] = useState(false);


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userData),
  })

  useEffect(()=>{
    console.log(new Date())
  },[isChecked])

  return (

      <Container>

          <HeaderContainer>
          <Title>Vamos Começar!</Title>
          <TextHeader>Crie uma conta no eCidadão para ter acesso à todas as funcionalidades</TextHeader>

          </HeaderContainer>
          <BodyContainer>

              <TextInput
              label="Nome"
              name="name"
              icon="user"
              placeholder="Digite seu Nome"
              control={control}
              defaultValue={name}
              errorMessage={errors?.name?.message}
            />

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
              label="CPF"
              name="document"
              icon="credit-card"
              placeholder="Digite seu CPF"
              control={control}
              editable={false}
              defaultValue={cpf}
              errorMessage={errors?.document?.message}
            />

              <TextInput
              label="Senha"
              name="password"
              icon="lock" 
              placeholder="Digite a senha"
              secureTextEntry
              control={control}
              defaultValue={password}
              errorMessage={errors?.password?.message}
            />

              <TextInput
              label="Confirme sua Senha"
              name="password"
              icon="lock"
              placeholder="Digite a senha novamente"
              secureTextEntry
              control={control}
              defaultValue={password}
              errorMessage={errors?.password?.message}
            />
            
            <TermsUseView>
              <CheckBox value={isChecked} onValueChange={setChecked}
        />   

              <TermsUseText>Concordo com os </TermsUseText>

              <TouchableOpacity onPress={() => console.log("asdas")}>
              <TermsUseLink>Termos de Uso</TermsUseLink>
              </TouchableOpacity>

            </TermsUseView>

              <Button title="Confirmar" onPress={() => console.log("asdas")}/>

              <LoginView>
             <LoginText>Já tem uma conta?</LoginText>

              <TouchableOpacity onPress={() => console.log("asdas")}>
              <LoginLink>Faça o login</LoginLink>
              </TouchableOpacity>

              </LoginView>

          </BodyContainer>
      </Container>
  )
}

export default SignUp
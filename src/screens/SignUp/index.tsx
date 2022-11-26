import React, { useState, useEffect } from 'react'
import { TextInput } from '../../components/TextInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { TouchableOpacity } from 'react-native'
import { useForm } from 'react-hook-form'
import CheckBox from 'expo-checkbox'
import * as yup from 'yup'

import { useNavigation } from '@react-navigation/native'
import { UseTermsModal } from '../../components/UseTermsModal'
import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/useAuth'
import { useTerms } from '../../hooks/useTerms'

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
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null]),
  password: yup.string().min(6, 'Mínimo de 6 caracteres'),
  email: yup.string().required('Email obrigatório'),
  name: yup.string().required('Nome obrigatório'),
  cpf: yup
    .string()
    .test('len', 'Precisa ter 11 números', (val) => val?.length === 11)
    .required('CPF obrigatório'),
})

const SignUp: React.FC = () => {
  const [visibleModal, setVisibleModal] = useState(false)
  const [isChecked, setChecked] = useState(false)
  const [password, setPassword] = useState('')
  const { signUp } = useAuth()
  const { getUsageTerms, usageTerms } = useTerms()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [agreedAt, setAgreedAt] = useState<any>()
  const navigation: any = useNavigation()

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
    setAgreedAt(new Date())
  }, [isChecked])

  async function handleClick(data: any) {
    if (!isChecked && !agreedAt) {
      console.log(
        'Exibir alerta informando a necessidade de concordar com os termos de uso',
      )
      return
    }
    const usageTermsAccepted = {
      usageTermsAcceptedAt: agreedAt,
      usageTermsId: usageTerms.id,
      usageTermsAcceptedItens: usageTerms.itens.map((i: any) => i.id),
    }
    const _data = { ...data, usageTermsAccepted }
    await signUp(_data)
  }

  async function getUsageTermsData() {
    // console.log('get usage terms...')
    await getUsageTerms()
    // console.log(res)
  }

  useEffect(() => {
    register('passwordConfirmation')
    register('password')
    register('email')
    register('name')
    register('cpf')
    getUsageTermsData()
  }, [])

  useEffect(() => {
    getUsageTermsData()
  }, [visibleModal])

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
          errorMessage={errors?.cpf?.message}
          defaultValue={cpf}
          control={control}
          placeholder="Digite seu CPF"
          icon="credit-card"
          name="cpf"
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

        <TermsUseView>
          <CheckBox value={isChecked} onValueChange={setChecked} />

          <TermsUseText>Concordo com os </TermsUseText>

          <TouchableOpacity onPress={() => setVisibleModal(true)}>
            <TermsUseLink>Termos de Uso</TermsUseLink>
          </TouchableOpacity>

          <UseTermsModal
            modalVisible={visibleModal}
            handleClose={() => setVisibleModal(false)}
            usageTerms={usageTerms}
          />
        </TermsUseView>
        <TouchableOpacity onPress={handleSubmit(handleClick)}>
          <Button title="Confirmar" onPress={handleSubmit(handleClick)} />
        </TouchableOpacity>
        <LoginView>
          <LoginText>Já tem uma conta?</LoginText>

          <TouchableOpacity onPress={() => navigation?.navigate('SignIn')}>
            <LoginLink>Faça o login</LoginLink>
          </TouchableOpacity>
        </LoginView>
      </BodyContainer>
    </Container>
  )
}

export default SignUp

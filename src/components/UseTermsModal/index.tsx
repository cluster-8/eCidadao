import React from 'react'
import { Content } from '../ModalTypes/styles'
import { View, Modal, Alert } from 'react-native'

import { useAuth } from '../../hooks/useAuth'

import {
  TextDescription,
  ModalContent,
  AcceptTermsButton,
  TermsButtonView,
  CloseTermsText,
  CloseTermsButton,
  CloseButton,
  ButtonView,
  Container,
  CloseText,
  TitleView,
  TermsView,
  TextItens,
  Subtitle,
  Title,
} from './styles'

interface IUseTermsModal {
  modalVisible: boolean
  handleClose: any
  usageTerms: any
  hasNewUsageTerms?: any
  acceptNewUsageTerms?: any
}

export const UseTermsModal: React.FC<IUseTermsModal> = (props: any) => {
  // console.log('Has New usage Terms', props.hasNewUsageTerms)

  const { signOut } = useAuth()

  async function handleCloseClick() {
    console.log('handleCloseClik() -> UseTermsModal...')
    Alert.alert(
      'Recusar termos de uso',
      'É necessário aceitar os termos de uso para continuar a usar o eCidadão. Estamos de direcionando para a tela de login.',
      [
        {
          text: 'OK',
          onPress: async () => {
            await refuseNewTerms()
          },
        },
      ],
    )
  }

  async function refuseNewTerms() {
    console.log('refuseNewTerms() -> UseTermsModal...')
    props.handleClose()
    await signOut()
  }

  return (
    <Container>
      <Modal
        animationType="slide"
        visible={props.modalVisible}
        transparent={true}
      >
        <Content>
          <ModalContent>
            <TitleView>
              {props.hasNewUsageTerms === true ? (
                <Title>Atualização dos Termos de Uso</Title>
              ) : (
                <Title>Termos de Uso</Title>
              )}
            </TitleView>

            <TermsView>
              {props.hasNewUsageTerms && (
                <TextDescription>
                  Os termos de uso do eCidadão foram atualizados, para continuar
                  a utilizar nossos serviços será necessário que aceite os novos
                  termos.
                </TextDescription>
              )}
              <TextDescription>
                Os serviços do eCidadão são fornecidos pela pessoa jurídica com
                a Razão Social: fins acadêmicos, com nome fantasia Cluster 8,
                titular da propriedade intelectual sobre software, website,
                aplicativos, conteúdos e demais ativos relacionados à plataforma
                eCidadão.
              </TextDescription>

              <>
                {props?.usageTerms?.itens?.map((item: any, index: number) => {
                  return (
                    <View key={index}>
                      <Subtitle key={item.id}>{item.title}</Subtitle>
                      {item.paragraphs.map(
                        (paragraph: string, index: number) => {
                          return <TextItens key={index}>{paragraph}</TextItens>;
                        }
                      )}
                    </View>
                  );
                })}
              </>
              {props.hasNewUsageTerms ? (
                <TermsButtonView>
                  <CloseTermsButton onPress={handleCloseClick}>
                    <CloseTermsText>Fechar</CloseTermsText>
                  </CloseTermsButton>
                  <AcceptTermsButton onPress={props.acceptNewUsageTerms}>
                    <CloseText>Aceitar</CloseText>
                  </AcceptTermsButton>
                </TermsButtonView>
              ) : (
                <ButtonView>
                  <CloseButton onPress={props.handleClose}>
                    <CloseText>Fechar</CloseText>
                  </CloseButton>
                </ButtonView>
              )}
            </TermsView>
          </ModalContent>
        </Content>
      </Modal>
    </Container>
  );
}

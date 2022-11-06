import React from 'react'
import { Content } from '../ModalTypes/styles'
import { View, Modal } from 'react-native'

import {
  TextDescription,
  ModalContent,
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
}

export const UseTermsModal: React.FC<IUseTermsModal> = (props) => {
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
              <Title>Termos de Uso</Title>
            </TitleView>

            <TermsView>
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
                          return <TextItens key={index}>{paragraph}</TextItens>
                        },
                      )}
                    </View>
                  )
                })}
              </>
              <ButtonView>
                <CloseButton onPress={props.handleClose}>
                  <CloseText>Fechar</CloseText>
                </CloseButton>
              </ButtonView>
            </TermsView>
          </ModalContent>
        </Content>
      </Modal>
    </Container>
  )
}

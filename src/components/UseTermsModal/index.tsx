import React, { useState } from 'react'
import { View, Modal } from 'react-native'
import { Content } from '../ModalTypes/styles'

import { 
  Container, 
  ModalContent,
  ButtonView, 
  CloseButton,
  CloseText,
  TitleView,
  Title,
  TextDescription,
  Subtitle,
  TextItens, 
  TermsView} 
  from './styles'

import { Button } from '../../components/Button'
import { ButtonText } from '../Button/styles'

interface IUseTermsModal {
  modalVisible: boolean
  handleClose: any
}

const TermosDeUso={
  "id": "63619af4eaaae11bbdbb3172",
  "version": 4,
  "itens": [
    {
      "title": "Do objeto",
      "paragraphs": [
        "A plataforma visa licenciar o uso de seu software, website, aplicativos e demais ativos de propriedade intelectual, fornecendo ferramentas para auxiliar e dinamizar o dia a dia dos seus usuários.",
        "A plataforma caracteriza-se pela prestação do seguinte serviço: um aplicativo colaborativo para a sociedade e através desse aplicativo os usuários poderão reportar \"problemas\" da cidade para a \"prefeitura\". Podendo tirar foto do problema, adicionar uma descrição, a localização do problema para que a prefeitura possa saber sobre o problema e ir consertá-lo."
      ]
    },
    {
      "title": "Da aceitação",
      "paragraphs": [
        "O presente Termo estabelece obrigações contratadas de livre e espontânea vontade, por tempo indeterminado, entre a plataforma e as pessoas físicas ou jurídicas, usuárias do aplicativo.",
        "Ao utilizar a plataforma o usuário aceita integralmente as presentes normas e compromete-se a observá-las, sob o risco de aplicação das penalidade cabíveis.",
        "A aceitação do presente instrumento é imprescindível para o acesso e para a utilização de quaisquer serviços fornecidos pela empresa. Caso não concorde com as disposições deste instrumento, o usuário não deve utilizá-los."
      ]
    },
    {
      "title": "Do acesso dos usuários",
      "paragraphs": [
        "Serão utilizadas todas as soluções técnicas à disposição do responsável pela plataforma para permitir o acesso ao serviço 24 (vinte e quatro) horas por dia, 7 (sete) dias por semana. No entanto, a navegação na plataforma ou em alguma de suas páginas poderá ser interrompida, limitada ou suspensa para atualizações, modificações ou qualquer ação necessária ao seu bom funcionamento."
      ]
    },
    {
      "title": "Do cadastro",
      "paragraphs": [
        "O acesso às funcionalidades da plataforma exigirá a realização de um cadastro prévio e, a depender dos serviços ou produtos escolhidos, o pagamento de determinado valor.",
        "Ao se cadastrar o usuário deverá informar dados completos, recentes e válidos, sendo de sua exclusiva responsabilidade manter referidos dados atualizados, bem como o usuário se compromete com a veracidade dos dados fornecidos.",
        "O usuário se compromete a não informar seus dados cadastrais e/ou de acesso à plataforma a terceiros, responsabilizando-se integralmente pelo uso que deles seja feito.",
        "Menores de 18 anos e aqueles que não possuírem plena capacidade civil deverão obter previamente o consentimento expresso de seus responsáveis legais para utilização da plataforma e dos serviços ou produtos, sendo de responsabilidade exclusiva dos mesmos o eventual acesso por menores de idade e por aqueles que não possuem plena capacidade civil sem a prévia autorização.",
        "Mediante a realização do cadastro o usuário declara e garante expressamente ser plenamente capaz, podendo exercer e usufruir livremente dos serviços e produtos.",
        "O usuário deverá fornecer um endereço de e-mail válido, através do qual o site realizará todas comunicações necessárias.",
        "Após a confirmação do cadastro, o usuário possuirá um login e uma senha pessoal, a qual assegura ao usuário o acesso individual à mesma. Desta forma, compete ao usuário exclusivamente a manutenção de referida senha de maneira confidencial e segura, evitando o acesso indevido às informações pessoais.",
        "Toda e qualquer atividade realizada com o uso da senha será de responsabilidade do usuário, que deverá informar prontamente em caso de uso indevido da respectiva senha.",
        "Não será permitido ceder, vender, alugar ou transferir, de qualquer forma, a conta, que é pessoal e intransferível.",
        "Caberá ao usuário assegurar que o seu equipamento seja compatível com as características técnicas que viabilize a utilização da plataforma e dos serviços ou produtos.",
        "O usuário poderá, a qualquer tempo, requerer o cancelamento de seu cadastro junto ao aplicativo eCidadão. O seu descadastramento será realizado o mais rapidamente possível, desde que não sejam verificados débitos em aberto.",
        "O usuário, ao aceitar os Termos e Política de Privacidade, autoriza expressamente a plataforma a coletar, usar, armazenar, tratar, ceder ou utilizar as informações derivadas do uso dos serviços, do site e quaisquer plataformas, incluindo todas as informações preenchidas pelo usuário no momento em que realizar ou atualizar seu cadastro, além de outras expressamente descritas na Política de Privacidade que deverá ser autorizada pelo usuário."
      ]
    },
    {
      "title": "Do suporte",
      "paragraphs": [
        "Em caso de qualquer dúvida, sugestão ou problema com a utilização da plataforma, o usuário poderá entrar em contato com o suporte, através do email cluster8develop@gmail.com."
      ]
    },
    {
      "title": "Das responsabilidades",
      "paragraphs": [
        "É de responsabilidade do usuário:",
        "a) defeitos ou vícios técnicos originados no próprio sistema do usuário;",
        "b) a correta utilização da plataforma, dos serviços ou produtos oferecidos, prezando pela boa convivência, pelo respeito e cordialidade entre os usuários;",
        "c) pelo cumprimento e respeito ao conjunto de regras disposto nesse Termo de Condições Geral de Uso, na respectiva Política de Privacidade e na legislação nacional e internacional;",
        "d) pela proteção aos dados de acesso à sua conta/perfil (login e senha).",
        "É de responsabilidade da plataforma eCidadão:",
        "a) indicar as características do serviço ou produto;",
        "b) os defeitos e vícios encontrados no serviço ou produto oferecido desde que lhe tenha dado causa;",
        "c) as informações que foram por ele divulgadas, sendo que os comentários ou informações divulgadas por usuários são de inteira responsabilidade dos próprios usuários;",
        "d) os conteúdos ou atividades ilícitas praticadas através da sua plataforma.",
        "A plataforma não se responsabiliza por links externos contidos em seu sistema que possam redirecionar o usuário à ambiente externo a sua rede.",
        "Não poderão ser incluídos links externos ou páginas que sirvam para fins comerciais ou publicitários ou quaisquer informações ilícitas, violentas, polêmicas, pornográficas, xenofóbicas, discriminatórias ou ofensivas."
      ]
    },
    {
      "title": "Dos direitos autorais",
      "paragraphs": [
        "O presente Termo de Uso concede aos usuários uma licença não exclusiva, não transferível e não sublicenciável, para acessar e fazer uso da plataforma e dos serviços e produtos por ela disponibilizados.",
        "A estrutura do site ou aplicativo, as marcas, logotipos, nomes comerciais, layouts, gráficos e design de interface, imagens, ilustrações, fotografias, apresentações, vídeos, conteúdos escritos e de som e áudio, programas de computador, banco de dados, arquivos de transmissão e quaisquer outras informações e direitos de propriedade intelectual da razão social fins acadêmicos, observados os termos da Lei da Propriedade Industrial (Lei nº 9.279/96), Lei de Direitos Autorais (Lei n° 9.610/98) e Lei do Software (Lei n° 9.609/98), estão devidamente reservados.",
        "Este Termo de Uso não cede ou transfere ao usuário qualquer direito, de modo que o acesso não gera qualquer direito de propriedade intelectual ao usuário, exceto pela licença limitada ora concedida.",
        "O uso da plataforma pelo usuário é pessoal, individual e intransferível, sendo vedado qualquer uso não autorizado, comercial ou não-comercial. Tais usos consistirão em violação dos direitos de propriedade intelectual da razão social fins acadêmicos, puníveis nos termos da legislação aplicável."
      ]
    },
    {
      "title": "Das sanções",
      "paragraphs": [
        "Sem prejuízo das demais medidas legais cabíveis, a razão social fins acadêmicos poderá, a qualquer momento, advertir, suspender ou cancelar a conta do usuário:",
        "a) que violar qualquer dispositivo do presente Termo;",
        "b) que descumprir os seus deveres de usuário;",
        "c) que tiver qualquer comportamento fraudulento, doloso ou que ofenda a terceiros."
      ]
    },
    {
      "title": "Da rescisão",
      "paragraphs": [
        "A não observância das obrigações pactuadas neste Termo de Uso ou da legislação aplicável poderá, sem prévio aviso, ensejar a imediata rescisão unilateral por parte da razão social fins acadêmicos e o bloqueio de todos os serviços prestados ao usuário."
      ]
    },
    {
      "title": "Das alterações",
      "paragraphs": [
        "Os itens descritos no presente instrumento poderão sofrer alterações, unilateralmente e a qualquer tempo, por parte de fins acadêmicos, para adequar ou modificar os serviços, bem como para atender novas exigências legais. As alterações serão veiculadas pelo pelo aplicativo eCidadão e o usuário poderá optar por aceitar o novo conteúdo ou por cancelar o uso dos serviços, caso seja assinante de algum serviço."
      ]
    },
    {
      "title": "Da política de privacidade",
      "paragraphs": [
        "Além do presente Termo, o usuário deverá consentir com as disposições contidas na respectiva Política de Privacidade a ser apresentada a todos os interessados dentro da interface da plataforma."
      ]
    },
    {
      "title": "Do foro",
      "paragraphs": [
        "Para a solução de controvérsias decorrentes do presente instrumento será aplicado integralmente o Direito brasileiro.",
        "Os eventuais litígios deverão ser apresentados no foro da comarca em que se encontra a sede da empresa."
      ]
    }
  ],
  "createdAt": "2022-11-01T22:17:24.896Z",
  "createdBy": "6317488b9c8ee54575f014f2"
}

export const UseTermsModal: React.FC<IUseTermsModal> = (props) => {

  const [visibleModal, setVisibleModal] = useState(false);  
  
  return (
    <Container>
      <Modal
               animationType='slide'
               visible={props.modalVisible}
               transparent={true}>
        <Content>
          <ModalContent>
            <TitleView>
            <Title>Termos de Uso</Title>
            </TitleView>

            <TermsView>
            <TextDescription>
            Os serviços do eCidadão são fornecidos pela pessoa jurídica com a Razão Social: fins acadêmicos,
com nome fantasia Cluster 8, titular da propriedade intelectual sobre software, website, aplicativos,
conteúdos e demais ativos relacionados à plataforma eCidadão.
            </TextDescription>

            {TermosDeUso.itens.map((el)=>{
              return (
                <View>
                <Subtitle>
                  {el.title}
                </Subtitle>
                {el.paragraphs.map((par)=>{
                  return (
                    <TextItens>
                      {par}
                    </TextItens>
                  )
                })}
          
                </View>
              )
            })}
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

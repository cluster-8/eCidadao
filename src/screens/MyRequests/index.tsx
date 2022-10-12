import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { RequestCard } from '../../components/RequestCard'
import { TextInput } from '../../components/TextInput'

import {
  Container,
  TitleContainer,
  Title,
  SubTitle,
  Content,
  TabSelectorContainer,
  TabSelectorButton,
  TabSelectorButtonTitle,
  FilterContainer,
  FilterButtonsContainer,
  FilterButton,
  Icon,
  FilterButtonText,
  CardsContainer,
} from './styles'

const filterData = yup.object().shape({
  filter: yup.string(),
})

const MyRequests: React.FC = () => {
  const [opened, setOpened] = useState(true)
  const [closed, setClosed] = useState(false)

  const {
    control,
    // handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(filterData),
  })

  const request = [
    {
      id: '#0001',
      title: 'Poste Caido',
      type: 'Poda',
      createdAt: new Date(),
      status: 'closed',
      description:
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      date: '19/09/2022 · 20h00',
      image:
        'https://images.unsplash.com/photo-1615175501566-bf70987183b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1463&q=80',
      address: {
        formattedAddress: 'Rua Z, Número 99, Bairro X, Cidade Y',
        street: '',
        number: '',
        neighborhood: '',
        zipcode: '',
      },
    },
    {
      id: '#0002',
      title: 'Poste Caido',
      type: 'Poda',
      createdAt: new Date(),
      status: 'open',
      description:
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      date: '19/09/2022 · 20h00',
      image:
        'https://images.unsplash.com/photo-1615175501566-bf70987183b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1463&q=80',
      address: {
        formattedAddress: 'Rua Z, Número 99, Bairro X, Cidade Y',
        street: '',
        number: '',
        neighborhood: '',
        zipcode: '',
      },
    },
    {
      id: '#0003',
      title: 'Poste Caido',
      type: 'Poda',
      createdAt: new Date(),
      status: 'open',
      description:
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      date: '19/09/2022 · 20h00',
      image:
        'https://images.unsplash.com/photo-1615175501566-bf70987183b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1463&q=80',
      address: {
        formattedAddress: 'Rua Z, Número 99, Bairro X, Cidade Y',
        street: '',
        number: '',
        neighborhood: '',
        zipcode: '',
      },
    },
    {
      id: '#0004',
      title: 'Poste Caido',
      type: 'Poda',
      createdAt: new Date(),
      status: 'open',
      description:
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      date: '19/09/2022 · 20h00',
      image:
        'https://images.unsplash.com/photo-1615175501566-bf70987183b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1463&q=80',
      adddress: {
        formattedAddress: 'Rua Z, Número 99, Bairro X, Cidade Y',
        street: '',
        number: '',
        neighborhood: '',
        zipcode: '',
      },
    },
  ]

  const handleChangeTab = (selectedTab: 'opened' | 'closed') => {
    if (selectedTab === 'opened') {
      setOpened(true)
      setClosed(false)
    } else {
      setClosed(true)
      setOpened(false)
    }
  }

  return (
    <Container>
      <TitleContainer>
        <Title>Minhas Solicitações</Title>

        <SubTitle>Visualize suas solicitações em aberto!</SubTitle>
      </TitleContainer>

      <Content>
        <TabSelectorContainer>
          <TabSelectorButton
            active={opened}
            onPress={() => handleChangeTab('opened')}
          >
            <TabSelectorButtonTitle active={opened}>
              EM ABERTO
            </TabSelectorButtonTitle>
          </TabSelectorButton>

          <TabSelectorButton
            active={closed}
            onPress={() => handleChangeTab('closed')}
          >
            <TabSelectorButtonTitle active={closed}>
              FINALIZADAS
            </TabSelectorButtonTitle>
          </TabSelectorButton>
        </TabSelectorContainer>

        <FilterContainer>
          <TextInput
            name="filter"
            icon="search"
            placeholder="Busque por nome ou local"
            secureTextEntry
            control={control}
            errorMessage={errors?.filter?.message}
          />

          <FilterButtonsContainer>
            <FilterButton>
              <Icon name="filter" />
              <FilterButtonText>Data</FilterButtonText>
            </FilterButton>

            <FilterButton>
              <Icon name="filter" />
              <FilterButtonText>Código</FilterButtonText>
            </FilterButton>

            <FilterButton>
              <Icon name="filter" />
              <FilterButtonText>Tipo</FilterButtonText>
            </FilterButton>
          </FilterButtonsContainer>
        </FilterContainer>

        {opened && (
          <CardsContainer
            data={request}
            keyExtractor={(item: any) => item?.id}
            renderItem={({ item }: any) =>
              item.status === 'open' &&
              opened && (
                <RequestCard
                  onPress={(id) => console.log('foi', id)}
                  request={item}
                />
              )
            }
          />
        )}

        {closed && (
          <CardsContainer
            data={request}
            keyExtractor={(item: any) => item?.id}
            renderItem={({ item }: any) =>
              item.status === 'closed' &&
              closed && (
                <RequestCard
                  onPress={(id) => console.log('foi', id)}
                  request={item}
                />
              )
            }
          />
        )}
      </Content>
    </Container>
  )
}

export default MyRequests

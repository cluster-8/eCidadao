import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
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

const MyRequests = () => {
  const {
    control,
    // handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(filterData),
  })

  const request = {
    id: '#0005',
    title: 'Poste Caido',
    type: 'open',
    description:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    date: '19/09/2022 · 20h00',
  }
  return (
    <Container>
      <TitleContainer>
        <Title>Minhas Solicitações</Title>

        <SubTitle>Visualize suas solicitações em aberto!</SubTitle>
      </TitleContainer>

      <Content>
        <TabSelectorContainer>
          <TabSelectorButton>
            <TabSelectorButtonTitle>EM ABERTO</TabSelectorButtonTitle>
          </TabSelectorButton>

          <TabSelectorButton>
            <TabSelectorButtonTitle>FINALIZADAS</TabSelectorButtonTitle>
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

        <CardsContainer>
          <RequestCard
            onPress={(id) => console.log('foi', id)}
            request={request}
          />
        </CardsContainer>
      </Content>
    </Container>
  )
}

export default MyRequests

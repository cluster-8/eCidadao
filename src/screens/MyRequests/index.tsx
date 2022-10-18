import React, { useState, useEffect, useMemo } from 'react'
import { RequestCard } from '../../components/RequestCard'
import { TextInput } from '../../components/TextInput'
import { useRequests } from '../../hooks/useRequests'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import {
  FilterButtonsContainer,
  TabSelectorButtonTitle,
  TabSelectorContainer,
  TabSelectorButton,
  FilterButtonText,
  FilterContainer,
  TitleContainer,
  CardsContainer,
  FilterButton,
  Container,
  SubTitle,
  Content,
  Title,
  Icon,
} from './styles'

const schema = yup.object().shape({
  searchTerm: yup.string(),
})

const MyRequests: React.FC = () => {
  const [opened, setOpened] = useState(true)
  const [closed, setClosed] = useState(false)
  const { getData, reqData } = useRequests()

  const [sortByDate, setSortByDate] = useState(1)
  const [sortByCode, setSortByCode] = useState(1)
  const [sortByType, setSortByType] = useState(1)

  const [activeSort, setActiveSort] = useState('')

  const [searchTerm, setSearchTerm] = useState<any>('')

  const {
    control,
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleChangeTab = (selectedTab: 'opened' | 'closed') => {
    if (selectedTab === 'opened') {
      setOpened(true)
      setClosed(false)
    } else {
      setClosed(true)
      setOpened(false)
    }
  }

  function handleSort(sortBy: any) {
    setActiveSort(sortBy)
    if (sortBy === 'byDate') setSortByDate(sortByDate * -1)
    if (sortBy === 'byCode') setSortByCode(sortByCode * -1)
    if (sortBy === 'byType') setSortByType(sortByType * -1)
  }

  const sortedData = useMemo(() => {
    if (!reqData) return
    if (activeSort === 'byDate') {
      if (sortByDate === 1) {
        const sorted = reqData.sort(
          (a: any, b: any) => a.createdAt > b.createdAt,
        )
        return sorted
      } else {
        const sorted = reqData.sort(
          (a: any, b: any) => a.createdAt < b.createdAt,
        )
        return sorted
      }
    }
    if (activeSort === 'byCode') {
      if (sortByCode === 1) {
        console.log('asc')
        const sorted = reqData.sort(
          (a: any, b: any) => a.identifier - b.identifier,
        )
        return sorted
      } else {
        const sorted = reqData.sort(
          (a: any, b: any) => b.identifier - a.identifier,
        )
        return sorted
      }
    }
    if (activeSort === 'byType') {
      if (sortByType === 1) {
        console.log('asc')
        const sorted = reqData.sort((a: any, b: any) => a.type > b.type);
        return sorted
      } else {
        const sorted = reqData.sort((a: any, b: any) => a.type < b.type);
        return sorted
      }
    } else {
      return reqData
    }
  }, [handleSort])

  useEffect(() => {
    register('searchTerm')
    getData()
  }, [])

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
            onChangeText={setSearchTerm}
            name="searchTerm"
            icon="search"
            placeholder="Busque por nome ou local"
            control={control}
            errorMessage={errors?.filter?.message}
          />

          <FilterButtonsContainer>
            <FilterButton
              onPress={() => handleSort('byDate')}
              active={activeSort === 'byDate'}
            >
              <Icon name="filter" />
              <FilterButtonText>Data</FilterButtonText>
            </FilterButton>

            <FilterButton
              onPress={() => handleSort('byCode')}
              active={activeSort === 'byCode'}
            >
              <Icon name="filter" />
              <FilterButtonText>Código</FilterButtonText>
            </FilterButton>

            <FilterButton
              onPress={() => handleSort('byType')}
              active={activeSort === 'byType'}
            >
              <Icon name="filter" />
              <FilterButtonText>Tipo</FilterButtonText>
            </FilterButton>
          </FilterButtonsContainer>
        </FilterContainer>

        {opened && (
          <CardsContainer
            data={sortedData}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }: any) =>
              item?.status === 'opened' &&
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
            data={sortedData}
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

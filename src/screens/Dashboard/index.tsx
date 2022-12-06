import React, { useState, useEffect } from 'react'
import { Dimensions } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import {
  Container,
  HeaderContainer,
  HeaderTitle,
  HeaderText,
  BodyContainer,
  CardContainer,
  FilterContainer,
  GraphContainer,
  ScrollContainer,
  GraphTitle,
  GraphDescription,
  ImageContainer,
  NoDataImage,
  ImageMessage,
} from './styles'

import ModalFilter from '../../components/ModalFilter'

import { DashboardCard } from '../../components/DashboardCard'
import { SelectDataInput } from '../../components/SelectDataInput'

import { useRequests } from '../../hooks/useRequests'
import * as useDate from '../../hooks/useDate'

import {
  // LineChart,
  // BarChart,
  PieChart,
  // ProgressChart,
  // ContributionGraph,
} from 'react-native-chart-kit'

const noDataImage = require('../../../assets/under-construction-pana.png')

const Dashboard: React.FC = () => {
  const schema = yup.object().shape({
    selectedType: yup.string(),
  })

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const [openModalFilter, setOpenModalFilter] = useState<boolean>(false)
  const [modalType, setModalType] = useState<string>('')

  const [totalOpened, setTotalOpened] = useState<number>(0)
  const [totalClosed, setTotalClosed] = useState<number>(0)
  const [graphData, setGraphData] = useState<any>()

  const { countRequestsByStatus, countRequestsByType } = useRequests()

  const {
    openModalDate,
    setOpenModalDate,
    selectedDate,
    // setSelectedDate,,
  } = useDate.useDate()

  async function getData() {
    const opened = await countRequestsByStatus('opened')
    const closed = await countRequestsByStatus('closed')
    const countByType = await countRequestsByType()

    setTotalOpened(Number(opened))
    setTotalClosed(Number(closed))
    setGraphData(countByType)
  }

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  }

  useEffect(() => {
    getData()
  }, [selectedDate])

  return (
    <>
      <Container>
        <HeaderContainer>
          <HeaderTitle>Dashboard</HeaderTitle>
          <HeaderText>
            Visualize indicativos sobre as solicitações realizadas
          </HeaderText>
        </HeaderContainer>
        <BodyContainer>
          <GraphTitle>{'Filtrar por mês e ano'}</GraphTitle>
          <GraphDescription>
            {'Selecione uma opção para visualizar'}
          </GraphDescription>
          <FilterContainer>
            <SelectDataInput
              onPress={() => setOpenModalFilter(!openModalFilter)}
              errorMessage={errors?.type?.message}
              control={control}
              icon="chevron-down"
              placeholder="Data"
              name="date"
            />
          </FilterContainer>
          <GraphTitle>{'Total de solicitações por status'}</GraphTitle>
          <GraphDescription>
            {'Total de solicitações registradas por status'}
          </GraphDescription>
          <CardContainer>
            <DashboardCard
              title={'SOLICITAÇÕES ABERTAS'}
              data={totalOpened || 0}
              icon={'traffic-cone'}
              type={'opened'}
            />
            <DashboardCard
              title={'SOLICITAÇÕES FECHADAS'}
              data={totalClosed || 0}
              icon={'check'}
              type={'closed'}
            />
          </CardContainer>
          <GraphTitle>{'Solicitações mais frequentes'}</GraphTitle>
          <GraphDescription>
            {
              'Veja a porcentagem de cada tipo de ocorrência dentre as solicitações mais registradas'
            }
          </GraphDescription>
          {graphData?.length === 0 || !graphData ? (
            <ImageContainer>
              <ImageMessage>
                {'Ainda não há dados para serem visualizados'}
              </ImageMessage>
              <NoDataImage source={noDataImage} />
            </ImageContainer>
          ) : (
            <ScrollContainer horizontal>
              <GraphContainer>
                <PieChart
                  data={graphData || []}
                  width={350}
                  height={220}
                  chartConfig={chartConfig}
                  accessor="total"
                  backgroundColor="transparent"
                  paddingLeft="0"
                />
              </GraphContainer>
            </ScrollContainer>
          )}
        </BodyContainer>
      </Container>
      <ModalFilter
        modalVisible={openModalDate}
        handleClose={(val: boolean) => setOpenModalDate(!val)}
        type={modalType}
      />
    </>
  )
}

export default Dashboard

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
} from './styles'

import ModalFilter from '../../components/ModalFilter'

import { DashboardCard } from '../../components/DashboardCard'
import { SelectDataInput } from '../../components/SelectDataInput'

import { useRequests } from '../../hooks/useRequests'
import * as useDate from '../../hooks/useDate'

import {
  // LineChart,
  BarChart,
  PieChart,
  // ProgressChart,
  // ContributionGraph,
} from 'react-native-chart-kit'

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
    console.log(countByType)

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
              // defaultValue={selectedDate?.value}
              control={control}
              icon="chevron-down"
              placeholder="Data"
              // label="Selecione uma opção para visualizar"
              name="date"
            />
            {/* <DateSelectButton /> */}
          </FilterContainer>
          <GraphTitle>{'Total de solicita≤ções por status'}</GraphTitle>
          <GraphDescription>
            {'Total de solicitações registradas por status'}
          </GraphDescription>
          <CardContainer>
            <DashboardCard
              title={'SOLICITAÇÕES ABERTAS'}
              data={totalOpened}
              icon={'traffic-cone'}
              type={'opened'}
            />
            <DashboardCard
              title={'SOLICITAÇÕES FECHADAS'}
              data={totalClosed}
              icon={'check'}
              type={'closed'}
            />
          </CardContainer>
          <GraphTitle>{'Total de solicitações por tipo'}</GraphTitle>
          <GraphDescription>
            {'Arraste para a esquerda para visualizar mais'}
          </GraphDescription>
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
              {/* <BarChart
                yAxisLabel={""}
                yAxisSuffix={""}
                data={{
                  labels: graphData ? graphData.x : [],
                  datasets: [
                    {
                      data: graphData ? graphData.y : [],
                    },
                  ],
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                chartConfig={{
                  backgroundColor: "#004997",
                  backgroundGradientFrom: "#0257b1",
                  backgroundGradientTo: "#0061c9",
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              /> */}
            </GraphContainer>
          </ScrollContainer>
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

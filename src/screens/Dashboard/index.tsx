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
} from './styles'

import ModalFilter from '../../components/ModalFilter'

import { DashboardCard } from '../../components/DashboardCard'
import { SelectDataInput } from '../../components/SelectDataInput'

import { useRequests } from '../../hooks/useRequests'
import * as useDate from '../../hooks/useDate'

import {
  // LineChart,
  BarChart,
  // PieChart,
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
    console.log(countByType)
  }

  useEffect(() => {
    console.log('selectedDate', selectedDate)
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
          <FilterContainer>
            <SelectDataInput
              onPress={() => setOpenModalFilter(!openModalFilter)}
              errorMessage={errors?.type?.message}
              // defaultValue={selectedDate?.value}
              control={control}
              icon="chevron-down"
              placeholder="Data"
              label="Filtrar por mês e ano"
              name="date"
            />
            {/* <DateSelectButton /> */}
          </FilterContainer>
          <CardContainer>
            <DashboardCard
              title={"SOLICITAÇÕES ABERTAS"}
              data={totalOpened}
              icon={"traffic-cone"}
              type={"opened"}
            />
            <DashboardCard
              title={"SOLICITAÇÕES FECHADAS"}
              data={totalClosed}
              icon={"check"}
              type={"closed"}
            />
          </CardContainer>
          <GraphContainer>
            <BarChart
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                ],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={Dimensions.get("window").width - 50} // from react-native
              height={220}
              chartConfig={{
                backgroundColor: "#004997",
                backgroundGradientFrom: "#0257b1",
                backgroundGradientTo: "#0061c9",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </GraphContainer>
        </BodyContainer>
      </Container>
      <ModalFilter
        modalVisible={openModalDate}
        handleClose={(val: boolean) => setOpenModalDate(!val)}
        type={modalType}
      />
    </>
  );
}

export default Dashboard

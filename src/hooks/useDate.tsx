import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
} from 'react'

interface DateContextData {
  setDateInputOnFocus: any
  dateInputOnFocus: any
  setOpenModalDate: any
  setSelectedDate: any
  openModalDate: any
  selectedDate: any
  getDateValue: any
  dates: any[]
}

type DateContextProps = {
  children?: ReactNode
}

const DateContext = createContext({} as DateContextData)

const DateProvider: React.FC<DateContextProps> = ({ children }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [dateInputOnFocus, setDateInputOnFocus] = useState<boolean>(false)
  const [openModalDate, setOpenModalDate] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<any>()

  function getMonthName(monthNumber: number) {
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ]
    return months[monthNumber]
  }

  const dates = useMemo(() => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    let diff = 11 - currentMonth

    const dateArr = []

    for (let year = currentYear; year >= 2022; year--) {
      for (let month = 11; month >= 0; month--) {
        if (diff <= 0) {
          const selectValue = {
            value: `${getMonthName(month)} ${year}`,
            key: new Date(year, month, 1),
          }
          dateArr.push(selectValue)
        } else {
          diff -= 1
        }
      }
    }
    setSelectedDate(dateArr[0])
    return dateArr
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getDateValue(key: any) {
    if (!key) return ''
    const type: any = dates.find((el) => el.key === key)
    return type.value
  }

  const providerValue = useMemo(
    () => ({
      setDateInputOnFocus,
      setOpenModalDate,
      dateInputOnFocus,
      setSelectedDate,
      openModalDate,
      selectedDate,
      getDateValue,
      dates,
    }),
    [
      setDateInputOnFocus,
      setOpenModalDate,
      dateInputOnFocus,
      setSelectedDate,
      openModalDate,
      selectedDate,
      getDateValue,
      dates,
    ],
  )

  return (
    <DateContext.Provider value={providerValue}>
      {children}
    </DateContext.Provider>
  )
}

const useDate = () => {
  const context = useContext(DateContext)

  if (!context) {
    throw new Error('useDate must be used within an RequestsProvider')
  }

  return context
}

export { useDate, DateProvider }

/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { Modal } from 'react-native'
import { useDate } from '../../hooks/useDate'

import {
  Container,
  Content,
  ModalContent,
  TypesList,
  TypeItem,
  TouchableOpacity,
} from './styles'

import { Feather } from '@expo/vector-icons'
import { RFHeight } from '../../utils/getResponsiveSizes'

interface IModalDetails {
  // data: any;
  modalVisible: boolean
  handleClose: any
  type: any
}

const ModalFilter: React.FC<IModalDetails> = (props) => {
  const { setOpenModalDate, selectedDate, setSelectedDate, dates } = useDate()

  function handleSelect(date: any) {
    console.log(date)
    setSelectedDate(date)
    setOpenModalDate(false)
  }

  return (
    <Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => props.handleClose()}
      >
        <Content onPress={props.handleClose}>
          <ModalContent>
            <TypesList>
              {dates?.map((el, i) => {
                return (
                  <TouchableOpacity key={i} onPress={() => handleSelect(el)}>
                    <TypeItem>{el.value}</TypeItem>
                    {selectedDate?.key === el?.key ? (
                      <Feather
                        name="check"
                        size={RFHeight(24)}
                        color={'#554589'}
                      />
                    ) : null}
                  </TouchableOpacity>
                )
              })}
            </TypesList>
          </ModalContent>
        </Content>
      </Modal>
    </Container>
  )
}

export default ModalFilter

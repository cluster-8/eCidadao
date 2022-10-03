/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { Modal } from 'react-native'
import { useTypes } from '../../hooks/useTypes'

import {
  Container,
  Content,
  ModalContent,
  TypesList,
  TypeItem,
  TouchableOpacity,
} from './styles'

import { Feather } from '@expo/vector-icons'

interface IModalDetails {
  // data: any;
  modalVisible: boolean
  handleClose: any
}

const ModalTypes: React.FC<IModalDetails> = (props) => {
  const { setOpenModalType, selectedType, setSelectedType, types } = useTypes()

  function handleSelect(type: any) {
    setSelectedType(type)
    setOpenModalType(false)
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
              {types?.map((el, i) => {
                return (
                  <TouchableOpacity key={i} onPress={() => handleSelect(el)}>
                    <TypeItem>{el.value}</TypeItem>
                    {selectedType?.key === el?.key ? (
                      <Feather name="check" size={24} color={'#554589'} />
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

export default ModalTypes

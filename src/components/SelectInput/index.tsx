import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
  useController,
} from 'react-hook-form'
import { useTypes } from '../../hooks/useTypes'
import { TextInputProps as RNTextInputProps } from 'react-native'
import { useTheme } from 'styled-components'
// import { translate } from '../../data/I18n';
import { RFFontSize } from '../../utils/getResponsiveSizes'
import {
  Container,
  ErrorMessage,
  FeatherIcon,
  InnerContainer,
  InputLabel,
  RNTextInput,
} from './styles'

interface SelectInputProps extends RNTextInputProps {
  icon?: string
  containerStyle?: Record<string, unknown>
  name: string
  label?: string
  control?: Control
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  disabled?: boolean
  onPress?: (val: boolean) => void
}

export const SelectInput: React.FC<SelectInputProps> = ({
  icon,
  containerStyle = {},
  name,
  label,
  control,
  errorMessage,
  defaultValue,
  disabled = false,
  onPress = (val: boolean) => val,
  ...rest
}) => {
  const { selectedType, setTypeInputOnFocus, openModalType, setOpenModalType } =
    useTypes()

  const theme = useTheme()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputElementRef = useRef<any>('select-input')
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const { field } = useController({
    name,
    control,
    defaultValue,
  })

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
    // eslint-disable-next-line no-unused-expressions
    inputElementRef.current.name === 'select-input'
      ? setOpenModalType(true)
      : null
  }, [])

  const handleInputBlur = useCallback((value: string) => {
    setIsFocused(false)
    setIsFilled(!!value)
    setTypeInputOnFocus(false)
  }, [])

  useEffect(() => {
    if (defaultValue) {
      handleInputBlur(defaultValue)
    }
  }, [defaultValue, handleInputBlur])

  function handlePress() {
    setOpenModalType(!openModalType)
  }

  useEffect(() => {
    inputElementRef.current.name = 'select-input'
  }, [])

  return (
    <Container onPress={() => handlePress()}>
      {label && <InputLabel>{label}</InputLabel>}
      <InnerContainer
        style={containerStyle}
        isFocused={isFocused}
        isErrored={!!errorMessage}
        editable={!disabled}
        onPress={() => handlePress()}
      >
        {!!icon && (
          <FeatherIcon
            name={icon}
            size={RFFontSize(20)}
            isFocusedOrFilled={isFocused || isFilled}
            isErrored={!!errorMessage}
          />
        )}

        <RNTextInput
          {...rest}
          defaultValue={selectedType?.value}
          editable={!disabled}
          placeholder={rest.placeholder}
          value={field.value}
          ref={inputElementRef}
          keyboardAppearance="dark"
          placeholderTextColor={theme.colors.details}
          onFocus={handleInputFocus}
          onBlur={() => handleInputBlur(field.value)}
          onChangeText={field.onChange}
          showSoftInputOnFocus={false}
        ></RNTextInput>
      </InnerContainer>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  )
}

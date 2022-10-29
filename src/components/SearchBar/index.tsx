import React, { useCallback, useEffect, useRef, useState } from 'react'
import { TextInputProps as RNTextInputProps } from 'react-native'
import { useTheme } from 'styled-components'

import { RFFontSize } from '../../utils/getResponsiveSizes'
import { Container, FeatherIcon, InnerContainer, RNTextInput } from './styles'

interface SearchBarProps extends RNTextInputProps {
  icon?: string
  containerStyle?: Record<string, unknown>
  name: string
  disabled?: boolean
}

const SearchBar: React.FC<SearchBarProps> = ({
  icon,
  containerStyle = {},
  name,
  defaultValue,
  disabled = false,
  ...rest
}) => {
  const theme = useTheme()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputElementRef = useRef<any>(null)

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback((value: string) => {
    setIsFocused(false)
    setIsFilled(!!value)
  }, [])

  useEffect(() => {
    if (defaultValue) {
      handleInputBlur(defaultValue)
    }
  }, [defaultValue, handleInputBlur])

  return (
    <Container>
      <InnerContainer
        style={containerStyle}
        isFocused={isFocused}
        editable={!disabled}
      >
        {!!icon && (
          <FeatherIcon
            name={icon}
            size={RFFontSize(20)}
            isFocusedOrFilled={isFocused || isFilled}
          />
        )}

        <RNTextInput
          {...rest}
          editable={!disabled}
          placeholder={rest.placeholder}
          ref={inputElementRef}
          keyboardAppearance="dark"
          placeholderTextColor={theme.colors.details}
          onFocus={handleInputFocus}
          onBlur={(e: any) => handleInputBlur(e.target.value)}
        />
      </InnerContainer>
    </Container>
  )
}

export default SearchBar

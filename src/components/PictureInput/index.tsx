import React from 'react'
// import { translate } from '../../data/I18n'
import {
  PictureStyled,
  Placeholder,
  // PlaceholderText,
  PlaceholderIcon,
  UpdateImageButton,
  UpdateImageText,
} from './styles'

interface PictureInputProps {
  uri?: string | null
  placeholder: string
  updatePictureLabel: string
  onPress: () => void
  model?: 'RETANGLE' | 'SQUARE' | 'CIRCLE'
}
export const PictureInput: React.FC<PictureInputProps> = ({
  uri,
  placeholder,
  updatePictureLabel,
  model = 'CIRCLE',
  onPress,
}) => {
  if (uri) {
    return (
      <>
        <UpdateImageButton onPress={onPress}>
          {/* <UpdateImageText>{translate(updatePictureLabel)}</UpdateImageText> */}
          <PictureStyled model={model} source={{ uri }} />
          {/* <UpdateImageText>Foto adicionada</UpdateImageText> */}
        </UpdateImageButton>
      </>
    )
  }
  return (
    <Placeholder model={model} onPress={onPress}>
      <PlaceholderIcon name="camera" size={36} />
      {/* <PlaceholderText>{translate(placeholder)}</PlaceholderText> */}
      <UpdateImageText>Adicionar foto</UpdateImageText>
    </Placeholder>
  )
}

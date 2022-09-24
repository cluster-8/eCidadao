/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import home from './home'

interface LanguageProps {
  [key: string]: {
    [key: string]: {
      [key: string]: any
    }
  }
}

export const i18nConfig = () => {
  const languages: LanguageProps = {
    'pt-BR': {
      ...home.pt,
    },
    'en-US': {
      ...home.en,
    },
  }
  i18n.translations = {
    pt: languages['pt-BR'],
    en: languages['en-US'],
  }

  i18n.defaultLocale = 'pt-BR'
  i18n.locale = languages[Localization.locale] ? Localization.locale : 'pt-BR'
  i18n.fallbacks = true
}

export const translate = (key: string): string => {
  return i18n.translate(key)
}

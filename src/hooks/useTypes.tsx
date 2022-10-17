import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
} from 'react'

interface TypesContextData {
  setTypeInputOnFocus: any
  typeInputOnFocus: any
  setOpenModalType: any
  setSelectedType: any
  openModalType: any
  selectedType: any
  getTypeValue: any
  types: any[]
}

type TypesContextProps = {
  children?: ReactNode
}

const TypesContext = createContext({} as TypesContextData)

const TypesProvider: React.FC<TypesContextProps> = ({ children }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const types = [
    { value: 'Agua Potável/Abastecimento', key: 'aguaPotavel_abastecimento' },
    { value: 'Alambrado/Manutenção', key: 'alambrado_manutencao' },
    { value: 'Área de Preservação Permanente', key: 'APP' },
    { value: 'Árvore', key: 'arvore' },
    { value: 'Capina/Roçada', key: 'capina_rocada' },
    { value: 'Ciclovia/manutenção', key: 'ciclovia_manutencao' },
    { value: 'Corte de raiz', key: 'corteDeRaiz' },
    { value: 'Drenagem/diversos', key: 'drenagemDiversos' },
    { value: 'Entulho em área pública', key: 'entulhoEmAreaPublica' },
    {
      value: 'Fundo do Vale/Capina margens córregos',
      key: 'fundoDoVale_capinaMargensCorregos',
    },
    { value: 'Guias/manutenção e pintura', key: 'guias_manutencaoEPintura' },
    { value: 'Limpeza após poda', key: 'limpezaAposPoda' },
    {
      value: 'Limpeza/coleta no gramado/Raspagem',
      key: 'limpeza_coletaNoGramado_raspagem',
    },
    { value: 'Lixeiras/áreas rurais', key: 'lixeira_areasRurais' },
    { value: 'Logradouros públicos', key: 'logradourosPublicos' },
    { value: 'Mureta/manutenção/remoção', key: 'mureta_manutencao_remocao' },
    { value: 'Outros', key: 'outros' },
    {
      value: 'Passarelas de madeira/Manutenção',
      key: 'passarelasDeMadeira_manutencao',
    },
    { value: 'Passeio/recomposição', key: 'passeio_recomposicao' },
    {
      value: 'Pista de caminhada/manutenção',
      key: 'pistaDeCaminhada_manutencao',
    },
    { value: 'Placa de proibição', key: 'placaDeProibicao' },
    { value: 'Poda', key: 'poda' },
    { value: 'Queda', key: 'queda' },
    { value: 'Queda de galhos', key: 'quedaDeGalhos' },
    { value: 'Requadro de calçada', key: 'requadroDeCalcada' },
  ]

  const [selectedType, setSelectedType] = useState<any>()
  const [openModalType, setOpenModalType] = useState(false)
  const [typeInputOnFocus, setTypeInputOnFocus] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getTypeValue(key: any) {
    const type: any = types.find((el) => el.key === key)
    return type.value
  }

  const providerValue = useMemo(
    () => ({
      types,
      selectedType,
      setSelectedType,
      openModalType,
      setOpenModalType,
      typeInputOnFocus,
      setTypeInputOnFocus,
      getTypeValue,
    }),
    [
      types,
      selectedType,
      setSelectedType,
      openModalType,
      setOpenModalType,
      typeInputOnFocus,
      setTypeInputOnFocus,
      getTypeValue,
    ],
  )

  return (
    <TypesContext.Provider value={providerValue}>
      {children}
    </TypesContext.Provider>
  )
}

const useTypes = () => {
  const context = useContext(TypesContext)

  if (!context) {
    throw new Error('useTypes must be used within an RequestsProvider')
  }

  return context
}

export { useTypes, TypesProvider }

import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react'

interface RequestType {
  value: string
  label: string
}

interface Adress {
  lat: number
  long: number
  number: number
  city: string
  state: string
  street: string
  zipcode: string
  neighborhood: string
  formattedAdress: string
}

export interface Request {
  id: string
  identifier?: number
  image?: string
  adress?: Adress
  type?: RequestType
  status?: string
  description?: string
  createdAt?: string
}

interface CameraContextData {
  //   getRequests: () => Promise<any>;
  openCamera: Boolean
  setOpenCamera: any
}

type CameraContextProps = {
  children?: ReactNode
}

const CameraContext = createContext({} as CameraContextData)

const CameraProvider: React.FC<CameraContextProps> = ({ children }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  //   const getRequests = async (queryParams: String = "") => {
  //     const queryStr =
  //       "identifier image adress type status createdAt description";
  //     const { data } = await api.get(`/requests?select=${queryStr}`);
  //     return data;
  //   };

  const [openCamera, setOpenCamera] = useState<Boolean>(false)

  const providerValue = useMemo(
    () => ({
      openCamera,
      setOpenCamera,
    }),
    [openCamera],
  )

  return (
    <CameraContext.Provider value={providerValue}>
      {children}
    </CameraContext.Provider>
  )
}

const useCamera = () => {
  const context = useContext(CameraContext)

  if (!context) {
    throw new Error('useCamear must be used within an RequestsProvider')
  }

  return context
}

export { useCamera, CameraProvider }

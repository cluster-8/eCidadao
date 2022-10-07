import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react'

import { Dimensions } from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import { DeviceMotion } from 'expo-sensors'
import { firebase } from '../../config'

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
  hasCameraPermission: any
  setHasCameraPermission: any
  getCameraPermissions: any
  uploadPicture: any
  camType: any
  determineAndSetOrientation: any
  orientation: any
  setOrientation: any
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
  const camType = CameraType.back
  const [hasCameraPermission, setHasCameraPermission] = useState<any>()
  const [openCamera, setOpenCamera] = useState<Boolean>(false)
  const [orientation, setOrientation] = useState<any>('LANDSCAPE')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getCameraPermissions() {
    const cameraPermission = await Camera.requestCameraPermissionsAsync()
    setHasCameraPermission(cameraPermission.status === 'granted')
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function uploadPicture(photo: any) {
    if (photo) {
      const response = await fetch(photo)
      const blob = await response.blob()
      const filename = photo.substring(photo.lastIndexOf('/') + 1)
      const ref = firebase.storage().ref().child(filename).put(blob)

      try {
        const res = await ref
        return res
      } catch (error) {
        console.log(error)
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function determineAndSetOrientation() {
    const available = await DeviceMotion.isAvailableAsync()
    // eslint-disable-next-line no-useless-return
    if (!available) return
    DeviceMotion.addListener(({ orientation }) => {
      if ([0, 180].includes(orientation)) setOrientation('PORTRAIT')
      else setOrientation('LANDSCAPE')
    })
  }

  useEffect(() => {
    // determineAndSetOrientation();
  }, [])

  useEffect(() => {
    if (openCamera) determineAndSetOrientation()
    else DeviceMotion.removeAllListeners()
  }, [openCamera])

  const providerValue = useMemo(
    () => ({
      openCamera,
      setOpenCamera,
      hasCameraPermission,
      setHasCameraPermission,
      getCameraPermissions,
      uploadPicture,
      camType,
      determineAndSetOrientation,
      orientation,
      setOrientation,
    }),
    [
      openCamera,
      setOpenCamera,
      hasCameraPermission,
      setHasCameraPermission,
      getCameraPermissions,
      uploadPicture,
      camType,
      determineAndSetOrientation,
      orientation,
      setOrientation,
    ],
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

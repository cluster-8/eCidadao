import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react'

// import { Dimensions } from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import { DeviceMotion } from 'expo-sensors'

interface RequestType {
  value: string
  label: string
}

interface Address {
  lat: number
  long: number
  number: number
  city: string
  state: string
  street: string
  zipcode: string
  neighborhood: string
  formattedAddress: string
}

export interface Request {
  id: string
  identifier?: number
  image?: string
  address?: Address
  type?: RequestType
  status?: string
  description?: string
  createdAt?: string
}

interface CameraContextData {
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
  const [orientation, setOrientation] = useState<any>('LANDSCAPE')
  const [hasCameraPermission, setHasCameraPermission] = useState<any>()
  const [deviceMotionPermission, setDeviceMotionPermission] = useState<any>()
  const [openCamera, setOpenCamera] = useState<Boolean>(false)
  const [available, isAvailable] = useState<any>()
  const camType = CameraType.back

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getCameraPermissions() {
    const cameraPermission = await Camera.requestCameraPermissionsAsync()
    setHasCameraPermission(cameraPermission.status === 'granted')
  }

  async function getDeviceMotionPermission() {
    const deviceMotionPermission = await DeviceMotion.requestPermissionsAsync()
    // console.log('getDevice...', deviceMotionPermission)
    setDeviceMotionPermission(deviceMotionPermission.status === 'granted')
    return deviceMotionPermission.granted
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function uploadPicture(photo: any) {
    console.log('upload picture...')
    // if (photo) {
    //   const response = await fetch(photo)
    //   const blob = await response.blob()
    //   const filename = photo.substring(photo.lastIndexOf('/') + 1)
    //   const ref = firebase.storage().ref().child(filename).put(blob)

    //   try {
    //     const res = await ref
    //     return res
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function determineAndSetOrientation() {
    const available = await DeviceMotion.isAvailableAsync()
    isAvailable(available)
    // eslint-disable-next-line no-useless-return
    if (!available) setOrientation('LANDSCAPE')
    else {
      //  DeviceMotion.addListener(({ orientation }) => {
      //    if ([0, 180].includes(orientation)) setOrientation("PORTRAIT");
      //    else setOrientation("LANDSCAPE");
      //  });
    }
  }

  useEffect(() => {
    getDeviceMotionPermission()
    determineAndSetOrientation()
  }, [])

  //   useEffect(() => {
  //     if (openCamera) {
  //       console.log(' device Motion ... ', deviceMotionPermission)
  //       DeviceMotion.addListener(({ orientation }) => {
  //         console.log(orientation)
  //         if ([0, 180].includes(orientation)) setOrientation('PORTRAIT')
  //         else setOrientation('LANDSCAPE')
  //       })
  //     }
  //   }, [openCamera])

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

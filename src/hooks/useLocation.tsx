import * as Location from 'expo-location';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

// import getLocation from "../utils/getLocation";

interface LocationContextData {
  coords: any;
}

type LocationContextProps = {
  children: ReactNode;
};

const LocationContext = createContext({} as LocationContextData);

const LocationProvider: React.FC<LocationContextProps> = ({ children }) => {
  const [coords, setCoords] = useState({
    latitude: -23.211820056667055,
    longitude: -45.891863188855105,
  });

  useEffect(() => {
    (async function getLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        // setErrorMsg("Permission to access location was denied");
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      if (location)
        setCoords({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      return location;
    })();
  }, []);

  useEffect(() => {
    console.log(coords);
  }, [coords]);

  const providerValue = useMemo(
    () => ({
      coords,
    }),
    [coords]
  );
  return <LocationContext.Provider value={providerValue}>{children}</LocationContext.Provider>;
};

const useLocation = () => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error('useLocation must be used within an LocationProvider');
  }

  return context;
};

export { useLocation, LocationProvider };

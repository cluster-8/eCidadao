import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import * as Location from "expo-location";

// import getLocation from "../utils/getLocation";

interface LocationContextData {
  coords: any;
};

type LocationContextProps = {
  children: ReactNode;
};

const LocationContext = createContext({} as LocationContextData);

const LocationProvider: React.FC<LocationContextProps> = ({ children }) => {
  const [coords, setCoords] = useState({});

  //   const getPermission = async () => {
  //     try {
  //       const { status } = await Location.requestForegroundPermissionsAsync();
  //       return status === "granted";
  //     } catch (error) {
  //       return false;
  //     }
  //   };

  //   const getCoordinates = useCallback(async () => {
  //     if (coords?.latitude) {
  //       return coords;
  //     }
  //     const permited = await getPermission();

  //     if (permited) {
  //       const geolocation = await Location.getCurrentPositionAsync({
  //         accuracy: Location.Accuracy.Highest,
  //       });
  //       setCoords(geolocation.coords);
  //       return {
  //         latitude: geolocation.coords.latitude,
  //         longitude: geolocation.coords.longitude,
  //       };
  //     }
  //     // return { latitude: 47, longitude: 20 };
  //   }, [coords]);

  //   const getZipcode = useCallback(async (coordinates) => {
  //     if (coordinates?.latitude) {
  //       const local = await Location.reverseGeocodeAsync(coordinates);
  //       if (local.length > 0) {
  //         return local[0].postalCode || "";
  //       }
  //     }
  //     return "";
  //   }, []);

  //   const getGeoCode = useCallback(async (cep) => {
  //     const coordinates = await Location.geocodeAsync(cep);
  //     if (coordinates?.length) {
  //       return {
  //         latitude: coordinates[0].latitude,
  //         longitude: coordinates[0].longitude,
  //       };
  //     }
  //     return { latitude: -23, longitude: -45 };
  //   }, []);

  //   const getCity = useCallback(async (coordinates) => {
  //     if (coordinates?.latitude) {
  //       const local = await Location.reverseGeocodeAsync(coordinates);
  //       if (local.length > 0) {
  //         return `${local[0].subregion} - ${local[0].region}`;
  //       }
  //     }
  //     return "";
  //   }, []);

  useEffect(() => {
    (async function getLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        // setErrorMsg("Permission to access location was denied");
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      if (location)
        setCoords({
          latitude: location.coords.altitude,
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
      //   getCoordinates,
      //   getZipcode,
      //   getGeoCode,
      //   getCity,
      coords,
    }),
    [
      coords,
      // getCoordinates,
      // getZipcode,
      // getGeoCode,
      // getCity
    ]
  );
  return (
    <LocationContext.Provider value={providerValue}>
      {children}
    </LocationContext.Provider>
  );
};

const useLocation = () => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error("useLocation must be used within an LocationProvider");
  }

  return context;
};

export { useLocation, LocationProvider };
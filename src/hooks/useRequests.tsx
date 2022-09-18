import React, { createContext, ReactNode, useContext, useMemo } from "react";

import { api } from "../data/services/api";

interface RequestType {
  value: string;
  label: string;
}

interface Adress {
  lat: number;
  long: number;
  number: number;
  city: string;
  state: string;
  street: string;
  zipcode: string;
  neighborhood: string;
  formattedAdress: string;
}

export interface Request {
  id: string;
  identifier?: number;
  image?: string;
  adress?: Adress;
  type?: RequestType;
  status?: string;
  description?: string;
  createdAt?: string;
}

interface RequestsContextData {
  getRequests: () => Promise<any>;
}

type RequestsContextProps = {
  children?: ReactNode;
};

const RequestsContext = createContext({} as RequestsContextData);

const RequestsProvider: React.FC<RequestsContextProps> = ({ children }) => {
  const getRequests = async (queryParams: String = "") => {
    let queryStr = "identifier image adress type status createdAt description";
    const { data } = await api.get(`/requests?select=${queryStr}`);
    return data;
  };

  const providerValue = useMemo(
    () => ({
      getRequests,
    }),
    [getRequests]
  );

  return (
    <RequestsContext.Provider value={providerValue}>
      {children}
    </RequestsContext.Provider>
  );
};

const useRequests = () => {
  const context = useContext(RequestsContext);

  if (!context) {
    throw new Error("useLocation must be used within an RequestsProvider");
  }

  return context;
};

export { useRequests, RequestsProvider };

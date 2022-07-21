import React, { createContext } from "react";
import useData from "../hooks/useData";
import useServer from "../hooks/useServer";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const context = useServer();
  const data = useData();
  return (
    <AuthContext.Provider value={{ context, data }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

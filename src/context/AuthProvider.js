import React, { createContext } from "react";
import useServer from "../hooks/useServer";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const context = useServer();
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

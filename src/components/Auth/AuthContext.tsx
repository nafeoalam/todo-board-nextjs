import React, { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}


export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("token"));


  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  const login = () => setIsLoggedIn(true);


  const logout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  jwtToken: string;
  setJwtToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  jwtToken: "",
  setJwtToken: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

interface HomeProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: HomeProviderProps) => {
  const [jwtToken, setJwtToken] = useState<string>("");

  return (
    <AuthContext.Provider value={{ jwtToken, setJwtToken }}>
      {children}
    </AuthContext.Provider>
  );
};

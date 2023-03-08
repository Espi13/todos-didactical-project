import { createContext, FC, ReactNode, useContext } from "react";
import axiosClient from "../middleware/axios-client";
import User from "../models/User";

interface IAuthContextProps {
  userData: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  logIn: (email: string, password: string) => void;
}

interface IAuthProviderProps {
  userData: User | null;
  isLoading: boolean;
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContextProps>({
  userData: null,
  isLoading: true,
  isLoggedIn: false,
  logIn: () => {},
});

export const AuthContextProvider: FC<IAuthProviderProps> = ({
  userData,
  isLoading,
  children,
}) => {
  const login = async (email: string, password: string) => {
    axiosClient.post("login", { email, password }).then((result) => {
      return result;
    });
  };
  const authContext = {
    userData,
    isLoading,
    isLoggedIn: !!(userData && userData.jwt),
    logIn: login,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

// export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);

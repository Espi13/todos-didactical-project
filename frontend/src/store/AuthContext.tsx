import { createContext, FC, ReactNode, useContext } from "react";
import axiosClient from "../middleware/AxiosClient";
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
  onUserDataChange: (userData: User) => void;
}

export const AuthContext = createContext<IAuthContextProps>({
  userData: null,
  isLoading: true,
  isLoggedIn: false,
  logIn: () => User || null,
});

export const AuthContextProvider: FC<IAuthProviderProps> = ({
  userData,
  isLoading,
  children,
  onUserDataChange,
}) => {
  const login = async (email: string, password: string) => {
    const result = await axiosClient.post("login", {
      email,
      password,
    });
    if (result) {
      localStorage.setItem("userData", JSON.stringify(result.data));
      onUserDataChange(result.data);
      return result;
    } else {
      return null;
    }
    // onUserDataChange(result);
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

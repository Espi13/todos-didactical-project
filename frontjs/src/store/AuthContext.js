import { createContext, useContext } from "react";

export const AuthContext = createContext({
  userData: null,
  isLoading: true,
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

export const AuthContextProvider = (props) => {
  const handleLogin = (email, password) => {
    console.log("Valor de email y password", email, password);
    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("Valor de login", resp);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogOut = () => {};

  const authContext = {
    userData: props.userData,
    isLoading: props.loading,
    isLoggedIn: !!(props.userData && props.userData.jwt),
    logIn: handleLogin,
    logOut: handleLogOut,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

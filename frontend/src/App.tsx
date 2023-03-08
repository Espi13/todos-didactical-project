import { useEffect, useState } from "react";
import "./App.css";
import axiosClient from "./middleware/axios-client";
import Todo from "./models/Todo";
import User from "./models/User";
import LoginScreen from "./pages/LoginScreen";
import TodosScreen from "./pages/TodosScreen";
import { AuthContextProvider, useAuth } from "./store/AuthContext";

function App() {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLaoding] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) setUserData(JSON.parse(userData));
    setLaoding(false);
  }, []);

  useEffect(() => {
    axiosClient
      .get<Todo[]>("todos")
      .then((resp) => {
        console.log("Valor de resp", resp);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <AuthContextProvider userData={userData} isLoading={loading}>
      <LoginScreen />
      <TodosScreen />
    </AuthContextProvider>
  );
}

export default App;

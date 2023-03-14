import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import User from "./models/User";
import LoginScreen from "./pages/LoginScreen";
import TodosScreen from "./pages/TodosScreen";
import ProtectedRoute from "./services/AuthRouter";
import { AuthContextProvider } from "./store/AuthContext";
import { TodosContextProvider } from "./store/TodosContext";

function App() {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLaoding] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) setUserData(JSON.parse(userData));
    setLaoding(false);
  }, []);

  return (
    <AuthContextProvider
      userData={userData}
      isLoading={loading}
      onUserDataChange={setUserData}
    >
      <TodosContextProvider>
        {!loading && (
          <Routes>
            <Route
              path="todos"
              element={<ProtectedRoute outlet={<TodosScreen />} />}
            />

            <Route path="login" element={<LoginScreen />} />
          </Routes>
        )}
      </TodosContextProvider>
    </AuthContextProvider>
  );
}

export default App;

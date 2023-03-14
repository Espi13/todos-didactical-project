import { useState } from "react";
import { Routes, Route } from "react-router";
import { AuthContextProvider } from "./store/AuthContext";
import "./App.css";
import LoginScreen from "./pages/LoginScreen";

function App() {
  const [userData, setUserData] = useState();
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="todos"></Route>
        <Route path="login" element={<LoginScreen />}></Route>
        <Route path="/"></Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;

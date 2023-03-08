import { FC } from "react";
import { useAuth } from "../store/AuthContext";

const TodosScreen: FC = () => {
  const auth = useAuth();

  console.log("Valor de auth", auth);
  return <h1>Todos</h1>;
};

export default TodosScreen;

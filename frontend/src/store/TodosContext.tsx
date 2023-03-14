import { createContext, FC, ReactNode, useContext, useState } from "react";
import axiosClient from "../middleware/AxiosClient";
import Todo from "../models/Todo";

interface ITodosContext {
  items: Todo[];
  getAllTodos: () => void;
  addTodo: () => void;
  removeTodo: (id: number) => void;
  updateTodo: () => void;
}

export const TodosContext = createContext<ITodosContext>({
  items: [],
  getAllTodos: () => {},
  addTodo: () => {},
  removeTodo: () => {},
  updateTodo: () => {},
});

export const TodosContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getAllTodosHandler = async () => {
    axiosClient
      .get<Todo[]>("todos")
      .then((resp) => {
        console.log("Valor de resp", resp);

        setTodos((prevTodos) => {
          return prevTodos.concat(resp.data);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addTodoHandler = () => {};

  const removeTodoHandler = (id: number) => {
    console.log("Valor del id", id);
  };

  const updateTodoHandler = () => {};
  const todosContext = {
    items: todos,
    getAllTodos: getAllTodosHandler,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
    updateTodo: updateTodoHandler,
  };

  return (
    <TodosContext.Provider value={todosContext}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
